import { useState } from 'react';
import { getCart, addToCart, removeFromCart } from '../../utils/cart.js';
import { BiMinus, BiPlus, BiTrash } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { getTotal } from '../../utils/cart.js';

export default function CartPage() {
  const [cart, setCart] = useState(getCart());


  return(
    <div className="w-full h-full bg-grey-300 flex flex-col items-center pt-4 relative">
      <div className="z-50 hidden w-[400px] h-[80px] shadow-2xl absolute bottom-1 md:top-1 right-1 md:flex flex-col justify-center items-center">
        <p className="text-2xl text-black-500 font-bold">Total:
          <span className="text-red-700 font-bold mx-2">
           {getTotal().toFixed(2)}
           </span>

        </p>
        < Link to ="/checkout"
        state={
          {
            cart: cart
          }
        }
        className="text-white bg-blue-500 p-2 rounded-lg hover:bg-blue-600 font-bold text-lg">
        Checkout
        </Link>
      </div>
       {
      cart.map(
        
  (item) => {
    return (
        
      <div key={item.productId} className="w-[70%] md:w-[600px] my-4 md:h-[100px] rounded-tl-3xl rounded-bl-3xl rounded-br-3xl rounded-tr-3xl flex flex-col md:flex-row relative items-center bg-grey-200 shadow-2xl p-2 md:pt-0">
        <img src={item.image} className="w-[100px] h-[100px] object-cover rounded-3xl" />
        <div className="w-[250px] h-full flex flex-col justify-center items-center md:items-start pl-4">
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
        <button className="text-white font-bold rounded-xl hover:bg-accent p-2 text-xl cursor-pointer aspect-square bg-blue-500"
        onClick={()=>{
          addToCart(item, -1);
          setCart(getCart());
        }}><BiMinus/></button>
        <h1 className="text-xl text-blue-500 font-semibold h-full flex items-center mx-2">{item.qty}</h1>
        <button className="text-white font-bold rounded-xl hover:bg-accent p-2 text-xl cursor-pointer aspect-square bg-blue-500"
        onClick={()=>{
          addToCart(item, 1);
          setCart(getCart());
        }}><BiPlus/></button>  
        </div>

            {/*total price*/}

            <div className="w-[200px] h-full flex flex-col justify-center items-center md:items-end pr-4">
                <h1 className="text-xl font-bold text-red-700">{"Rs. "+(item.price * item.qty).toFixed(2)}</h1>
            </div>
            <button className="absolute text-red-600 cursor-pointer hover:bg-red-600 hover:text-white rounded-full p-2 right-[-35px] "
            onClick={()=>{
              removeFromCart(item.productId);
              setCart(getCart());
            }}>
                <BiTrash/>
            </button>
            




      </div>
      
    )
  }
)


       }
       
      <div className="z-50 md:hidden border flex w-full h-[80px] shadow-2xl flex-col justify-center items-center">
        <p className="text-2xl text-black-500 font-bold">Total:
          <span className="text-red-700 font-bold mx-2">
           {getTotal().toFixed(2)}
           </span>

        </p>
        < Link to ="/checkout"
        state={
          {
            cart: cart
          }
        }
        className="text-white bg-blue-500 p-2 rounded-lg hover:bg-blue-600 font-bold text-lg">
        Checkout
        </Link>
      </div>
       </div>
       
        
  )
}