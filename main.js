let siteTitle = "Arkiv";
document.getElementById("Title").innerText = siteTitle + " - Meny";

let currentPage = [];

const pageColor = "gold";
const linkColor = "blue";

class siteListItem {
	constructor(
		title,
		desc,
		link = "",
		type = "link",
		array = [],
		color = "gold"
	) {
		this.title = title;
		this.desc = desc;
		this.type = type;
		this.link = link;
		this.array = array;
		this.color = color;
	}
}
function renderSites(sites) {
	for (let i = 0; i < sites.length; i++) {
		let textBox = document.createElement("div");
		textBox.className = "TextBox";
		textBox.onclick = function () {
			if (sites[i].type == "link") {
				window.open(sites[i].link, "_blank");
			} else if (sites[i].type == "page") {
				removeItems();
				renderSites(sites[i].array);
				document.getElementById("Title").innerText =
					siteTitle + " - " + sites[i].title;
				currentPage.push(sites[i].title);
			} else {
				console.log("ya messed up");
			}
		};
		if (sites[i].type == "link") {
			textBox.style.borderColor = linkColor;
		}
		if (sites[i].type == "page") {
			textBox.style.borderColor = pageColor;
		}

		let title = document.createElement("h2");
		title.className = "TextTitle";
		let titleText = document.createTextNode(sites[i].title);
		title.appendChild(titleText);

		let desc = document.createElement("p");
		desc.className = "Text";
		let descText = document.createTextNode(sites[i].desc);
		desc.appendChild(descText);

		textBox.appendChild(title);
		textBox.appendChild(desc);

		let itemsContainer = document.getElementById("items");
		itemsContainer.appendChild(textBox);
	}
}

async function renderMenuSites() {
	removeItems();
	currentPage = [];
	let sites;
	let requestOptions = {
		method: "GET",
		mode: "cors",
		headers: {
			"Content-Type": "application/json",
		},
		redirect: "follow",
	};
	await fetch("http://localhost:8080/tshirt", requestOptions)
		.then((response) => response.json())
		.then((data) => {
			//data[0].array[0].link = "https://google.com";
			sites = data;
		});
	for (let i = 0; i < sites.length; i++) {
		let textBox = document.createElement("div");
		textBox.className = "TextBox";
		textBox.onclick = function () {
			if (sites[i].type == "link") {
				window.open(sites[i].link, "_blank");
			} else if (sites[i].type == "page") {
				removeItems();
				renderSites(sites[i].array);
				document.getElementById("Title").innerText =
					siteTitle + " - " + sites[i].title;
				currentPage.push(sites[i].title);
			} else {
				console.log("ya messed up");
			}
		};
		if (sites[i].type == "link") {
			textBox.style.borderColor = linkColor;
		}
		if (sites[i].type == "page") {
			textBox.style.borderColor = pageColor;
		}

		let title = document.createElement("h2");
		title.className = "TextTitle";
		let titleText = document.createTextNode(sites[i].title);
		title.appendChild(titleText);

		let desc = document.createElement("p");
		desc.className = "Text";
		let descText = document.createTextNode(sites[i].desc);
		desc.appendChild(descText);

		textBox.appendChild(title);
		textBox.appendChild(desc);

		let itemsContainer = document.getElementById("items");
		itemsContainer.appendChild(textBox);
	}
}
function temp(array, x = 0) {
	if (x == currentPage.length) {
		return array;
	}
	for (let i = 0; i < array.length; i++) {
		if (array[i].title == currentPage[x]) {
			return temp(array[i].array, x + 1);
		}
	}
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
				temp(data).push(item);
			}

			let _requestOptions = {
				method: "POST",
				mode: "cors",
				headers: {
					"Content-Type": "application/json",
				},
				redirect: "follow",
				body: JSON.stringify(data),
			};
			fetch("http://localhost:8080/tshirt", _requestOptions);
			renderMenuSites();
		});
}
/*addItem(
	new siteListItem("Hello", "world", "", "page", [
		new siteListItem("Hello", "world"),
		"blue",
	])
);*/

function removeItems() {
	let items = document.querySelectorAll(".TextBox");
	for (let i = 0; i < items.length; i++) {
		document.getElementById("items").removeChild(items[i]);
	}
}

class navItem {
	constructor(title, link) {
		this.title = title;
		this.link = link;
	}
}

const navItems = [
	new navItem("Meny", ""),
	new navItem("GitHub", "https://github.com/CheesyPhoenix"),
];

for (let i = 0; i < navItems.length; i++) {
	let titleLink = document.createElement("a");
	titleLink.href = navItems[i].link;
	titleLink.target = "_blank";
	if (navItems[i].title == "Meny") {
		titleLink.onclick = () => {
			removeItems();
			renderMenuSites();
			document.getElementById("Title").innerText =
				siteTitle + " - " + navItems[i].title;
			currentPage = [];
		};
		titleLink.href = "javascript:;";
		titleLink.target = "";
	}

	let title = document.createElement("h2");
	title.className = "NavItem";

	let titleText = document.createTextNode(navItems[i].title);

	title.appendChild(titleText);
	titleLink.appendChild(title);

	let itemsContainer = document.getElementById("NavBar");
	itemsContainer.appendChild(titleLink);
}

renderMenuSites();

const form = document.getElementById("addItemForm");

form.addEventListener("submit", (event) => {
	event.preventDefault();
	const title = form.elements["title"];
	const desc = form.elements["desc"];
	const link = form.elements["link"];
	const type = form.elements["type"];

	addItem(new siteListItem(title.value, desc.value, link.value, type.value));

	form.reset();
});
