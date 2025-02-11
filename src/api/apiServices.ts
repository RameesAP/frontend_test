// import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import axiosInstance from "./axiosInstance";

//get all products
export const getAllProducts = async () => {
  try {
    const response = await axiosInstance.get("/api/admin/get-all-products");
    return response.data;
  } catch (error) {
    console.error("Error fetching quiz questions:", error);
    throw error;
  }
};

//get total sales count and customers count
export const getDashboardData = async () => {
  try {
    const response = await axiosInstance.get("/api/sale/get-sales-stats");
    return response.data;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw error;
  }
}

// create single products
export const createProduct = async (productData: {
  name: string;
  description: string;
  price: number;
  stock: number;
}) => {
  try {
    const response = await axiosInstance.post("/api/admin/create-product", productData);
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

//getsingle product
export const getProductById  = async (productId: string) => {
  try {
    const response = await axiosInstance.get(`/api/admin/get-one/:id${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};

//update product
export const updateProduct = async (productId: string, productData: {
  name: string;
  description: string;
  price: number;
  stock: number;
}) => {
  try {
    const response = await axiosInstance.put(`/api/admin/update-product/${productId}`, productData);
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

//delete product
export const deleteProduct = async (productId: string) => {
  try {
    const response = await axiosInstance.delete(`/api/admin/delete-product/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

//order product
export const orderProduct = async (orderData: {
  productId: string;
  quantity: number;
}) => {
  try {
    const response = await axiosInstance.post("/api/sale/create-sale", orderData);
    return response.data;
  } catch (error) {
    console.error("Error ordering product:", error);
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
    if (response.data.token) {
      localStorage.setItem("token", response.data.token); // Store token in localStorage
    }
    return response.data;
  } catch (error) {
    console.error("signing in user error:", error);
    throw error;
  }
};

//get user
export const getCurrentUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return null; // No token, return null
  
      const response = await axiosInstance.get("/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      return response.data.user;
    } catch (error) {
      console.error("Error fetching user:", error);
      return null;
    }
  };

  //get all users
export const getAllUsers = async () => {
    try {
      const response = await axiosInstance.get("/api/admin/users");
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  };

  //get all sales
  export const getAllSales = async () => {
    try {
      const response = await axiosInstance.get("/api/sale/get-sales");
      return response.data;
    } catch (error) {
      console.error("Error fetching sales:", error);
      throw error;
    }
  }


  const secAxiosInstance = axios.create({
    baseURL: "https://jsearch.p.rapidapi.com",
    headers: {
      "X-RapidAPI-Key": "32eaa07a8bmshf0dfc6c47bcb4e4p1745dfjsndeb6e914a166",
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
  });
  
  export const getJobListings = async () => {
    try {
      const response = await secAxiosInstance.get("/search", {
        params: { query: "React Native developer", num_pages: "1", limit: "1" },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching job listings:", error);
      throw error;
    }
  };