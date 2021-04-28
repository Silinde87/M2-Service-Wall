const geocoder = () => {
	mapboxgl.accessToken =
		"pk.eyJ1Ijoic2lsaW5kZTg3IiwiYSI6ImNrbnc4MnYxZDBkdW4yb3RndWFrb3ByengifQ.3sbtlgTOx_O-KQVbvwKxow";

	let geocoder = new MapboxGeocoder({
		accessToken: mapboxgl.accessToken,
		mapboxgl: mapboxgl,
	});
	geocoder.addTo("#geocoder");
	let coordinates;

	// Get the location-input element.
	let locationInput = document.getElementById("location-input");

	// Add geocoder result to location element's input.
	geocoder.on("result", function (e) {
		coordinates = e.result.geometry.coordinates;
		locationInput.value = coordinates;
	});

	// Clear reasult coordinates and location element's input when search is cleared.
	geocoder.on("clear", function () {
		coordinates = undefined;
		locationInput.value = "";
	});
};
window.addEventListener("load", geocoder);
