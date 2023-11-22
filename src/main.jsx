import ReactDOM from 'react-dom/client'
import { RouterProvider, createHashRouter } from 'react-router-dom'
import './index.css'

import Login from './pages/Login'
import MainHub from './pages/MainHub'
import Logout from './pages/Logout'
import NotFound from './pages/NotFound'
import Register from './pages/Register'

import ProtectedRoute from './layouts/ProtectedRoute'
import { AuthProvider } from './auth/AuthProvider'
import ShoppingCartProvider from './context/ShoppingCartContext'
import ShoppingCart from './pages/ShoppingCart'
import OrdersHistory from './pages/OrdersHistory'

const router = createHashRouter([
	{
		path: '/',
		element: <MainHub />,
	},
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
		path: '/',
		element: <ProtectedRoute />,
		children: [
			{
				path: '/shopping-cart',
				element: <ShoppingCart />,
			},
			{
				path: '/orders-history',
				element: <OrdersHistory />,
			},
		],
	},
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
