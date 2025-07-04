import { useState, useEffect } from "react";
import {sampleProducts} from "../../assets/sampleData";
import { Link, useNavigate } from "react-router-dom";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";


export default function AdminProductsPage() {
    const [products, setProducts] = useState(sampleProducts);
    const [isLoading, setIsLoading] = useState(true);
    
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoading) {
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products")
                .then((res) => {
                    setProducts(res.data);
                    setIsLoading(false);
                })
                .catch(() => toast.error("Failed to fetch products"));
        }
    }, [isLoading]);

    function deleteProduct(productId) {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Please login first");
            return;
        }

        axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/products/${productId}`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(() => {
            toast.success("Product deleted successfully");
            setIsLoading(true);
        }).catch((e) => {
            toast.error(e.response.data.message);
        });
    }

    return (
        <div className="w-full h-full p-6">
            <h1 className="text-2xl font-bold text-blue-600 mb-4">Admin Products</h1>

            {isLoading ? (
                <div className="flex justify-center items-center h-full">
                    <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                </div>
            ) : (
                <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-4">
                    
                    <table className="w-full border-collapse border border-gray-300">
                        <thead className="bg-blue-500 text-white">
                            <tr>
                                <th className="px-4 py-2 border border-gray-300">ID</th>
                                <th className="px-4 py-2 border border-gray-300">Name</th>
                                <th className="px-4 py-2 border border-gray-300">Image</th>
                                <th className="px-4 py-2 border border-gray-300">Label Price</th>
                                <th className="px-4 py-2 border border-gray-300">Price</th>
                                <th className="px-4 py-2 border border-gray-300">Stock</th>
                                <th className="px-4 py-2 border border-gray-300">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((item) => (
                                <tr 
                               
                                key={item.productId} className="hover:bg-gray-100 transition-all duration-300 ease-in-out">
                                    <td className="px-4 py-2 border border-gray-300">{item.productId}</td>
                                    <td className="px-4 py-2 border border-gray-300">{item.name}</td>
                                    <td className="px-4 py-2 border border-gray-300">
                                        <img src={item.images[0]} className="w-12 h-12 rounded-md shadow-sm" alt="Product" />
                                    </td>
                                    <td className="px-4 py-2 border border-gray-300">${item.labledPrice}</td>
                                    <td className="px-4 py-2 border border-gray-300">${item.price}</td>
                                    <td className="px-4 py-2 border border-gray-300">{item.stock}</td>
                                    <td className="px-4 py-2 border border-gray-300">
                                        <div className="flex justify-center items-center gap-3">
                                            <FaTrashAlt className="text-xl text-red-500 cursor-pointer hover:scale-110 transition-transform duration-200"
                                                onClick={() => deleteProduct(item.productId)} />
                                            <FaEdit className="text-xl text-blue-500 cursor-pointer hover:scale-110 transition-transform duration-200"
                                                onClick={() => navigate("/admin/edit-product", { state: item })} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="mt-4 flex justify-end">
                        <Link to="/admin/add-product" className="bg-green-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-600 transition-all duration-300 ease-in-out transform hover:scale-105">
                            + Add Product
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}