export default function SignUpPage(){
        return(
            <div className = "w-full h-screen bg-gray-300 flex flex-col justify-center items-center">
                <h1 className = "text-5xl font-bold text-blue-700">Sign Up</h1>
                <form className = "flex flex-col gap-4">
                    <input type="text" placeholder="Username" className = "border border-gray-500 p-2 rounded"/>
                    <input type="email" placeholder="Email" className = "border border-gray-500 p-2 rounded"/>
                    <input type="password" placeholder="Password" className = "border border-gray-500 p-2 rounded"/>
                    <button type="submit" className = "bg-blue-500 text-white p-2 rounded">Sign Up</button>
                </form>
                </div>
        )

    }
