import { listProducts } from "../Hooks/customHooks";
import { useOrderProduct } from "../Hooks/mutationHooks";
import placeholder from "../assets/placeholder.jpg";

const Home = () => {
  const { data, isLoading, isError } = listProducts();
  const orderMutation = useOrderProduct();

  const handleOrder = (productId: string) => {
    orderMutation.mutate({ productId, quantity: 1 }); // Adjust quantity as needed
  };
  console.log(data);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );

  if (isError)
    return (
      <div className="flex justify-center items-center h-screen">
        Error fetching data
      </div>
    );
  return (
    <>
      <div className="flex  justify-center   min-h-screen bg-gray-800">
        <main className="w-full max-w-6xl  py-8 ">
          <h1 className="text-4xl font-bold mb-8 text-white">
            Product Listing
          </h1>
          <div className="flex justify-center w-full  ">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:w-full gap-6  ">
            {data.products.map((product: any) => (
              <div
                key={product._id}
                className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm "
              >
                <a href="#">
                  <img
                    className="rounded-t-lg w-full h-48 object-cover"
                    src={product.image || placeholder}
                    alt={product.name}
                  />
                </a>
                <div className="p-5">
                  <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                      {product.name}
                    </h5>
                  </a>
                  <p className="mb-3 font-normal text-gray-700">
                    {product.description || "No description available."}
                  </p>
                  <div className=" flex justify-between ">
                    <button
                      onClick={() => handleOrder(product._id)}
                      disabled={orderMutation.isPending}
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800"
                    >
                      {orderMutation.isPending ? "Ordering..." : "Get Product"}
                    </button>
                    {product.stock > 0 ? (
                      <span className="text-green-500">In Stock</span>
                    ) : (
                      <span className="text-red-500">Out Stock</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;
