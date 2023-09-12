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

export const Sidebar = () => {
	const location = useLocation()
	const currentPath = location.pathname
	return (
		<aside className="bg-[#9db3ed] fixed left-0 top-0 w-30 h-full text-white">
			<h1 className="text-2xl font-bold text-center my-5">Logo</h1>
			<ul className="flex flex-col items-center gap-4 pl-4">
				{sidebarMenu.map(item => (
					<li
						key={item.name}
						className={`p-4 rounded-tl-md rounded-bl-md ${
							currentPath === item.to ? 'bg-[#fafafa]' : ''
						}`}>
						<Link
							to={item.to}
							className={`box-content block  p-4 rounded-md ${
								currentPath === item.to ? 'bg-blue-700' : ''
							}`}>
							{item.src}
						</Link>
					</li>
				))}
			</ul>
		</aside>
	)
}
