//Renders categories view with sort filter applied. By price or auto.
const filter = () => {
	const apiHandler = new APIHandler("http://localhost:3000");

	if (document.querySelector("#category-name") || document.querySelector("#filter-btn")) {
		const category = document.querySelector("#category-name").innerText;
		const filterBtn = document.querySelector("#filter-btn");
		let filter;
		filterBtn.addEventListener("click", () => {
			if (filterBtn.checked) filter = "price";
			else filter = "auto";

			apiHandler.sortCategory(category, filter).then((res) => {
				document.querySelector("#services-container").innerHTML = "";
				res.data.forEach((service) => {
					document.querySelector("#services-container").innerHTML += `
                        <a href="/service/${service._id}">
                            <div class="card service-box">
                                <img class="card-image-service" src="${service.image}" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <div class="card-top">
                                        <img class="user-avatar" src="${service.user_id.image}" alt="user-avatar">
                                        <h5 class="card-username">${service.user_id.username}</h5>
                                    </div>
                                    <p class="card-text">${service.description}</p>
                                    <div class="card-bottom">
                                        <div class="rate-box">
                                            <img class="card-star"
                                                src="https://res.cloudinary.com/dkevcmz3i/image/upload/v1619263462/Service-Wall/star_vnwttt.svg"
                                                alt="star">
                                            <p class="rate-text">${service.user_id.rate} <span>(${service.user_id.reviews.length})</span></p>
                                        </div>
                                        <p class="card-price"><span>€ </span>${service.price}</p>
                                    </div>
                                </div>
                            </div>
                        </a>
                        `;
				});
			});
		});
	}
};

window.addEventListener("load", filter);
