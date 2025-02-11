import { getJobs } from "../Hooks/customHooks";

const Jobs = () => {
  const { data, isLoading, isError } = getJobs();

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
      <div className="flex justify-center min-h-screen bg-gray-800">
        <main className="container py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.data?.slice(0, 5).map(
              (
                job: any // Extracting jobs from data array
              ) => (
                <div
                  key={job.job_id}
                  className="bg-white text-black shadow p-4 rounded-lg"
                >
                  <h2 className="text-xl font-semibold text-black ">
                    {job.job_title ?? "Job Title Not Available"}
                  </h2>
                  <p className="text-gray-500 ">
                    {job.job_description?.substring(0, 150) ??
                      "No description available"}
                    ...
                  </p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-gray-800 ">
                      {job.job_location ?? "Location not specified"}
                    </span>
                    <span className="text-gray-800 ">
                      {job.job_salary ?? "Salary not specified"}
                    </span>
                  </div>
                  <a
                    href={job.job_apply_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 block text-blue-500 hover:underline"
                  >
                    Apply Now
                  </a>
                </div>
              )
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Jobs;
