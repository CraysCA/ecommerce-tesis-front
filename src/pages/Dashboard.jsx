import { Navbar } from '../components/Navbar'
import { useState, useEffect, useContext } from 'react'
import { CartContext } from '../context/ShoppingCartContext'

export default function Dashboard() {
	const [cart, setCart] = useContext(CartContext)
	if (cart.length > 0) localStorage.setItem('cart', JSON.stringify(cart))

	const [products, setProducts] = useState([])
	const [search, setSearch] = useState('')

	const handlerSearch = e => {
		setSearch(e.target.value)
	}

	let results = []

	if (!search) {
		results = products
	} else {
		results = products.filter(data =>
			data.name.toLowerCase().includes(search.toLocaleLowerCase()),
		)
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
				{results.map(product => (
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
									onClick={() => addToCart(product)}>
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
