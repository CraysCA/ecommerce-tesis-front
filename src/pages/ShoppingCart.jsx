import { useContext, useState } from 'react'
import { Navbar } from '../components/Navbar'
import { CartContext } from '../context/ShoppingCartContext'
import { v4 as uuid } from 'uuid'
import { useAuth } from '../auth/AuthProvider'
import { fetchCreateInvoice } from '../api/fetchCreateInvoice'
import { IconTrash } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'

export default function ShoppingCart() {
	const [cart, setCart] = useContext(CartContext)
	if (cart.length > 0) localStorage.setItem('cart', JSON.stringify(cart))
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()

	const auth = useAuth()
	const user = auth.getUser()

	const quantity = cart.reduce((acc, item) => acc + item.quantity, 0)

	const totalPrice = Number(
		cart.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2),
	)

	const getQuantityById = id => {
		return cart.find(product => product.id === id)?.quantity || 0
	}

	const addToCart = newProduct => {
		setCart(currentProducts => {
			const isProductsFound = currentProducts.find(
				product => product.id === newProduct.id,
			)

			if (isProductsFound) {
				return currentProducts.map(product => {
					if (product.id === newProduct.id)
						return { ...product, quantity: product.quantity + 1 }

					return product
				})
			} else {
				return [...currentProducts, { ...newProduct, quantity: 1 }]
			}
		})
	}

	const removeProduct = newProduct => {
		setCart(currentProducts => {
			if (
				currentProducts.find(product => product.id === newProduct.id)
					?.quantity === 1
			) {
				localStorage.setItem('cart', JSON.stringify([]))
				return currentProducts.filter(product => product.id !== newProduct.id)
			} else {
				return currentProducts.map(product => {
					if (product.id === newProduct.id) {
						return { ...product, quantity: product.quantity - 1 }
					} else {
						return product
					}
				})
			}
		})
	}

	const deleteProduct = id => {
		setCart(currentProducts => {
			console.log({ currentProducts })
			console.log({ id })
			if (currentProducts.find(product => product.id === id)) {
				localStorage.setItem(
					'cart',
					JSON.stringify(currentProducts.filter(product => product.id !== id)),
				)

				return currentProducts.filter(product => product.id !== id)
			}
		})
	}

	const createInvoice = async () => {
		setLoading(true)
		const invoiceData = {
			orderId: uuid(),
			status: 'Procesando',
			userId: user.id,
			products: cart.map(product => {
				return {
					id: product.id,
					quantity: product.quantity,
				}
			}),
			totalPrice: Number((totalPrice + 300).toFixed(2)),
		}

		const invoice = await fetchCreateInvoice(invoiceData)
		if (invoice.success) {
			setTimeout(() => {
				setLoading(false)
				setCart([])
				localStorage.setItem('cart', JSON.stringify([]))
				navigate('/processing')
			}, 3000)
		}
	}

	return (
		<main>
			<Navbar />
			{quantity ? (
				<section className="flex">
					<main className="flex flex-col items-center flex-grow mt-4 border-gray-100 border pt-4 rounded-md mr-4 shadow-md ">
						<h1 className="text-center font-bold text-lg pb-2">
							Lista de productos
						</h1>
						<div className="mb-4">
							{cart.map(product => (
								<div
									key={product.id}
									className="bg-white border border-gray-200  rounded-lg shadow hover:bg-gray-100 w-[800px] h-[140px] overflow-hidden flex  gap-4 flex-grow relative">
									<div>
										<img
											className=" object-contain w-40 "
											src={product.img}
											alt={product.name}
											loading="lazy"
										/>
									</div>
									<div>
										<h3 className="text-lg cursor-pointer pt-2">
											<b>
												<u>{product.name}</u>
											</b>
										</h3>
										<div>
											<p className="py-2">
												Precio por unidad:
												<b className="text-blue-800"> {product.price} VES</b>
											</p>
											<div className="flex gap-2">
												<p>Cantidad: </p>
												<button
													className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-500 font-medium rounded-lg text-sm px-2 py-1 text-center"
													onClick={() => removeProduct(product)}>
													-
												</button>
												<p className=" border-gray-600 border inline px-1 rounded">
													{getQuantityById(product.id)}
												</p>
												<button
													className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-500 font-medium rounded-lg text-sm px-2 py-1 text-center"
													onClick={() => addToCart(product)}>
													+
												</button>
											</div>
										</div>
									</div>

									<div className="absolute right-16 top-[52px]">
										<div
											className="cursor-pointer border border-b-gray-100 p-1 rounded-sm hover:border-none hover:bg-red-400"
											title="Eliminar producto"
											onClick={() => deleteProduct(product.id)}>
											<IconTrash />
										</div>
									</div>
								</div>
							))}
						</div>
					</main>
					<aside className="shadow-md border-gray-200 p-4  mr-6 flex-grow mt-4 h-96 flex flex-col gap-4 rounded-md  ">
						<h2 className="text-center font-bold text-lg">
							Resumen del pedido
						</h2>
						<div className="flex justify-between ">
							<p>Subtotal:</p>
							<p>
								<b className="text-blue-800">{totalPrice} VES</b>
							</p>
						</div>
						<div className="w-full border-t-gray-300 border"></div>

						<div className="flex justify-between">
							<p>Total de productos: </p>
							<p>{quantity}</p>
						</div>
						<div className="w-full border-t-gray-300 border"></div>
						<div className="flex justify-between ">
							<p>Costo de envió:</p>
							<p>
								<b className="text-blue-800">300 VES</b>
							</p>
						</div>
						<div className="w-full border-t-gray-300 border"></div>
						<div className="flex justify-between ">
							<p>Precio total: </p>
							<p>
								<b className="text-blue-800">
									{(totalPrice + 300).toFixed(2)} VES
								</b>
							</p>
						</div>

						<button
							onClick={createInvoice}
							className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center h-14 mt-2">
							{loading ? (
								<div className="flex items-center justify-center gap-2">
									Procesando
									<svg
										aria-hidden="true"
										className="w-8 h-8 text-gray-200 animate-spin fill-blue-600"
										viewBox="0 0 100 101"
										xmlns="http://www.w3.org/2000/svg">
										<path
											d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
											fill="currentColor"
										/>
										<path
											d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
											fill="currentFill"
										/>
									</svg>
								</div>
							) : (
								'Pagar'
							)}
						</button>
					</aside>
				</section>
			) : (
				<section className="h-96 flex  justify-center items-center">
					<h1 className="font-bold text-xl">No hay productos en el carrito</h1>
				</section>
			)}
		</main>
	)
}
