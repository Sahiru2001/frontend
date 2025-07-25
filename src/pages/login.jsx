import {useState} from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { GrGoogle } from "react-icons/gr";
import { useGoogleLogin } from '@react-oauth/google';
export default function LoginPage() {

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();

    const googleLogin = useGoogleLogin({
        onSuccess:(response)=>{
            const accessToken = response.access_token;
            axios.post(import.meta.env.VITE_BACKEND_URL+"/api/users/login/google", {
        
                accessToken: accessToken
            }).then((response)=>{
                toast.success("Login Successful");
                const token = response.data.token;
                localStorage.setItem("token", token);
                if(response.data.role === "admin"){
                    navigate("/admin/")
                }
                else{
                    navigate("/")
                }
                
            })
        }
    })




    async function handleLogin() {

        try{
        const response = await axios.post(import.meta.env.VITE_BACKEND_URL+"/api/users/login", {
            email: email,
            password: password
        })
      toast.success("Login Successful");
        console.log(response.data);
        localStorage.setItem("token", response.data.token);

        if(response.data.role === "admin"){
             navigate("/admin/")
        }
        else{
            navigate("/")
        }
        


    }catch (e){
        toast.error(e.response.data.message);
    }}
    
        return (
        <div className = "w-full h-screen bg-[url('login.jpg')] bg-center bg-cover flex justify-center items-center">
                <div 
                    className = "w-[50%] h-full"></div>
                <div className = "w-[50%] h-full flex justify-center items-center">
                    <div className = "w-[500px] h-[600px] backdrop-blur-md rounded-[20px] shadow-xl flex flex-col justify-center items-center">
                        <input
                        
                        onChange ={
                            (e) => {
                                setEmail(e.target.value);
                            }
                        }

                        value={email}
                        
                        placeholder = "    Enter your Email" className = "w-[300px] h-[50px] border border-[#e9e9e9] rounded-[20px] my-[20px]"/>
                        <input
                        
                        onChange={
    (e) => {
        setPassword(e.target.value);
    }
}
                    

                    value={password}
                        
                        placeholder = "Enter your Password" type ="password" className = "w-[300px] h-[50px] border border-[#e9e9e9] rounded-[20px] my-[20px]"/>
                        <button onClick = {handleLogin} className = "w-[300px] h-[50px] bg-[#e5c3c4] rounded-[20px] text-[20px] my-[20px] font-bold text-black cursor-pointer">Login</button>
                            <button onClick={googleLogin} className="w-[250px] cursor-pointer h-[50px] flex justify-center items-center bg-white rounded-[20px] my-[20px] text-[20px] font-bold">
                                <GrGoogle className="text-xl text-black-500 mx-2 cursor-pointer hover:text-gray-100"/>
                                <span className="text-gray-600 text-xl font-semibold">Log in with Google</span>
                            </button>
                         
                    
                    
                    </div>
                    </div>
                    </div>
        
        
        
        )



}


