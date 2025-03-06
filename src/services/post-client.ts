import apiClient from "./api-client";
import { AxiosError, CanceledError } from "axios";

export { CanceledError };

export interface Post {
  _id: string;
  title: string;
  content: string;
  owner: string;
}

export const getAllPosts = async () => {
  const abortController = new AbortController();
  
  try {
    const response = await apiClient.get<Post[]>("/posts", {
      signal: abortController.signal,
    });
    return { data: response.data, abort: () => abortController.abort() };

  } catch (error) {
    if (error instanceof CanceledError) {
      console.warn("Request was canceled");
      return { data: [], abort: () => abortController.abort() }; // מחזיר מערך ריק אם הבקשה בוטלה
    }

    if (error instanceof AxiosError) {
      console.error("Error fetching posts:", error.response?.data || error.message);
      throw error.response?.data || "Failed to fetch posts";
    }

    console.error("Unexpected error:", error);
    throw "Unexpected error occurred";
  }
};
