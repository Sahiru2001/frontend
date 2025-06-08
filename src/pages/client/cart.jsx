import { useState } from 'react';
import { getCart } from '../../utils/cart.js';
import { BiMinus, BiPlus, BiTrash } from 'react-icons/bi';
export default function CartPage() {
  const [cart, setCart] = useState(getCart());


  return(
    <div className="w-full h-full bg-grey-300 flex flex-col items-center pt-4">
       {
      cart.map(
        
  (item) => {
    return (
        
      <div key={item.productId} className="w-[600px] my-4 h-[100px] rounded-tl-3xl rounded-bl-3xl rounded-br-3xl rounded-tr-3xl flex flex-row relative items-center bg-grey-200 shadow-2xl">
        <img src={item.image} className="w-[100px] h-[100px] object-cover rounded-3xl" />
        <div className="w-[250px] h-full] flex flex-col items-start pl-4">
                <h1 className="text-xl font-semibold text-black">{item.name}</h1>
                <h1 className="text-md font-semibold text-black">{item.productId}</h1>

            {
                (item.labledPrice) > (item.price) ?
                <div>
                    <span className="text-md mx-1 font-semibold text-black line-through">{item.labledPrice.toFixed(2)}</span>
                    <span className="text-md mx-1 font-bold text-red-700">{item.price.toFixed(2)}</span>
                </div>
                :<span className="text-md mx-1 font-bold text-red-700">{item.price.toFixed(2)}</span>

            }
     </div>
     <div className="max-w-[100px] h-full flex flex-row justify-evenly items-center">
        <button className="text-white font-bold rounded-xl hover:bg-accent p-2 text-xl cursor-pointer aspect-square bg-blue-500"><BiMinus/></button>
        <h1 className="text-xl text-blue-500 font-semibold h-full flex items-center mx-2">{item.qty}</h1>
        <button className="text-white font-bold rounded-xl hover:bg-accent p-2 text-xl cursor-pointer aspect-square bg-blue-500"><BiPlus/></button>  
        </div>

            {/*total price*/}

            <div className="w-[200px] h-full flex flex-col justify-center items-end pr-4">
                <h1 className="text-xl font-bold text-red-700">{"LKR. "+(item.price * item.qty).toFixed(2)}</h1>
            </div>
            <button className="absolute bg-white text-shadow-black cursor-pointer hover:bg-red-500 hover:text-white rounded-full p-2 right-[-50px]">
                <BiTrash/>
            </button>
            




      </div>
      
    )
  }
)


       }
       </div>
       
        
  )
}