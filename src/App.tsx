import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Users from "./pages/Users";
import Nav from "./components/Nav";
import Sales from "./pages/Sales";
import ProductForm from "./pages/ProductAddEdit";

function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          {/* Protected routes */}
          {/* 🔹 Protected Customer Route */}
          <Route
            element={<ProtectedRoute allowedRoles={["customer", "admin"]} />}
          >
            <Route path="/" element={<Home />} />
          </Route>
          {/* 🔹 Protected Admin Route */}
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/users" element={<Users />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/add-product" element={<ProductForm />} />
            <Route path="/edit-product" element={<ProductForm />} />
          </Route>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
