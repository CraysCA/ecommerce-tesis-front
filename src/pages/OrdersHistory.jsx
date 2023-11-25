import { useContext, useState, useEffect } from 'react'
import { Navbar } from '../components/Navbar'
import { CartContext } from '../context/ShoppingCartContext'

import { useAuth } from '../auth/AuthProvider'

import { fetchGetInvoice } from '../api/fetchGetInvoice'

export default function OrdersHistory() {
	const [cart, setCart] = useContext(CartContext)
	if (cart.length > 0) localStorage.setItem('cart', JSON.stringify(cart))
	const [invoices, setInvoices] = useState([])
	const [redirect, setRedirect] = useState(false)

	const auth = useAuth()
	const user = auth.getUser()

	useEffect(() => {
		async function getInvoices() {
			const invoicesData = await fetchGetInvoice(user.id)

			setInvoices(invoicesData.data)
		}
		getInvoices()
	})

	const parseDate = date => {
		const parsedDate = new Date(date)
		return parsedDate.toLocaleDateString()
	}

	const cropOrderId = orderId => {
		const arrayOrderId = orderId.split('-')
		return arrayOrderId[arrayOrderId.length - 1]
	}

	return (
		<main>
			<Navbar />

			{invoices.length > 0 ? (
				<section className="flex flex-col items-center mt-4 border-gray-100 border pt-4 rounded-md mr-4 shadow-md pb-4">
					<h1 className="text-center font-bold text-lg pb-2">
						Historial de pedidos
					</h1>
					<div>
						{invoices.map(invoice => (
							<div
								key={invoice.id}
								className="bg-white border border-gray-200  rounded-lg shadow hover:bg-gray-100 w-[1000px]   flex gap-6 mb-6">
								<div className="w-full">
									<div className="flex flex-row gap-4 justify-between px-6 pt-6 ">
										<div className="flex flex-col gap-3">
											<div>
												<p>Fecha de pedido:</p>
												<b>{parseDate(invoice.createdAt)}</b>
											</div>
											<div>
												<h3 className="text-lg">
													<b>
														Nr.º de orden:
														<u className="cursor-pointer ml-2">
															{cropOrderId(invoice.orderId)}
														</u>
													</b>
												</h3>
											</div>
										</div>
										<p className="flex flex-row items-center gap-2">
											<b>Estado: </b>
											<span>{invoice.status}</span>
											<div
												className={
													invoice.status === 'Entregado'
														? ' w-2 h-2 bg-green-500 rounded'
														: 'w-2 h-2 bg-yellow-500 rounded'
												}></div>
										</p>
										<div>
											Precio total:
											<b className="text-blue-800"> {invoice.totalPrice} VES</b>
										</div>
									</div>
									<div className="w-full border border-b-black my-4"></div>

									<b className="ml-6">Lista de productos:</b>
									<div className="mt-4">
										{invoice?.order?.map(product => (
											<div
												key={product.product.id}
												className="bg-white border border-gray-200  rounded-lg shadow hover:bg-gray-100 mx-4 mb-4 h-[140px] overflow-hidden flex  gap-4 flex-grow relative">
												<div>
													<img
														className=" object-contain w-40 "
														src={product.product.img}
														alt={product.product.name}
														loading="lazy"
													/>
												</div>

												<div>
													<h3 className="text-lg cursor-pointer pt-2">
														<b>
															<u>{product.product.name}</u>
														</b>
													</h3>
													<div>
														<p className="py-2">
															Precio por unidad:
															<b className="text-blue-800 ml-2">
																{product.product.price} VES
															</b>
														</p>
													</div>
													<p>cantidad: {product.amount}</p>
												</div>
											</div>
										))}
									</div>
								</div>
							</div>
						))}
					</div>
				</section>
			) : (
				<section className="h-96 flex  justify-center items-center">
					<h1 className="font-bold text-xl">No ha comprado ningún producto</h1>
				</section>
			)}
		</main>
	)
}
