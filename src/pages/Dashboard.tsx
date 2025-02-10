import { Chart } from "react-google-charts";
import { PiechartData } from "../Hooks/customHooks";

const Dashboard = () => {
  const { data, isLoading, isError } = PiechartData();

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

    const totalSales = data?.sales?.[0]?.count || 0; // Total sales count
    const totalCustomers = data?.totalCustomers || 0; // Total unique customers count

  const chartData  = [
    ["Category", "Count"],
    ["Sales", totalSales],
    ["Customers", totalCustomers],
    // ["Commute", 2],
    // ["Watch TV", 2],
    // ["Sleep", 7],
  ];

  const options = {
    title: "Details",
    // backgroundColor: "#f9f9f9",
    pieHole: 0.4, // Creates a Donut Chart. Does not do anything when is3D is enabled
    is3D: true, // Enables 3D view
    // slices: {
    //   1: { offset: 0.2 }, // Explodes the second slice
    // },
    pieStartAngle: 100, // Rotates the chart
    sliceVisibilityThreshold: 0.02, // Hides slices smaller than 2%
    legend: {
      position: "bottom",
      alignment: "center",
      textStyle: {
        color: "#233238",
        fontSize: 14,
      },
    },
    colors: ["#8AD1C2", "#9F8AD1", "#D18A99", "#BCD18A", "#D1C28A"],
  };

  return (
    <>
      <div className="flex  justify-center   min-h-screen bg-gray-800">
        <main className="w-full max-w-6xl  py-8 ">
          <Chart
            chartType="PieChart"
            data={chartData}
            options={options}
            width={"100%"}
            height={"400px"}
          />
        </main>
      </div>
    </>
  );
};

export default Dashboard;
