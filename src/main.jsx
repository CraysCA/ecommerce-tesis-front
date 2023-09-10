import ReactDOM from 'react-dom/client'
import { RouterProvider, createHashRouter } from 'react-router-dom'
import './index.css'

import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Logout from './pages/Logout'
import NotFound from './pages/NotFound'

import ProtectedRoute from './layouts/ProtectedRoute'
import { AuthProvider } from './auth/AuthProvider'
import { CookiesProvider } from 'react-cookie'

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
		path: '/',
		element: <ProtectedRoute />,
		children: [
			{
				path: '/dashboard',
				element: <Dashboard />,
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
		<CookiesProvider defaultSetOptions={{ path: '/' }}>
			<RouterProvider router={router} />
		</CookiesProvider>
	</AuthProvider>,
)
