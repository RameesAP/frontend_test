import { listUsers } from "../Hooks/customHooks";

const Users = () => {
  const { data, isLoading, isError } = listUsers();

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
    <div>
      <div className="flex  justify-center  min-h-screen bg-gray-800">
        <main className=" container py-8"></main>
      </div>
    </div>
  );
};

export default Users;
