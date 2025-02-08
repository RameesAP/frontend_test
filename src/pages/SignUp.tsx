import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUpUser } from "../api/apiServices";
import { useMutation } from "@tanstack/react-query";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: signUpUser,
    onSuccess: (data) => {
      console.log("Signin Successfull:", data);
      alert("Account created successfully! Please login.");
      navigate("/sign-in");
    },
    onError: (error: any) => {
      console.error(
        "Signup failed:",
        error.response?.data?.message || "Something went wrong"
      );
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signup:", email, password);
    mutation.mutate({ name, email, password });
  };

  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-gray-800">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-center">Sign Up</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2 flex flex-col">
              <label htmlFor="name">Name</label>
              <input
                className="w-full h-12 px-3 py-2 border border-gray-300 rounded-md"
                id="name"
                type="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
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
            <button
              type="submit"
              className="w-full h-12 bg-blue-500 text-white rounded-md"
            >
              Sign Up
            </button>
          </form>
          <p className="text-center">
            Already have an account?{" "}
            <Link to="/sign-in" className="text-primary hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
