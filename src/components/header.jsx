import { Link, useNavigate } from "react-router-dom";
import { BsCart3 } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react"; 


export default function Header() {
    const [sideDrawerOpened, setSideDrawerOpened] = useState(false);
    const navigate = useNavigate();
    console.log("Header component is loading...");
    // This component renders the header with navigation links
     return (
        <header className = "w-full h-[80px] shadow-2xl flex justify-center relative">
            <GiHamburgerMenu className = "h-full mx-2 text-[30px] md:hidden absolute cursor-pointer m-2 left-2" onClick={() => setSideDrawerOpened(true)}/>

            <img 
            onClick={
                () =>{                
                     navigate("/")
                    
            }}
            src = "/logo.png" alt="Logo" className = "w-[80px] h-[80px] object-cover cursor-pointer"/>
            <div className = "w-[calc(100%-160px)] h-full hidden md:flex justify-center items-center">

            <Link to = "/" className = "text-[25px] font-bold mx-2">Home</Link>
            <Link to = "/products"className = "text-[25px] font-bold mx-2">Products</Link>
            <Link to = "/about"className = "text-[25px] font-bold mx-2">About</Link>
            <Link to = "/contact" className = "text-[25px] font-bold mx-2">Contact</Link>
            <Link to = "/search" className = "text-[25px] font-bold mx-2">Search</Link>
        
            </div>
            <div className = "w-[80px] hidden md:flex justify-center items-center">
                <Link to = "/cart" className="text-[20px] font-bold mx-2">
                    <BsCart3/>
                </Link>
            
                   
                </div>
                {
                    sideDrawerOpened &&
                    <div className="fixed h-screen w-full bg-[#00000060] flex md:hidden">
                        <div className = "w-[350px] bg-white h-full">
                            <div className = "w-full h-[80px] shadow-2xl flex justify-center items-center">
                                <GiHamburgerMenu className = "h-full mx-2 text-[30px] cursor-pointer m-2 absolute left-2" onClick={() => setSideDrawerOpened(false)}/>
                            <img 
                            onClick={
                                () =>{                
                                     window.location.href = "/"
                                     
                                    
                            }}
                            src="/logo.png" alt="Logo" className = "w-[80px] h-[80px] object-cover cursor-pointer"
                            />
                            
                            
                            </div>
                            <div className = "w-full h-[calc(100%-80px)] flex flex-col justify-center items-center gap-2">
                                <a href = "/" className = "text-[25px] font-bold mx-2" >Home</a>
                                <a href = "/products" className = "text-[25px] font-bold mx-2" >Products</a>
                                <a href = "/about" className = "text-[25px] font-bold mx-2" >About</a>
                                <a href = "/contact" className = "text-[25px] font-bold mx-2" >Contact</a>
                                <a href = "/cart" className = "text-[20px] font-bold mx-2">
                                <BsCart3/>
                                </a>
                                <a/>
                            </div>
                        </div>
                
                </div>
                }
            
            
        </header>
    )    
}


        