function initiateLogin() {
	fetch("login.html")
		.then((response) => response.text())
		.then((data) => {
			document.getElementById("body").innerHTML = data;
		});
}

function login() {
	const form = document.getElementById("loginForm");
	const password = form.elements["password"].value;
	let _requestOptions = {
		method: "POST",
		mode: "cors",
		headers: {
			"Content-Type": "application/json",
		},
		redirect: "follow",
		body: JSON.stringify({
			password: password,
		}),
	};
	fetch(apiLink + "login", _requestOptions)
		.then((response) => response.json())
		.then((data) => {
			activeToken = data.token;
		});
	form.reset();
}
