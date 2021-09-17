let currentPage = [];

function find(array, x = 0) {
	if (x == currentPage.length) {
		return array;
	}
	for (let i = 0; i < array.length; i++) {
		if (array[i].title == currentPage[x]) {
			return find(array[i].array, x + 1);
		}
	}
}

function deleteItem(title) {
	let requestOptions = {
		method: "GET",
		mode: "cors",
		headers: {
			"Content-Type": "application/json",
		},
		redirect: "follow",
	};
	fetch("http://localhost:8080/tshirt", requestOptions)
		.then((response) => response.json())
		.then((data) => {
			const page = find(data);

			page.splice(
				page.indexOf(
					page.filter((item) => {
						if (item.title == title) {
							return true;
						}
						return false;
					})[0]
				),
				1
			);
			let _requestOptions = {
				method: "POST",
				mode: "cors",
				headers: {
					"Content-Type": "application/json",
				},
				redirect: "follow",
				body: JSON.stringify({
					data: JSON.stringify(data),
					password: "bananacode2043",
				}),
			};
			fetch("http://localhost:8080/tshirt", _requestOptions);
			renderMenuSites();
		});
}

function addItem(item, path = currentPage) {
	let requestOptions = {
		method: "GET",
		mode: "cors",
		headers: {
			"Content-Type": "application/json",
		},
		redirect: "follow",
	};
	fetch("http://localhost:8080/tshirt", requestOptions)
		.then((response) => response.json())
		.then((data) => {
			if (path.length == 0) {
				data.push(item);
			} else {
				find(data).push(item);
			}

			let _requestOptions = {
				method: "POST",
				mode: "cors",
				headers: {
					"Content-Type": "application/json",
				},
				redirect: "follow",
				body: JSON.stringify({
					data: JSON.stringify(data),
					password: "bananacode2043",
				}),
			};
			fetch("http://localhost:8080/tshirt", _requestOptions);
			renderMenuSites();
		});
}
