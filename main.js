let siteTitle = "Arkiv";
document.getElementById("Title").innerText = siteTitle + " - Meny";

let currentPage = "main";

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
function renderSites(sites, color) {
	for (let i = 0; i < sites.length; i++) {
		let textBox = document.createElement("div");
		textBox.className = "TextBox";
		textBox.onclick = function () {
			if (sites[i].type == "link") {
				window.open(sites[i].link, "_blank");
			} else if (sites[i].type == "page") {
				removeItems();
				renderSites(sites[i].array, sites[i].color);
				document.getElementById("Title").innerText =
					siteTitle + " - " + sites[i].title;
			} else {
				console.log("ya messed up");
			}
		};
		textBox.style.borderColor = color;

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
				renderSites(sites[i].array, sites[i].color);
				document.getElementById("Title").innerText =
					siteTitle + " - " + sites[i].title;
				currentPage = sites[i].title;
			} else {
				console.log("ya messed up");
			}
		};
		textBox.style.borderColor = "gold";

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
			if (path == "main") {
				data.push(item);
				console.log(data);
			} else {
				let actionDone = false;
				//TODO: nesting when adding pages
				for (let i = 0; i < data.length; i++) {
					if (data[i].title == path) {
						actionDone = true;
						data[i].array.push(item);
						i = data.length;
					}
					//make a recursive for loop over all items in array and their items
				}
				if (!actionDone) {
					console.error("addItem - path not found");
				}
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
