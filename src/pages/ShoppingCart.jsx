import { useContext, useState } from 'react'
import { Navbar } from '../components/Navbar'
import { CartContext } from '../context/ShoppingCartContext'
import { v4 as uuid } from 'uuid'
import { useAuth } from '../auth/AuthProvider'
import { fetchCreateInvoice } from '../api/fetchCreateInvoice'
import { IconTrash } from '@tabler/icons-react'

export default function ShoppingCart() {
	const [cart, setCart] = useContext(CartContext)
	if (cart.length > 0) localStorage.setItem('cart', JSON.stringify(cart))
	const [redirect, setRedirect] = useState(false)

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
		const invoiceData = {
			orderId: uuid(),
			status: 'procesando',
			userId: user.id,
			products: cart.map(product => {
				return {
					id: product.id,
					quantity: product.quantity,
				}
			}),
		}
		const invoice = await fetchCreateInvoice(invoiceData)
		if (invoice.success) {
			localStorage.setItem('cart', JSON.stringify([]))
		} else {
			return <h1>error</h1>
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
											<p>
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
							className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
							Pagar
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
