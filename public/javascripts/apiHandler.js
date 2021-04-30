//Manage the call of the axios route for sorting by filter
class APIHandler {
	constructor(baseURL) {
		this.baseURL = baseURL;
	}

	sortCategory(category, filter) {
		console.log('base url', this.baseURL);
		return axios.get(`${this.baseURL}/categories/${category}?sorting_by=${filter}`);
	}
}
