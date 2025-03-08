import apiClient from "./api-client";

export interface User {
  _id: string;
  username: string;
  imgUrl?: string; // תמונת פרופיל אופציונלית
}


export interface Post {
  _id: string;
  recipeTitle: string;
  category: string[];
  imageUrl?: string;
  difficulty: "easy" | "medium" | "hard";
  prepTime: number;
  ingredients: string[];
  instructions: string[];
  authorId: User; // ✅ עכשיו מחזיק אובייקט User במקום string
  likes: number;
  comments: string[];
  savedBy: string[];
  createdAt: string;
}

// 📌 שליפת כל הפוסטים
export const getAllPosts = async (): Promise<Post[]> => {
    try {
      const response = await apiClient.get("/posts"); // 📌 שינוי הנתיב
      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
};

// 📌 יצירת פוסט חדש
export const createPost = async (postData: Partial<Post>) => {
  try {
    const response = await apiClient.post("/posts", postData);
    return response.data.post;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

// 📌 מחיקת פוסט
export const deletePost = async (postId: string) => {
  try {
    await apiClient.delete(`/posts/${postId}`);
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
};

// 📌 עדכון פוסט
export const updatePost = async (postId: string, updatedData: Partial<Post>) => {
  try {
    const response = await apiClient.put(`/posts/${postId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
};
