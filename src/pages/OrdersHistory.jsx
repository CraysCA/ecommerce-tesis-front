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

	return (
		<main>
			<Navbar />
			{invoices.length > 0 ? (
				<section className="flex flex-col items-center ">
					<div>
						{invoices.map(invoice => (
							<div
								key={invoice.id}
								className="bg-white border border-gray-200  rounded-lg shadow hover:bg-gray-100 w-[500px] h-[140px] overflow-hidden flex gap-6">
								<div></div>
								<div>
									<h3 className="text-lg cursor-pointer">
										<b>
											Nr.º de orden: <u>{invoice.orderId}</u>
										</b>
									</h3>
									<p>
										<b>Estado:</b> <span>{invoice.status}</span>
									</p>
									<div className="flex gap-2">
										<b>Lista de productos:</b>
										{invoice.order.map(product => (
											<div key={invoice.order.id}>
												<img
													src={product.product.img}
													alt={product.product.name}
													className="w-6 h-6 object-contain  border border-spacing-1 cursor-pointer rounded-sm"
													title={product.product.name}
												/>
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
