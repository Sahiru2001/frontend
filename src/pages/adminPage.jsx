import { Link } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
export default function AdminPage() {
    return (
        <div className = "w-full h-screen flex">
            <div className="h-full w-[300px]  flex flex-col">
                <Link to ="/admin/Products">Products</Link>
                <Link to ="/admin/Users">Users</Link>
                <Link to ="/admin/Orders">Orders</Link>
                <Link to ="/admin/Reviews">Reviews</Link>
               </div> 
    
            <div className = "h-full w-[calc(100%-300px)]  bg-yellow-400">
                <Routes path = "/*">
                    <Route path = "/Products" element={<h1>Products</h1>} />
                    <Route path = "/Users" element={<h1>Users</h1>} />
                    <Route path = "/Orders" element={<h1>Orders</h1>} />
                    <Route path = "/Reviews" element={<h1>Reviews</h1>} />
                </Routes>
                </div>
        
        </div>
    );
}