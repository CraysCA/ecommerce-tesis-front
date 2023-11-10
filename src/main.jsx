import ReactDOM from 'react-dom/client'
import { RouterProvider, createHashRouter } from 'react-router-dom'
import './index.css'

import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Logout from './pages/Logout'
import NotFound from './pages/NotFound'
import Register from './pages/Register'

import ProtectedRoute from './layouts/ProtectedRoute'
import { AuthProvider } from './auth/AuthProvider'
import ShoppingCartProvider from './context/ShoppingCartContext'
import ShoppingCart from './pages/ShoppingCart'

const router = createHashRouter([
	{
		path: '/login',
		element: <Login />,
	},
	{
		path: '/logout',
		element: <Logout />,
	},
	{
		path: '/register',
		element: <Register />,
	},
	{
		path: '/shopping-cart',
		element: <ShoppingCart />,
	},
	{
		path: '/dashboard',
		element: <Dashboard />,
	},
	// {
	// 	path: '/',
	// 	element: <ProtectedRoute />,
	// 	children: [
	// 		{
	// 			path: '/dashboard',
	// 			element: <Dashboard />,
	// 		},
	// 	],
	// },
	{
		path: '*',
		element: <NotFound />,
	},
])

ReactDOM.createRoot(document.getElementById('root')).render(
	<AuthProvider>
		<ShoppingCartProvider>
			<RouterProvider router={router} />
		</ShoppingCartProvider>
	</AuthProvider>,
)
