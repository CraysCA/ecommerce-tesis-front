import { Link, useLocation } from 'react-router-dom'
import { IconHome, IconTruckReturn } from '@tabler/icons-react'

const sidebarMenu = [
	{
		name: 'home',
		src: <IconHome width={33} height={33} />,
		to: '/dashboard',
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
	const location = useLocation()
	const currentPath = location.pathname
	return (
		<div>
			<header className="bg-[#9db3ed] sticky left-0 top-0 h-30 w-full text-white">
				<ul className="flex flex-row items-center justify-center gap-4 pl-4">
					<h1 className="text-2xl font-bold text-center my-5 flex flex-grow basis-0 cursor-pointer text-blue-800">
						VITAL<span className=" text-red-500">CLINIC</span>
					</h1>
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
								placeholder="Buscar cosas"
								required
							/>
							<button
								type="submit"
								className="text-white absolute right-2.5 bottom-[0.4rem] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1.5">
								Buscar
							</button>
						</div>
					</form>
					<nav className="flex flex-row items-center justify-center  gap-4  flex-grow basis-0 ">
						<li>
							<Link to="#"> cuenta</Link>
						</li>
						<li>
							<Link to="#"> pedidos</Link>
						</li>
						<li>
							<Link to="#"> otra cosa</Link>
						</li>
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