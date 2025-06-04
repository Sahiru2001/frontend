import { useState } from 'react';
import {sampleProducts} from '../../assets/sampleData'
import {useEffect} from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import toast from 'react-hot-toast';
export default function AdminProductsPage() {

     const[products, setProducts] = useState(sampleProducts);
     const[isLoading, setIsLoading] = useState(true);
     const navigate = useNavigate();
     // Fetch products from the backend
        // and set the products state
        // to the fetched data
        // This will be done using useEffect
     // and axios
     useEffect(
        ()=>{
            if(isLoading == true){
            axios
            .get(import.meta.env.VITE_BACKEND_URL + "/api/products")
            .then((res)=>{
                console.log(res.data);
                setProducts(res.data);
                setIsLoading(false);
            })
        }
        },[isLoading])

        function deleteProduct(productId){
            const token = localStorage.getItem("token");
            if (token == null) {
                toast.error("Please login first");
                return;
            }
            axios.delete(import.meta.env.VITE_BACKEND_URL + "/api/products/" + productId , {
                headers: {
                    "Authorization": "Bearer " + token
                }
            }).then(
                ()=>{
                toast.success("Product deleted successfully");
                setIsLoading(true);
                
            }).catch(
                (e)=>{
                toast.error(e.response.data.message);
            })
        }
     

return(
    <div className = "w-full h-full max-h-full overflow-y-scroll bg-gray-400 relative">
        <Link 
        to = "/admin/add-product" 
        className = "absolute text-x1 cursor-pointer bottom-5 right-5 bg-green-500 text-white font-bold py-2 px-4 rounded">
            
               +
            </Link>
            {
            isLoading ?
            <div className = "w-full h-full flex justify-center items-center">
                <div className = "w-[70px] h-[70px] border-[5px] border-gray-300 border-t-blue-500 rounded-full animate-spin">
                    </div>
                </div>:
        <table className = "w-full text-center">
            <thead>
                <tr>
                    <th>Productn ID</th>
                    <th>Name</th>
                    <th>Image</th>
                    <th>Labled price</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    products.map(
                        (item, index)=>{
                            return(
                                <tr key = {index}>
                                    <td>{item.productId}</td>
                                    <td>{item.name}</td>
                                    <td><img src={item.images[0]} className="w-[50px] h-[50px]"/></td>
                                    <td>{item.labledPrice}</td>
                                    <td>{item.price}</td>
                                    <td>{item.stock}</td>

                                    <td>
                                        <div className = "flex justify-center items-center w-full">
                                            <FaTrashAlt className = "text-[20px] text-red-500 mx-2 cursor-pointer" onClick={
                                            ()=>{
                                                deleteProduct(item.productId)
                                             }} />
                                                
                                                
                                                <FaEdit onClick = {
                                                ()=>{
                                                    navigate("/admin/edit-product", {
                                                        state : item
                                                    }
                                                    )
                                                }
                                            } className = "text-[20px] text-blue-500 mx-2 cursor-pointer" />
                                        </div>    
                                            
                                            </td>

                                </tr>
                            )
                            
                        }
                    )
                }
            </tbody>



            </table>
        
            }
    

    </div>
    )
}

