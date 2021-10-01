function formSubmit() {
	const form = document.getElementById("addItemForm");
	const title = form.elements["title"];
	const del = form.elements["delete"];
	const desc = form.elements["desc"];
	const link = form.elements["link"];
	const type = form.elements["type"];
	if (del.checked) {
		deleteItem(title.value);
	} else {
		addItem(
			new siteListItem(title.value, desc.value, link.value, type.value)
		);
	}
	form.reset();
}
