export const fetchRegister = async credentials => {
	try {
		const url = `${import.meta.env.VITE_BACKEND_API}/users/`
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(credentials),
			cache: 'no-store',
		})
		const data = await response.json()

		return data
	} catch (error) {
		console.log(error)
	}
}
