import { api } from "~/lib";

interface generateImagePostResponse {
  photo: string;
}

export async function generateImagePost({
  prompt,
}: {
  prompt: string;
}): Promise<generateImagePostResponse> {
  const { data } = await api.post("dalle/generate", {
    prompt,
  });

  return data;
}
