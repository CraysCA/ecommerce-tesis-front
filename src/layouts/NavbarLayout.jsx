import { Navbar } from '../components/Navbar'

export default function NavbarLayout({ children }) {
	return (
		<div>
			<Navbar>
				<main className="w-full">{children}</main>
			</Navbar>
		</div>
	)
}
