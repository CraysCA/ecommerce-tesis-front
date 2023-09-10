import { useContext, createContext, useState, useEffect } from 'react'
import GetUserData from './DecodeToken'
import { useCookies } from 'react-cookie'

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
	const [cookies, setCookie, removeCookie] = useCookies(['auth_token'])

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
				console.log(user)
				const userData = { user, token }
				saveUser(userData)
			}
		}
	}

	function getAuthToken() {
		return authToken
	}

	function getRefreshToken() {
		const token = cookies.auth_token
		console.log(token)
		console.log('aaaa')
		if (token) return token

		return null
	}

	function saveUser(userData) {
		setAuthToken(userData.token)
		setUser(userData.user)
		setCookie('auth_token', userData.token, {
			path: '/',
			maxAge: 14400,
		})
		setIsAuthenticated(true)
	}
	function getUser() {
		return user
	}

	function logout() {
		removeCookie('auth_token')
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
