async function back() {
	await fetch(apiLink + "tshirt")
		.then((response) => response.json())
		.then((data) => {
			currentPage.pop();
			renderSites(find(data));
		});
}
