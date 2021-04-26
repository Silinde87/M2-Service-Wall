const mapbox = () => {
	const mapElement = document.querySelector("#map");
	const location = mapElement.dataset.location.split(",").reverse();

	mapboxgl.accessToken =
		"pk.eyJ1Ijoic2lsaW5kZTg3IiwiYSI6ImNrbnc4MnYxZDBkdW4yb3RndWFrb3ByengifQ.3sbtlgTOx_O-KQVbvwKxow";
	var map = new mapboxgl.Map({
		container: "map",
		style: "mapbox://styles/mapbox/streets-v11",
		center: location,
		zoom: 8,
	});
	var marker1 = new mapboxgl.Marker().setLngLat(location).addTo(map);
};

window.addEventListener("load", mapbox);
