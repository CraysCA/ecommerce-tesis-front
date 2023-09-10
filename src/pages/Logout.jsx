import { Navigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthProvider'
export default function Logout() {
	const auth = useAuth()
	auth.logout()

	return <Navigate to="/login" />
}
