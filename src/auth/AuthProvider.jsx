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

	const checkAuth = () => {
		if (authToken) setIsAuthenticated(true)

		if (!authToken) {
			const token = getRefreshToken()
			if (token) {
				const user = GetUserData(token)
				const userData = { user, token }
				saveUser(userData)
			}
		}
	}

	const getAuthToken = () => authToken
	const getUser = () => user

	const getRefreshToken = () => {
		const token = cookies.auth_token
		if (token) return token
		return null
	}

	const saveUser = userData => {
		setAuthToken(userData.token)
		setUser(userData.user)
		setCookie('auth_token', userData.token, {
			path: '/',
			maxAge: 14400,
		})
		setIsAuthenticated(true)
	}

	const logout = () => {
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
