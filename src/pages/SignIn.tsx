import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInUser } from "../api/apiServices";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const mutation = useMutation({
    mutationFn:signInUser,
    onSuccess:(data)=>{
        console.log("Signin Successfull:", data);

        //save token and user in local storage
        localStorage.setItem("token",data.token);
        localStorage.setItem("user",JSON.stringify(data.user));

        //redirect to home page
        navigate("/");
    },
    onError:(error:any)=>{
        console.error("Login failed:", error.response?.data?.message || "Something went wrong");
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle signin logic here
    mutation.mutate({ email, password });
    // console.log("Signin:", email, password);
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center">Sign In</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2 flex flex-col">
            <label htmlFor="email">Email</label>
            <input
             className="w-full h-12 px-3 py-2 border border-gray-300 rounded-md"
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2 flex flex-col">
            <label htmlFor="password">Password</label>
            <input
             className="w-full h-12 px-3 py-2 border border-gray-300 rounded-md"
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="w-full h-12 bg-blue-500 text-white rounded-md">
            Sign In
          </button>
        </form>
        <p className="text-center">
          Don't have an account?{" "}
          <Link to="/sign-up" className="text-primary hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
