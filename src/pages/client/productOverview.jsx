import { useParams } from "react-router-dom"
import { useEffect } from "react"
import {useState} from "react"
import axios from "axios";
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
    
    return(
        <div className="bg-primary font-fancy">
              This is overview page for product {JSON.stringify(product)}
         </div>
    )
}