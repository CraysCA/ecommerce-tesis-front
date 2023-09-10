import { Link } from 'react-router-dom'
export default function NotFound() {
	return (
		<main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
			<div className="text-center">
				<p className="text-base font-semibold text-dark-blue">404</p>
				<h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
					Página no encontrada
				</h1>
				<p className="mt-6 text-base leading-7 text-gray-600">
					Lo sentimos, no hemos podido encontrar la página que busca.
				</p>
				<div className="mt-10 flex items-center justify-center gap-x-6">
					<Link
						to="/dashboard"
						className=" text-white bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-all duration-150 hover:bg-blue-900 hover:scale-105">
						Volver a inicio
					</Link>
				</div>
			</div>
		</main>
	)
}
