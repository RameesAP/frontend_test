import { Link, useNavigate } from "react-router-dom";
import { listProducts } from "../Hooks/customHooks";
import { useDeleteProduct } from "../Hooks/mutationHooks";

const Products = () => {
  const { data, isLoading, isError } = listProducts();
  const { mutate: deleteProduct } = useDeleteProduct();
  const navigate = useNavigate();

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen text-white">
        Loading...
      </div>
    );

  if (isError)
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Error fetching data
      </div>
    );

  const handleDelete = (productId: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProduct(productId);
    }
  };

  const handleEdit = (product: any & { _id?: string }) => {
    navigate("/edit-product", { state: { product } }); // ✅ Pass product via state
  };

  
  return (
    <div>
      <div className="flex  justify-center  min-h-screen bg-gray-800">
        <main className=" container py-8">
          <div className=" flex justify-end">
            <button  onClick={() => navigate("/add-product")} className="bg-blue-600 text-white px-7 py-2 rounded-xl mb-5 hover:cursor-pointer hover:bg-blue-800">Add Product</button>
          </div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Stock
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.products?.length ? (
                  data.products.map((product: any, index: any) => (
                    <tr
                      key={index}
                      className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {product.name}
                      </th>
                      <td className="px-6 py-4">{product.description}</td>
                      <td className="px-6 py-4">{product.price}</td>
                      <td className="px-6 py-4">{product.stock}</td>
                      <td className="px- py-4 ">
                        <div className="">
                          <button
                            onClick={() => handleEdit(product)}
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline px-5"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(product._id)}
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center py-4">
                      No products available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Products;
