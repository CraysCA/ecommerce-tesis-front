export const fetchCreateInvoice = async body => {
	try {
		const url = `${import.meta.env.VITE_BACKEND_API}/invoices/`
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
			cache: 'no-store',
		})
		const data = await response.json()

		return data
	} catch (error) {
		console.log(error)
	}
}
