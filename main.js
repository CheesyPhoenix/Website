class siteListItem {
	constructor(title, desc, link) {
		this.title = title;
		this.desc = desc;
		this.link = link;
	}
}

const sites = [
	new siteListItem("Test Title", "Test desc", "https://www.google.com/"),
	new siteListItem("Test Title", "Test desc", "https://www.google.com/"),
	new siteListItem("Test Title", "Test desc", "https://www.google.com/"),
	new siteListItem("Test Title", "Test desc", "https://www.google.com/"),
	new siteListItem("Test Title", "Test desc", "https://www.google.com/"),
	new siteListItem("Test Title", "Test desc", "https://www.google.com/"),
	new siteListItem("Test Title", "Test desc", "https://www.google.com/"),
	new siteListItem("Test Title", "Test desc", "https://www.google.com/"),
];

for (let i = 0; i < sites.length; i++) {
	let textBox = document.createElement("div");
	textBox.className = "TextBox";
	textBox.onclick = function () {
		location.href = sites[i].link;
	};

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

class navItem {
	constructor(title, link) {
		this.title = title;
		this.link = link;
	}
}

const navItems = [
	new navItem("TestNav", "https://www.google.com/"),
	new navItem("TestNav", "https://www.google.com/"),
	new navItem("TestNav", "https://www.google.com/"),
	new navItem("TestNav", "https://www.google.com/"),
];

for (let i = 0; i < navItems.length; i++) {
	let titleLink = document.createElement("a");
	titleLink.href = navItems[i].link;

	let title = document.createElement("h2");
	title.className = "NavItem";

	let titleText = document.createTextNode(navItems[i].title);

	title.appendChild(titleText);
	titleLink.appendChild(title);

	let itemsContainer = document.getElementById("NavBar");
	itemsContainer.appendChild(titleLink);
}
