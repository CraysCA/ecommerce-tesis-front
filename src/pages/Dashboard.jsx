import { Navbar } from '../components/Navbar'
import { useState, useEffect, useContext } from 'react'
import { CartContext } from '../context/ShoppingCartContext'

export default function Dashboard() {
	const [cart, setCart] = useContext(CartContext)
	const [products, setProducts] = useState([])

	const addToCart = id => {
		setCart(currentProducts => {
			console.log(currentProducts)
			const isProductsFound = currentProducts.find(product => product.id === id)
			if (isProductsFound) {
				return currentProducts.map(product => {
					if (product.id === id)
						return { ...product, quantity: product.quantity + 1 }

					return product
				})
			} else {
				return [...currentProducts, { id, quantity: 1 }]
			}
		})
	}

	const removeProduct = id => {
		setCart(currentProducts => {
			if (currentProducts.find(product => product.id === id)?.quantity === 1) {
				return currentProducts.filter(product => product.id !== id)
			} else {
				return currentProducts.map(product => {
					if (product.id === id) {
						return { ...product, quantity: product.quantity - 1 }
					} else {
						return product
					}
				})
			}
		})
	}

	useEffect(() => {
		fetch(`https://tesis-backend-dev-fxdg.1.us-1.fl0.io/products/`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			next: {
				revalidate: 60,
			},
		})
			.then(res => res.json())
			.then(data => setProducts(data.success && data.data ? data.data : []))
	})

	return (
		<>
			<Navbar />
			<h1>Products</h1>
			<section className="flex gap-3 p-6 flex-row flex-wrap">
				{products.map(product => (
					<div
						key={product.id}
						className="w-full bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 max-w-[240px] max-h-[370px]">
						<div>
							<img
								className="rounded-t-lg object-contain"
								src={product.img}
								alt={product.name}
								loading="lazy"
							/>

							<div className="px-5 pb-5 pt-1 flex flex-col gap-1">
								<h5 className="text-xl font-semibold tracking-tight text-gray-900 truncate ">
									{product.name}
								</h5>

								<div className="flex items-center justify-between">
									<span className="text-2xl font-bold text-gray-900 ">
										{product.price} VES
									</span>
								</div>
								<button
									className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
									onClick={() => addToCart(product.id)}>
									Añadir al carrito
								</button>
							</div>
						</div>
					</div>
				))}
			</section>
		</>
	)
}
