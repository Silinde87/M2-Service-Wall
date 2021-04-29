// Create an instance of the Stripe object with your publishable API key
var stripe = Stripe(
	"pk_test_51IlCjcLX0QLp8nNlWlRZgnfD4ciXP3Fb5IukVPDVV4O8wNxeWRxiIZS4U99w5QGZN1pvSqu15BSoxzVUQq2DCRMr00vp6ZULtk"
);
let checkoutForm = document.getElementById("book-form");
let service_id = checkoutForm.dataset.id;

checkoutForm.addEventListener("submit", function (e) {
	fetch(`/stripe/${service_id}`, {
		method: "POST",
        headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			date: checkoutForm.elements["date"].value,
			description: checkoutForm.elements["description"].value
		})
	})
		.then(function (response) {
			return response.json();
		})
		.then(function (session) {
			return stripe.redirectToCheckout({ sessionId: session.id });
		})
		.then(function (result) {
			// If `redirectToCheckout` fails due to a browser or network.
			if (result.error) {
				alert(result.error.message);
			}
		})
		.catch(function (error) {
            document.querySelector(".needs-validation").classList.add("was-validated");
			console.error("Error:", error);
		});
    e.preventDefault();
});
