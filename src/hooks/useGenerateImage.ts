import { useMutation } from "@tanstack/react-query";
import { generateImagePost } from "~/services";

export function useGenerateImage() {
  const { data, error, isLoading, mutateAsync } = useMutation({
    mutationFn: generateImagePost,
    onSuccess: (data) => (data.photo = `data:image/jpeg;base64,${data.photo}`),
  });

  async function handleCreateImage(prompt: string) {
    await mutateAsync({ prompt });
  }

  return { data, error, isLoading, handleCreateImage };
}
