let siteTitle = "Arkiv";
document.getElementById("Title").innerText = siteTitle + " - Meny";

const pageColor = "gold";
const linkColor = "blue";
const docColor = "green";

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
async function renderSites(sites) {
	await removeItems();
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
			} else if (sites[i].type == "doc") {
				document = requestDoc(sites[i].link);
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
		if (sites[i].type == "doc") {
			textBox.style.borderColor = docColor;
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
	await removeItems();
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
				renderSites(sites[i].array);
				document.getElementById("Title").innerText =
					siteTitle + " - " + sites[i].title;
				currentPage.push(sites[i].title);
			} else if (sites[i].type == "doc") {
				requestDoc(sites[i].link);
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
		if (sites[i].type == "doc") {
			textBox.style.borderColor = docColor;
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

async function removeItems() {
	await fetch("stuff.html")
		.then((response) => response.text())
		.then((data) => {
			document.getElementById("body").innerHTML = data;
			try {
				addListener();
			} catch {}
		});
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
