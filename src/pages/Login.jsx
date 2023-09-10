import { Toaster, toast } from 'sonner'

import { useState } from 'react'

import { useAuth } from '../auth/AuthProvider'
import { Navigate } from 'react-router-dom'
import GetUserData from '../auth/DecodeToken'

export default function Login() {
	const [credentials, setCredentials] = useState({
		email: '',
		password: '',
	})

	const auth = useAuth()

	if (auth.isAuthenticated) return <Navigate to="/dashboard" replace={true} />

	const handlerChange = e => {
		setCredentials({ ...credentials, [e.target.name]: e.target.value })
	}

	const handlerSubmit = async e => {
		e.preventDefault()
		const token = false
		if (token) {
			const user = GetUserData(token)
			const userData = { token, user }

			auth.saveUser(userData)

			return <Navigate to="/dashboard" replace={true} />
		} else {
			toast.error('Correo o contraseña incorrectos')
		}
	}

	return (
		<main className=" sm:mx-auto sm:w-full sm:max-w-md md:mx-auto md:w-full md:max-w-md">
			<div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
						<h1
							className="cursor-pointer
						  text-2xl font-bold text-dark-blue overflow-hidden">
							VITAL<span className=" text-red-500">CLINIC</span>
						</h1>
					</h2>
				</div>
				<div className="mt-10 ">
					<form
						onSubmit={handlerSubmit}
						className="space-y-2 shadow-md shadow-gray-300 rounded-md p-10 flex flex-col gap-5 bg-white ">
						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium leading-6 text-gray-900">
								Correo
							</label>
							<div className="mt-2">
								<input
									onChange={handlerChange}
									id="email"
									name="email"
									type="email"
									required
									className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-700 sm:text-sm sm:leading-6 outline-none transition-all duration-500 "
								/>
							</div>
						</div>

						<div>
							<div className="flex items-center justify-between">
								<label
									htmlFor="password"
									className="block text-sm font-medium leading-6 text-gray-900">
									Contraseña
								</label>
							</div>
							<div className="mt-2">
								<input
									onChange={handlerChange}
									id="password"
									name="password"
									type="password"
									required
									className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-700 sm:text-sm sm:leading-6 outline-none transition-all duration-500"
								/>
							</div>
						</div>

						<div>
							<button className="flex justify-center items-center w-full  text-white bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2  focus:outline-none transition-all duration-150 hover:bg-blue-900 hover:scale-105">
								Entrar
							</button>
						</div>
						<div className="text-sm text-center">
							<a
								href="#"
								onClick={() => {
									alert('Contacta con soporte')
								}}
								className="font-semibold text-blue-700 hover:text-indigo-500">
								Olvidé mi Contraseña
							</a>
						</div>
					</form>

					{/* <p className="mt-10 text-center text-sm text-gray-500">
						Not a member?
						<a
							href="#"
							className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
							Start a 14 day free trial
						</a>
					</p> */}
				</div>
			</div>
			<Toaster />
		</main>
	)
}
