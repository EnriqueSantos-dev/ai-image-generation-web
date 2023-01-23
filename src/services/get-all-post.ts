import { api } from "~/lib";
import { Post } from "~/types";

interface GetAllPostsResponse {
  posts: Post[];
}

export async function getAllPosts(): Promise<GetAllPostsResponse> {
  const { data } = await api.get("/posts");
  return data;
}
