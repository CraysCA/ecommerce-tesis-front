import { Buffer } from 'buffer'
export const fetchLogin = async credentials => {
	try {
		const { email, password } = credentials
		const url = `${import.meta.env.VITE_BACKEND_API}/auth/login`
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization:
					'Basic ' + Buffer.from(email + ':' + password).toString('base64'),
			},
			cache: 'no-store',
		})
		const data = await response.json()

		return data.success ? data.data : null
	} catch (error) {
		console.log(error)
	}
}
