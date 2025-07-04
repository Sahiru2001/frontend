import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import Loading from "../../components/loading";

Modal.setAppElement("#root");

export default function AdminOrdersPage() {
	const [orders, setOrders] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [activeOrder, setActiveOrder] = useState(null);

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (!token) {
			alert("Please login first");
			return;
		}
		axios
			.get(import.meta.env.VITE_BACKEND_URL + "/api/orders", {
				headers: { Authorization: "Bearer " + token },
			})
			.then((res) => {
				setOrders(res.data);
				setIsLoading(false);
			})
			.catch((e) => {
				alert("Error fetching orders: " + (e.response?.data?.message || "Unknown error"));
				setIsLoading(false);
			});
	}, []);

	const renderOrderDetails = () => {
		if (activeOrder === null) return null;
		const order = orders[activeOrder];
		return (
			<div className="p-4 space-y-4 max-h-[80vh] overflow-y-auto">
				<h2 className="text-xl font-bold mb-2">Order Details - {order.orderId}</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
					<p><strong>Name:</strong> {order.name}</p>
					<p><strong>Email:</strong> {order.email}</p>
					<p><strong>Phone:</strong> {order.phone}</p>
					<p><strong>Address:</strong> {order.address}</p>
					<p><strong>Date:</strong> {new Date(order.date).toLocaleString()}</p>
					<p><strong>Status:</strong> {order.status}</p>
					<p><strong>Total:</strong> Rs. {order.total?.toFixed(2)}</p>
					{order.labledTotal && (
						<p><strong>Labeled Total:</strong> Rs. {order.labledTotal.toFixed(2)}</p>
					)}
				</div>

				{order.products?.length > 0 ? (
					<div className="mt-4">
						<h3 className="text-lg font-semibold mb-2">Products</h3>
						<div className="grid gap-4">
							{order.products.map((product, idx) => {
								const p = product.productInfo;
								return (
									<div key={product._id} className="border p-3 rounded shadow-sm bg-white">
										<div className="flex gap-4">
											<img
												src={p.images[0]}
												alt={p.name}
												className="w-20 h-20 object-cover rounded"
											/>
											<div className="flex-1 space-y-1 text-sm">
												<p><strong>{p.name}</strong></p>
												<p>{p.description}</p>
												<p><strong>Quantity:</strong> {product.quantity}</p>
												<p>
													<strong>Price:</strong> Rs. {p.price} &nbsp;
													{p.labledPrice && (
														<span className="line-through text-red-500 text-xs">
															Rs. {p.labledPrice}
														</span>
													)}
												</p>
												<p className="text-xs text-gray-500">
													Other names: {p.altNames.join(", ")}
												</p>
											</div>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				) : (
					<p className="mt-4 text-gray-500 italic">No products in this order.</p>
				)}
			</div>
		);
	};

	return (
		<div className="w-full h-full max-h-screen overflow-y-auto p-4 bg-gray-50">
			{isLoading ? (
				<Loading />
			) : (
				<div className="overflow-x-auto">
					<Modal
						isOpen={isModalOpen}
						onRequestClose={() => setIsModalOpen(false)}
						className="max-w-3xl mx-auto my-10 bg-white rounded-lg shadow-lg p-6 outline-none"
						overlayClassName="fixed inset-0 bg-[#00000040] bg-opacity-50 flex justify-center items-start overflow-y-auto z-50"
					>
						{renderOrderDetails()}
						<div className="text-right mt-4">
							<button
								className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
								onClick={() => setIsModalOpen(false)}
							>
								Close
							</button>
						</div>
					</Modal>
					<table className="min-w-full border-collapse bg-white shadow-md rounded-md overflow-hidden text-sm">
						<thead className="bg-gray-100 text-gray-700 uppercase text-xs">
							<tr>
								<th className="px-4 py-3 text-left">Order Id</th>
								<th className="px-4 py-3 text-left">Name</th>
								<th className="px-4 py-3 text-left">Email</th>
								<th className="px-4 py-3 text-left">Phone No</th>
								<th className="px-4 py-3 text-left">Address</th>
								<th className="px-4 py-3 text-left">Total</th>
								<th className="px-4 py-3 text-left">Date</th>
								<th className="px-4 py-3 text-left">Status</th>
							</tr>
						</thead>
						<tbody>
							{orders.map((order, index) => (
								<tr
									key={index}
									onClick={() => {
										setIsModalOpen(true);
										setActiveOrder(index);
									}}
									className="border-b hover:bg-gray-50 cursor-pointer"
								>
									<td className="px-4 py-2">{order.orderId}</td>
									<td className="px-4 py-2">{order.name}</td>
									<td className="px-4 py-2">{order.email}</td>
									<td className="px-4 py-2">{order.phone}</td>
									<td className="px-4 py-2">{order.address}</td>
									<td className="px-4 py-2 font-semibold text-green-700">
										{order.total?.toFixed(2)}
									</td>
									<td className="px-4 py-2">
										{new Date(order.date).toLocaleDateString()}
									</td>
									<td className="px-4 py-2">
										<span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
											{order.status}
										</span>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
}
