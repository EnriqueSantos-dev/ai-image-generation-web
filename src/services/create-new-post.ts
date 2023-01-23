import { api } from "~/lib";

interface CreateNewPostRequest {
  name: string;
  prompt: string;
  photo: string;
}

export async function createNewPost({
  name,
  photo,
  prompt,
}: CreateNewPostRequest): Promise<void> {
  await api.post("posts", {
    name,
    photo,
    prompt,
  });
}
