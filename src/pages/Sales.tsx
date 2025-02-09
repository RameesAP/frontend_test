import { listSales } from "../Hooks/customHooks";

const Sales = () => {
  const { data, isLoading, isError } = listSales();

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );

  if (isError)
    return (
      <div className="flex justify-center items-center h-screen">
        Error fetching sales data
      </div>
    );

  console.log(data);

  return (
    <div>
      <div className="flex justify-center min-h-screen bg-gray-800">
        <main className="container py-8">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Customer Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Quantity
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Total Amount
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.length > 0 ? (
                  data.map((sale: any) => (
                    <tr
                      key={sale._id}
                      className="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-900 dark:even:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
                    >
                      <td className="px-6 py-4">
                        {sale.customer?.email || "N/A"}
                      </td>
                      <td className="px-6 py-4">
                        {sale.customer?.name || "N/A"}
                      </td>
                      <td className="px-6 py-4">
                        {sale.product?.name || "N/A"}
                      </td>
                      <td className="px-6 py-4">{sale.quantity}</td>
                      <td className="px-6 py-4">${sale.totalAmount}</td>
                      <td className="px-6 py-4">
                        {new Date(sale.date).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-4">
                      No sales records found.
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

export default Sales;
