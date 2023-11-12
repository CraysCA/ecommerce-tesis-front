import { useContext } from 'react'
import { Navbar } from '../components/Navbar'
import { CartContext } from '../context/ShoppingCartContext'

export default function ShoppingCart() {
	const [cart, setCart] = useContext(CartContext)
	if (cart.length > 0) localStorage.setItem('cart', JSON.stringify(cart))

	const quantity = cart.reduce((acc, item) => acc + item.quantity, 0)

	const totalPrice = cart
		.reduce((acc, item) => acc + item.quantity * item.price, 0)
		.toFixed(2)

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

	return (
		<main>
			<Navbar />
			<section className="flex flex-col items-center ">
				<div>total de productos en el carrito: {quantity}</div>
				<div>
					{cart.map(product => (
						<div
							key={product.id}
							className="bg-white border border-gray-200  rounded-lg shadow hover:bg-gray-100 w-[490px] h-[140px] overflow-hidden flex gap-4">
							<div>
								<img
									className=" object-contain w-40 "
									src={product.img}
									alt={product.name}
									loading="lazy"
								/>
							</div>
							<div>
								<h3 className="text-lg cursor-pointer">
									<b>
										<u>{product.name}</u>
									</b>
								</h3>
								<p>precio: {product.price} VES</p>
								<div className="flex gap-2">
									<p>cantidad: </p>
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
					))}
				</div>

				<div>precio total: {totalPrice} VES</div>

				<button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
					Pagar
				</button>
			</section>
		</main>
	)
}
