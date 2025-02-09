import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "../api/apiServices";


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
