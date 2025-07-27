import { Link, useLocation } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import AdminProductsPage from "./admin/adminProductsPage";
import AddProductPage from "./admin/addProductPage";
import EditProductPage from "./admin/productsEdit";
import AdminOrdersPage from "./admin/adminOrdersPage";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Loading from "../components/loading";
import axios from "axios";
export default function AdminPage() {
    const location = useLocation();
    const path = location.pathname;
    const [status, setStatus] = useState("loading");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setStatus("unauthorized");
            window.location.href = "/login";
    } else {
      axios.get(import.meta.env.VITE_BACKEND_URL + "/api/users", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((response) => {
        if (response.data.role !== "admin") {
            setStatus("unauthorized");
            toast.error("You are not authorized to access this page");
            window.location.href = "/";
        } else {
            setStatus("authorized");
        }
    }).catch((error) => {
        console.error("Error fetching user data:", error);
        setStatus("unauthorized");
        toast.error("You are not authorized to access this page");
        window.location.href = "/login";
    });
}
}, [status]);

    function getClass(name){
        if(path.includes(name)){
            return "bg-blue-500 text-white p-4"
        }else{
            return "text-blue-500 p-4"
        }
    }
    return (
        <div className = "w-full h-screen flex bg-blue-500">
            {status == "loading"|| status == "unauthorized"?
            <Loading /> :
            <>
            <div className="h-full w-[300px] text-blue-500 bg-white font-bold text-xl flex flex-col">
                <Link className={getClass("products")} to ="/admin/products">Products</Link>
                <Link className={getClass("users")} to ="/admin/users">Users</Link>
                <Link className={getClass("orders")} to ="/admin/orders">Orders</Link>
                <Link className={getClass("reviews")} to ="/admin/reviews">Reviews</Link>
               </div> 
    
            <div className = "h-full w-[calc(100%-300px)] border-4 rounded-xl border-blue-500 bg-white">
                <Routes path = "/*">
                    <Route path = "/products" element={<AdminProductsPage/>}/>
                    <Route path = "/users" element={<h1>Users</h1>} />
                    <Route path = "/orders" element={<AdminOrdersPage/>} />
                    <Route path = "/reviews" element={<h1>Reviews</h1>} />
                    <Route path = "/add-product" element={<AddProductPage/>}/>
                    <Route path = "/edit-product" element={<EditProductPage/>} />
                </Routes>
                </div>
</>}
        </div>
    );
}