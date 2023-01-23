import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import cn from "clsx";

import previewImg from "~/assets/preview.png";
import { FormField, Loader } from "~/components";
import { getRandomPrompt } from "~/utils";
import { useGenerateImage } from "~/hooks";
import { useMutation } from "@tanstack/react-query";
import { createNewPost } from "~/services";
import { queryClient } from "~/lib";
import { useEffect } from "react";

const formSchema = z.object({
  name: z.string().min(1),
  prompt: z.string().min(1),
  photo: z.string().min(1),
});

interface IFormValues extends z.infer<typeof formSchema> {}

export function CreatePost() {
  const navigate = useNavigate();
  const {
    data: dataImg,
    error: errorOnCreateImg,
    isLoading: isLoadingGenerateImg,
    handleCreateImage,
  } = useGenerateImage();
  const {
    mutate,
    isLoading: isLoadingCreatePost,
    error: errorOnCreatePost,
  } = useMutation({
    mutationFn: createNewPost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getAllPosts"],
      });
      navigate("/");
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    getValues,
    formState: { errors, isSubmitted },
  } = useForm<IFormValues>({
    resolver: zodResolver(formSchema),
  });

  function handleSurpriseMe() {
    const randomPrompt = getRandomPrompt(getValues("prompt"));
    setValue("prompt", randomPrompt);
  }

  async function handleGenerateImage() {
    handleCreateImage(getValues("prompt"));
  }

  const submitHandler: SubmitHandler<IFormValues> = (data) => {
    if (!data.name || !data.prompt || !dataImg?.photo) return;

    if (!dataImg?.photo) {
      setError("photo", { message: "Please generate image" });
    }

    mutate({
      name: data.name,
      prompt: data.prompt,
      photo: dataImg.photo,
    });
  };

  useEffect(() => {
    if (dataImg?.photo) {
      setValue("photo", dataImg?.photo);
    }
  }, [dataImg?.photo]);

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328]">Create</h1>
        <p className="mt-2 text-[#666e75] text-sm max-w-lg">
          Create imaginative and visually stunning images through DALL-E AI and
          share them with the community
        </p>
      </div>

      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit(submitHandler)}>
        <div className="flex flex-col gap-5">
          <FormField
            labelText="Your name"
            type="text"
            placeholder="John Doe"
            {...register("name")}
            errorMessage={errors.name?.message}
          />

          <FormField
            labelText="Prompt"
            type="text"
            placeholder="A plush toy robot sitting against a yellow wall"
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
            {...register("prompt")}
            errorMessage={errors.prompt?.message}
          />

          <div
            className={cn(
              "relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center",
              {
                "border-red-500":
                  isSubmitted &&
                  errors.photo &&
                  !isLoadingGenerateImg &&
                  !dataImg?.photo,
              }
            )}
          >
            {dataImg?.photo ? (
              <>
                <img
                  src={dataImg?.photo}
                  alt={getValues("prompt")}
                  className="w-full h-full object-contain rounded-lg"
                />
                <FormField type="text" {...register("photo")} hiddenInput />
              </>
            ) : (
              <img
                src={previewImg}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}

            {isLoadingGenerateImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>

        {isSubmitted &&
          errors.photo &&
          !isLoadingGenerateImg &&
          !dataImg?.photo && (
            <p className="my-2 text-xs text-red-500">Please generate a image</p>
          )}

        {!!errorOnCreateImg && (
          <p className="my-2 text-xs text-red-500">
            Failed on generate image, try again.
          </p>
        )}

        <div className="mt-5 flex gap-5">
          <button
            type="button"
            className="text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center disabled:cursor-not-allowed"
            onClick={handleGenerateImage}
            disabled={isLoadingGenerateImg}
          >
            {isLoadingGenerateImg ? "Generating..." : "Generate"}
          </button>
        </div>

        <div className="mt-10">
          <p className="mt-2 text-[#666e75] text-sm">
            Once you have created the image you want, you can share it with
            others int the community
          </p>

          <div className="flex flex-col gap-3 md:flex-row">
            <button
              type="submit"
              className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm sm:w-auto px-5 py-2.5 text-center w-full disabled:cursor-not-allowed"
              disabled={isLoadingCreatePost || isLoadingGenerateImg}
            >
              {isLoadingCreatePost ? "Sharing..." : "Share with the community"}
            </button>

            {!!errorOnCreatePost && (
              <p className="text-sm font-medium text-red-500">
                Sorry! ocurred error on create post, try again.
              </p>
            )}
          </div>
        </div>
      </form>
    </section>
  );
}
