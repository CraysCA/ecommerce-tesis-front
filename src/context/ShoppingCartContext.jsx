import { createContext, useState, useEffect } from 'react'

export const CartContext = createContext(null)

export default function ShoppingCartProvider({ children }) {
	useEffect(() => {
		checkCart()
	}, [])
	const [cart, setCart] = useState([])

	function checkCart() {
		if (cart.length > 0) {
			console.log(cart)
			localStorage.setItem('cart', JSON.stringify(cart))
		}
		if (localStorage.getItem('cart')) {
			setCart(JSON.parse(localStorage.getItem('cart')))
		} else {
			localStorage.setItem('cart', JSON.stringify([]))
		}
	}

	return (
		<CartContext.Provider value={[cart, setCart]}>
			{children}
		</CartContext.Provider>
	)
}
