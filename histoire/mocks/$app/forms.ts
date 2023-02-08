export function enhance() {
	console.log('is this imported')
	return {
		destroy() {
			console.log('destroyed')
		}
	}
}
