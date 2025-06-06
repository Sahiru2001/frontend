import { useParams } from "react-router-dom"
import { useEffect } from "react"
import {useState} from "react"
import axios from "axios";
import toast from "react-hot-toast";
import ImageSlider from "../../components/imageSlider"
import Loading from "../../components/loading";
export default function ProductOverview() {
    const params =useParams()
    const productId = params.id
    const [status, setStatus] = useState("Loading")
    const [product, setProduct] = useState(null)

    useEffect(
        ()=>{
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products/" + productId).then(
                (response)=>{
                    setProduct(response.data)
                    setStatus("Loaded")
                    
                }
            ).catch(
                (error)=>{
                    console.log(error)
                    setStatus("Error")
                    toast.error("Error fetching product details")
                }
            )
        }
    ,[])
    
    return (

        <>
        {status == "Loaded" && (
            <div className = "w-full h-full flex">
                    <div className = "w-[50%] h-full flex justify-center items-center">
                        <ImageSlider images = {product.images} />
                    </div>
                    <div className = "w-[50%] justify-center items-center h-full">
                        <div className="w-[500px] h-[600px] flex flex-col items-center">
                        <h1 className="w-full text-center text-4xl text-black font-semibold my-4">{product.name}
                            {
                                product.altNames.map((altName, index) => {
                                    return (
                                        <span key={index} className="text-4xl text-gray-700">{" | "+altName}</span>
                                    )    
                                }
                             )            
                    }              
                        </h1>
                        <h1 className="w-full text-center text-md text-black font-semibold my-2">{"( "+product.productId+" )"}</h1>
                        <p className="w-full text-center text-md text-black font-semibold my-2">{product.description}</p>
                        {
                            product.labledPrice > product.price ?
                            <div className="w-full flex justify-center items-center my-10">
                                <span className="text-3xl mx-4 text-black-500 line-through">{"LKR. "+(product.labledPrice.toFixed(2))+" /="}</span>
                                <span className="text-3xl mx-4 font-bold text-red-500">{"LKR. "+(product.price.toFixed(2))+" /="}</span>
                            </div>
                            :<span className="text-4xl mx-4 font-bold text-red-500">{"LKR. "+(product.price.toFixed(2))+" /="}</span>
                    
                    }
                    <div className="w-full flex justify-center items-center mt-2">
                                <button className="w-[200px] h-[50px] bg-blue-500 text-white font-bold ml-4 rounded-4xl cursor-pointer hover:bg-blue-500/80 transition-all duration-300">Buy Now</button>
                                <button className="w-[200px] h-[50px] bg-blue-500 text-white font-bold ml-4 rounded-4xl cursor-pointer hover:bg-blue-500/80 transition-all duration-300">Add to Cart</button>
                    </div>



                    
                    </div>
                    </div>
                </div>
           
            
        )}

        {status == "Loading" && <Loading/>}
        
        </>
    )
}




