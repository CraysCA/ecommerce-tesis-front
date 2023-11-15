import { Link, useLocation, Navigate } from 'react-router-dom'
import {
	IconHome,
	IconTruckReturn,
	IconShoppingCart,
	IconShoppingBag,
	IconUserCircle,
} from '@tabler/icons-react'
import { useContext } from 'react'
import { CartContext } from '../context/ShoppingCartContext'
import { useAuth } from '../auth/AuthProvider'

const sidebarMenu = [
	{
		name: 'home',
		src: <IconHome width={33} height={33} />,
		to: '/',
	},
	{
		name: 'order',
		src: <IconTruckReturn width={33} height={33} />,
		to: '/order',
	},
	{
		name: 'cosas',
		src: <IconHome width={33} height={33} />,
		to: '#',
	},
]

export const Navbar = () => {
	const auth = useAuth()
	const user = auth.getUser()

	const checkAuth = e => {
		if (!auth.isAuthenticated) {
			e.preventDefault()
			alert('necesitas iniciar sesión')
		}
	}

	const validLogout = e => {
		if (auth.isAuthenticated) {
			e.preventDefault()
			const text = 'Desea cerrar sesión?'
			console.log(confirm(text))
			if (confirm(text) == true) return true
		}
	}

	const [cart, setCart] = useContext(CartContext)

	const quantity = cart.reduce((acc, item) => acc + item.quantity, 0)

	const location = useLocation()
	const currentPath = location.pathname
	return (
		<div>
			<header className="bg-white sticky left-0 top-0 h-30 w-full text-black shadow-sm">
				<ul className="flex flex-row items-center justify-center gap-4 pl-4 ">
					<Link to="/" className="flex-grow basis-0">
						<h1 className="text-2xl font-bold text-center my-5 flex flex-grow basis-0 cursor-pointer text-blue-800">
							VITAL<span className=" text-red-500">CLINIC</span>
						</h1>
					</Link>

					<form className="flex-grow basis-0">
						<div className="relative">
							<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
								<svg
									className="w-4 h-4 text-gray-500 dark:text-gray-400"
									fill="none"
									viewBox="0 0 20 20">
									<path
										stroke="currentColor"
										d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
									/>
								</svg>
							</div>
							<input
								type="search"
								id="default-search"
								className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
								placeholder="Buscar producto"
								required
							/>
							<button
								type="submit"
								className="text-white absolute right-2.5 bottom-[0.4rem] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1.5">
								Buscar
							</button>
						</div>
					</form>
					<nav className="flex flex-row items-center justify-center  gap-2  flex-grow basis-0 ">
						<Link
							//onClick={validLogout}

							to={auth.isAuthenticated ? '/logout' : '/login'}
							className="p-3 rounded-sm hover:bg-gray-200 cursor-pointer flex items-center gap-2">
							<IconUserCircle width={28} height={28} />
							{auth.isAuthenticated ? (
								<p> Hola, {user.name} </p>
							) : (
								'Iniciar Sesión'
							)}
						</Link>

						<Link
							to="/"
							className="p-3 rounded-sm hover:bg-gray-200 cursor-pointer">
							<IconShoppingBag width={28} height={28} />
						</Link>

						<Link
							to="/shopping-cart"
							onClick={checkAuth}
							className="p-3 rounded-sm hover:bg-gray-200 cursor-pointer  relative inline-flex items-center">
							<IconShoppingCart width={28} height={28} />
							{quantity === 0 ? (
								''
							) : (
								<div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-blue-700 border-2 border-white rounded-full -top-1 -end-1">
									{quantity}
								</div>
							)}
						</Link>
					</nav>
				</ul>
			</header>
		</div>
	)
}

// {sidebarMenu.map(item => (
// 	<li
// 		key={item.name}
// 		className={`p-4 rounded-tl-md rounded-bl-md ${
// 			currentPath === item.to ? 'bg-[#fafafa]' : ''
// 		}`}>
// 		<Link
// 			to={item.to}
// 			className={`box-content block  p-4 rounded-md ${
// 				currentPath === item.to ? 'bg-blue-700' : ''
// 			}`}>
// 			{item.src}
// 		</Link>
// 	</li>
// ))}
