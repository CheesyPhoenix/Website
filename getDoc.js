async function requestDoc(link) {
	let requestOptions = {
		method: "GET",
		mode: "cors",
		headers: {
			"Content-Type": "application/json",
		},
		redirect: "follow",
	};
	await fetch("https://192.168.38.118:8080/document/" + link, requestOptions)
		.then((response) => response.text())
		.then((data) => {
			document.getElementById("body").innerHTML = data;
		});
}
