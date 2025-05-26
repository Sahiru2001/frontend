import {useState} from 'react';
export default function TestPage() {
   
    const[count, setCount] = useState(0);

    return (
        <div className  = "w-full h-screen flex justify-center items-center">
            <div className = "w-[300px] h-[300px] shadow flex justify-center items-center">
                <button
                onClick = {
                    () => {
                        setCount(count - 1);
                    }
                }
                className = "bg-blue-500 text-white font-bold text-center w-[100px] h-[50px] text-[20px] cursor-pointer flex flex-col justify-center items-center">
                    -
              </button>

              <span className = "text-[30px] font-bold text-center w-[100px] h-[40px] mx-[10px] flex flex-col justify-center item-center">
                  {count}
              </span>

                <button
                onClick ={
                    () =>{
                        setCount(count + 1);
                    }
                } className = "bg-blue-500 text-white text-center font-bold w-[100px] h-[50px] text-[20px] cursor-pointer flex flex-col justify-center items-center">
                    +
                </button>

                </div>

        </div>

    )}