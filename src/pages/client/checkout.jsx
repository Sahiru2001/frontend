import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { BiMinus, BiPlus, BiTrash } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";

export default function CheckoutPage() {
	const location = useLocation();
	console.log(location.state.cart);

	const [cart, setCart] = useState(location.state?.cart || []);
	const [phoneNumber, setPhoneNumber] = useState("");
	const [address, setAddress] = useState("");

	function getTotal() {
		let total = 0;
		cart.forEach((item) => {
			total += item.price * item.qty;
		});
		return total;
	}
	function removeFromCart(index) {
		const newCart = cart.filter((item, i) => i !== index);
		setCart(newCart);
	}

	function changeQty(index, qty) {
		const newQty = cart[index].qty + qty;
		if (newQty <= 0) {
			removeFromCart(index);
			return;
		} else {
			const newCart = [...cart];
			newCart[index].qty = newQty;
			setCart(newCart);
		}
	}
	async function placeOrder() {
		const token = localStorage.getItem("token");
		if (!token) {
			toast.error("Please login to place order");
			return;
		}

		const orderInformation = {
			products: [],
			phone: phoneNumber,
			address:address
		};

		for (let i = 0; i < cart.length; i++) {
			const item = {
				productId: cart[i].productId,
				qty: cart[i].qty
			};
			orderInformation.products[i] = item;
		}
		try {
			const res = await axios.post(
				import.meta.env.VITE_BACKEND_URL + "/api/orders",
				orderInformation,
				{
					headers: {
						Authorization: "Bearer " + token,
					},
				}
			);
			toast.success("Order placed successfully");
			console.log(res.data);
		} catch (err) {
			console.log(err);
			toast.error("Error placing order");
			return;
		}
	}

	return (
		<div className="w-full h-full flex flex-col items-center pt-4 relative ">
			<div className="w-[340px]  shadow-2xl absolute top-1 right-1 flex flex-col justify-center items-center p-1 gap-10">
				<p className="text-2xl text-black font-bold">
					Total:
					<span className="text-red-700 font-bold mx-2">
						{getTotal().toFixed(2)}
					</span>
				</p>
				<input
					type="text"
					className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-secondary"
					placeholder="Phone Number"
					value={phoneNumber}
					onChange={(e) => setPhoneNumber(e.target.value)}
					/>

				<input
					type="text"
					className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-secondary"
					placeholder="Address"
					value={address}
					onChange={(e) => setAddress(e.target.value)}
					/>
				

				<button
					className="text-white bg-blue-500 px-4 py-2 rounded-lg font-bold hover:bg-secondary transition-all duration-300"
					onClick={placeOrder}
				>
					Place Order
				</button>
			</div>
			{cart.map((item, index) => {
				return (
					<div
						key={item.productId}
						className="w-[600px] my-4 h-[100px] rounded-tl-3xl rounded-bl-3xl rounded-br-3xl rounded-tr-3xl flex flex-row relative items-center bg-grey-200 shadow-2xl"
					>
						<img
							src={item.image}
							className="w-[100px] h-[100px] object-cover rounded-3xl"
						/>
						<div className="w-[250px] h-full] flex flex-col items-start pl-4">
							<h1 className="text-xl font-semibold text-black">
								{item.name}
							</h1>
							<h1 className="text-md font-semibold text-black">
								{item.productId}
							</h1>
							{item.labledPrice > item.price ? (
								<div>
									<span className="text-md mx-1 font-semibold text-black line-through">
										{item.labledPrice.toFixed(2)}
									</span>
									<span className="text-md mx-1 font-bold text-red-700">
										{item.price.toFixed(2)}
									</span>
								</div>
							) : (
								<span className="text-md mx-1 font-bold text-red-700">
									{item.price.toFixed(2)}
								</span>
							)}
						</div>
						<div className="max-w-[100px] h-full flex flex-row justify-evenly items-center">
							<button
								className="text-white font-bold rounded-xl hover:bg-secondary p-2 text-xl cursor-pointer aspect-square bg-blue-500"
								onClick={() => {
									changeQty(index, -1);
								}}
							>
								<BiMinus />
							</button>
							<h1 className="text-xl text-blue-500 font-semibold h-full flex items-center mx-2">
								{item.qty}
							</h1>
							<button
								className="text-white font-bold rounded-xl hover:bg-secondary p-2 text-xl cursor-pointer aspect-square bg-blue-500"
								onClick={() => {
									changeQty(index, 1);
								}}
							>
								<BiPlus />
							</button>
						</div>
						{/* total */}
						<div className="w-[200px] h-full flex flex-col justify-center items-end pr-4">
							<h1 className="text-xl font-bold text-red-700">
								Rs. {(item.price * item.qty).toFixed(2)}
							</h1>
						</div>
						<button
							className="absolute text-red-600 cursor-pointer hover:bg-red-600 hover:text-white rounded-full p-2 right-[-35px]"
							onClick={() => {
								removeFromCart(index);
							}}
						>
							<BiTrash />
						</button>
					</div>
				);
			})}
		</div>
	);
}