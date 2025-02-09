import { useQuery } from "@tanstack/react-query"
import { getAllProducts, getAllSales, getAllUsers, getCurrentUser } from "../api/apiServices"

export const useCurrentUser =()=>{
    return useQuery({
        queryKey: ["currentUser"],
        queryFn: getCurrentUser,
    })
}

export const listProducts = () => {
    return useQuery({
      queryKey: ["products"],
      queryFn: getAllProducts,
      //staleTime: 1000 * 60 * 5, // Cache results for 5 minutes
    });
  };

  //get all users
  export const listUsers = () => {
    return useQuery({
      queryKey: ["users"],
      queryFn: getAllUsers,
    });
  }

//get all sales
export const listSales = () => {
  return useQuery({
    queryKey: ["sales"],
    queryFn: getAllSales,
  });
}