import { useContext, createContext, useState, useEffect } from 'react'
import GetUserData from './DecodeToken'

const AuthContext = createContext({
	isAuthenticated: false,
	getAuthToken: () => {},
	saveUser: userData => {},
	getRefreshToken: () => {},
	getUser: () => {},
	logout: () => {},
})

export function AuthProvider({ children }) {
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const [authToken, setAuthToken] = useState('')
	const [user, setUser] = useState('')

	useEffect(() => {
		checkAuth()
	}, [])

	function checkAuth() {
		if (authToken) {
			setIsAuthenticated(true)
		} else {
			const token = getRefreshToken()
			if (token) {
				const user = GetUserData(token)
				const userData = { user, token }
				saveUser(userData)
			}
		}
	}

	function getAuthToken() {
		return authToken
	}

	function getRefreshToken() {
		const token = localStorage.getItem('auth_token')
		if (token) {
			const refreshToken = JSON.parse(token)
			return refreshToken
		}
		return null
	}

	function saveUser(userData) {
		setAuthToken(userData.token)
		setUser(userData.user)
		localStorage.setItem('auth_token', JSON.stringify(userData.token))
		setIsAuthenticated(true)
	}
	function getUser() {
		return user
	}

	function logout() {
		localStorage.removeItem('auth_token')
		setIsAuthenticated(false)
		setUser('')
		setAuthToken('')
	}

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated,
				getAuthToken,
				saveUser,
				getRefreshToken,
				getUser,
				logout,
			}}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => useContext(AuthContext)
