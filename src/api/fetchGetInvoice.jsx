export const fetchGetInvoice = async userId => {
	try {
		const url = `${import.meta.env.VITE_BACKEND_API}/invoices/?userId=${userId}`
		const response = await fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			cache: 'no-store',
		})
		const data = await response.json()

		return data
	} catch (error) {
		console.log(error)
	}
}
