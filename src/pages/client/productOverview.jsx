import { useNavigate, useParams } from "react-router-dom"
import { useEffect } from "react"
import {useState} from "react"
import axios from "axios";
import toast from "react-hot-toast";
import ImageSlider from "../../components/imageSlider"
import Loading from "../../components/loading";
import { addToCart, getCart } from "../../utils/cart.js";
export default function ProductOverview() {
    const params =useParams()
    const productId = params.id
    const [status, setStatus] = useState("Loading")
    const [product, setProduct] = useState(null)
    const navigate =  useNavigate()

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
            <div className = "w-full h-full flex flex-col md:flex-row md:max-h-full md:overflow-y-scroll pt-4">
                <h1 className="w-full md:hidden block text-center text-4xl text-black font-semibold my-4">{product.name}
                            {
                                product.altNames.map((altName, index) => {
                                    return (
                                        <span key={index} className="text-4xl text-gray-700">{" | "+altName}</span>
                                    )    
                                }
                             )            
                    }              
                        </h1>

                    <div className = "w-full md:w-[50%] md:h-full flex justify-center ">
                        <ImageSlider images = {product.images} />
                    </div>
                    <div className = "w-full md:w-[50%] flex justify-center md:h-full">
                        <div className="w-[500px] h-[600px] flex flex-col items-center">
                        <h1 className="w-full hidden md:block text-center text-4xl text-black font-semibold my-4">{product.name}
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
                                <span className="text-3xl mx-4 text-black-500 line-through">{"Rs. "+(product.labledPrice.toFixed(2))+" /="}</span>
                                <span className="text-3xl mx-4 font-bold text-red-500">{"Rs. "+(product.price.toFixed(2))+" /="}</span>
                            </div>
                            :<span className="text-4xl mx-4 font-bold text-red-500">{"Rs. "+(product.price.toFixed(2))+" /="}</span>
                    
                    }
                    <div className="w-full flex flex-col md:flex-row gap-2 justify-center items-center mt-2">
                                <button className="w-[200px] h-[50px] bg-blue-500 text-white font-bold ml-4 rounded-4xl cursor-pointer hover:bg-blue-500/80 transition-all duration-300"
                                            onClick={()=>{
              navigate("/checkout", {
                state:{
                  cart:[
                    {
                      productId: product.productId,
                      name: product.name,
                      image: product.images[0],
                      price: product.price,
                      labledPrice: product.labledPrice,
                      qty: 1,
                     

                  }
                ]

                  }
                }
              )
            }
          }
          
          >Buy Now</button>
                                <button className="w-[200px] h-[50px] bg-blue-500 text-white font-bold ml-4 rounded-4xl cursor-pointer hover:bg-blue-500/80 transition-all duration-300" 
                                onClick={() => {
                                        //localStorage.removeItem("cart");
										console.log("Old cart");
										console.log(getCart());
										addToCart(product, 1);
										console.log("New cart");
                                        console.log(getCart());
									}}
                                            >Add to Cart</button>
                    </div>



                    
                    </div>
                    </div>
                </div>
           
            
        )}

        {status == "Loading" && <Loading/>}
        
        </>
    )
}




