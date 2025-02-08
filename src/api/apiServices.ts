import axiosInstance from "./axiosInstance";

export const getAllProducts = async () => {
  try {
    const response = await axiosInstance.get("/api/admin/get-all-products");
    return response.data;
  } catch (error) {
    console.error("Error fetching quiz questions:", error);
    throw error;
  }
};

//user signUpUser
export const signUpUser = async (userData: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await axiosInstance.post("/api/auth/signup", userData);
    return response.data;
  } catch (error) {
    console.error("createing user error:", error);
    throw error;
  }
};

//user signInUser
export const signInUser = async (userData: {
  email: string;
  password: string;
}) => {
  try {
    const response = await axiosInstance.post("/api/auth/login", userData);
    return response.data;
  } catch (error) {
    console.error("signing in user error:", error);
    throw error;
  }
};
