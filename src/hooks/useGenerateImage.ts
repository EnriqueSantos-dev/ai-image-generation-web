import { useMutation } from "@tanstack/react-query";
import { generateImagePost } from "~/services";

export function useGenerateImage() {
  const { data, error, isLoading, mutate } = useMutation({
    mutationFn: generateImagePost,
    onSuccess: (data) => (data.photo = `data:image/jpeg;base64,${data.photo}`),
  });

  const handleCreateImage = (prompt: string) => {
    mutate({ prompt });
  };

  return { data, error, isLoading, handleCreateImage };
}
