import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { createProduct, updateProduct } from "../api/apiServices";
import { useNavigate, useLocation } from "react-router-dom";

interface Product {
  name: string;
  description: string;
  price: number;
  stock: number;
  _id?: string;
}

const ProductForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const existingProduct = location.state?.product || null; 

  const [product, setProduct] = useState<Product>({
    name: "",
    description: "",
    price: 0,
    stock: 0,
  });

  useEffect(() => {
    if (existingProduct) {
      setProduct(existingProduct);
    }
  }, [existingProduct]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    }));
  };

  const addMutation = useMutation({
    mutationFn: (newProduct: Product) => createProduct(newProduct),
    onSuccess: () => {
      alert("Product added successfully!");
      navigate("/products");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, updatedProduct }: { id: string; updatedProduct: Product }) =>
      updateProduct(id, updatedProduct),
    onSuccess: () => {
      alert("Product updated successfully!");
      navigate("/products");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (existingProduct?._id) {
      updateMutation.mutate({ id: existingProduct._id, updatedProduct: product });
    } else {
      addMutation.mutate(product);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="w-full max-w-lg mx-auto p-6 bg-white shadow-lg rounded-md">
        <h2 className="text-xl font-bold mb-4">
          {existingProduct ? "Edit Product" : "Add Product"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name:</label>
            <input
              type="text"
              name="name"
              className="w-full p-2 border rounded"
              value={product.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description:</label>
            <input
              type="text"
              name="description"
              className="w-full p-2 border rounded"
              value={product.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Price:</label>
            <input
              type="number"
              name="price"
              className="w-full p-2 border rounded"
              value={product.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Stock:</label>
            <input
              type="number"
              name="stock"
              className="w-full p-2 border rounded"
              value={product.stock}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            disabled={addMutation.isPending || updateMutation.isPending}
          >
            {existingProduct ? "Update Product" : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
