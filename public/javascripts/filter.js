//True: Price || false: Rate
const filter = () => {
    const apiHandler = new APIHandler('http://localhost:3000');
	
    const filterBtn = document.querySelector("#filter-btn");
    const category = document.querySelector("#category-name").innerText;
    let filter;
	filterBtn.addEventListener("click", () => {
		if(filterBtn.checked) filter = 'price';
        else filter = 'rating';

        apiHandler.sortCategory(category, filter);
	});
};

window.addEventListener("load", filter);
