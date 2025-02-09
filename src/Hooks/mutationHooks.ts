import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct, orderProduct } from "../api/apiServices";


//delete single product
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (productId: string) => deleteProduct(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

//order product
export const useOrderProduct = () => {
  const queryClient =useQueryClient();
  return useMutation({
    mutationFn:orderProduct,
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:["products"]});
    },
    onError:(error)=>{
      console.error("Error ordering product:",error);
    }
  })
}