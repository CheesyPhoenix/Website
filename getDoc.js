async function requestDoc(link) {
	let requestOptions = {
		method: "GET",
		mode: "cors",
		headers: {
			"Content-Type": "application/json",
		},
		redirect: "follow",
	};
	await fetch(apiLink + "document/" + link, requestOptions)
		.then((response) => response.text())
		.then((data) => {
			document.getElementById("body").innerHTML = data;
			eval(document.getElementById("runthis").innerText);
		});
}
