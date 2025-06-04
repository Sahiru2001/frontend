import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    async function handleRegister() {
        console.log(firstName, lastName, email, password);
        try {
            const response = await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/users", {

                firstName,
                lastName,
                email,
                password
            });

            toast.success("Registration Successful");
            navigate("/login");

        } catch (e) {
            toast.error(e.response.data.message);
        }
    }

    return (
        <div className="w-full h-screen bg-[url('login.jpg')] bg-center bg-cover flex justify-center items-center">
            <div className="w-[50%] h-full"></div>
            <div className="w-[50%] h-full flex justify-center items-center">
                <div className="w-[500px] h-[600px] backdrop-blur-md rounded-[20px] shadow-xl flex flex-col justify-center items-center">
                    
                    <input
                        onChange={(e) => setFirstName(e.target.value)}
                        value={firstName}
                        placeholder="Enter your First Name"
                        className="w-[300px] h-[50px] border border-[#e9e9e9] rounded-[20px] my-[20px]"
                    />
                    <input
                        onChange={(e) => setLastName(e.target.value)}
                        value={lastName}
                        placeholder="Enter your Last Name"
                        className="w-[300px] h-[50px] border border-[#e9e9e9] rounded-[20px] my-[20px]"
                    />
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        placeholder="Enter your Email"
                        className="w-[300px] h-[50px] border border-[#e9e9e9] rounded-[20px] my-[20px]"
                    />
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        placeholder="Enter your Password"
                        type="password"
                        className="w-[300px] h-[50px] border border-[#e9e9e9] rounded-[20px] my-[20px]"
                    />
                    <button
                        onClick={handleRegister}
                        className="w-[300px] h-[50px] bg-[#e5c3c4] rounded-[20px] text-[20px] my-[20px] font-bold text-black cursor-pointer"
                    >
                        Register
                    </button>
                </div>
            </div>
        </div>
    );
}