let siteTitle = "Arkiv";
document.getElementById("Title").innerText = siteTitle + " - Meny";

function renderSites(sites, color = "gold") {
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
renderSites(MenuSites);

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
			renderSites(MenuSites);
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
