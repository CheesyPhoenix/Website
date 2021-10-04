let siteTitle = "Arkiv";
document.getElementById("Title").innerText = siteTitle + " - Meny";

const pageColor = "gold";
const linkColor = "blue";
const docColor = "green";

//random meme
async function getMeme() {
	let requestOptions = {
		method: "GET",
		mode: "cors",
		headers: {
			"Content-Type": "application/json",
		},
		redirect: "follow",
	};
	fetch("https://meme-api.herokuapp.com/gimme/Chonkers", requestOptions)
		.then((response) => response.json())
		.then((data) => {
			if (!data.nsfw && !data.spoiler) {
				document.getElementById("image").src = data.url;
			} else {
				getMeme();
			}
		});
}
setInterval(() => {
	getMeme();
}, 20 * 1000);

//
function updatePath() {
	document.getElementById("Title").innerText = siteTitle + "⠀-⠀";
	for (let i = 0; i < currentPage.length; i++) {
		document.getElementById("Title").innerText += currentPage[i] + "/";
	}
}

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
	updatePath();
	await removeItems();
	getMeme();
	let _admin = await validateSession();
	for (let i = 0; i < sites.length; i++) {
		let container = document.createElement("div");
		container.className = "TextBoxContainer";
		if (_admin) {
			let delBox = document.createElement("a");
			delBox.className = "deleteBox";
			delBox.href = "javascript:;";
			let delBoxText = document.createElement("p");
			delBoxText.className = "deleteText";
			delBoxText.appendChild(document.createTextNode("X"));
			delBox.appendChild(delBoxText);

			delBox.onclick = function () {
				deleteItem(sites[i].title);
			};

			container.appendChild(delBox);
		}
		let textBox = document.createElement("div");
		textBox.className = "TextBox";
		textBox.onclick = async function () {
			if (sites[i].type == "link") {
				window.open(sites[i].link, "_blank");
			} else if (sites[i].type == "page") {
				await removeItems();
				renderSites(sites[i].array);
				currentPage.push(sites[i].title);
				updatePath();
			} else if (sites[i].type == "doc") {
				currentPage.push(sites[i].title);
				updatePath();
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
		container.appendChild(textBox);

		let itemsContainer = document.getElementById("items");
		itemsContainer.appendChild(container);
	}
}

async function renderMenuSites() {
	updatePath();
	await removeItems();
	getMeme();
	let _admin = await validateSession();
	currentPage = [];
	updatePath();
	let sites;
	let requestOptions = {
		method: "GET",
		mode: "cors",
		headers: {
			"Content-Type": "application/json",
		},
		redirect: "follow",
	};
	await fetch(apiLink + "tshirt", requestOptions)
		.then((response) => response.json())
		.then((data) => {
			//data[0].array[0].link = "https://google.com";
			sites = data;
		});
	for (let i = 0; i < sites.length; i++) {
		let container = document.createElement("div");
		container.className = "TextBoxContainer";
		if (_admin) {
			let delBox = document.createElement("a");
			delBox.className = "deleteBox";
			delBox.href = "javascript:;";
			let delBoxText = document.createElement("p");
			delBoxText.className = "deleteText";
			delBoxText.appendChild(document.createTextNode("X"));
			delBox.appendChild(delBoxText);

			delBox.onclick = function () {
				deleteItem(sites[i].title);
			};

			container.appendChild(delBox);
		}
		let textBox = document.createElement("div");
		textBox.className = "TextBox";
		textBox.onclick = function () {
			if (sites[i].type == "link") {
				window.open(sites[i].link, "_blank");
			} else if (sites[i].type == "page") {
				renderSites(sites[i].array);
				currentPage.push(sites[i].title);
				updatePath();
			} else if (sites[i].type == "doc") {
				currentPage.push(sites[i].title);
				updatePath();
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
		container.appendChild(textBox);

		let itemsContainer = document.getElementById("items");
		itemsContainer.appendChild(container);
	}
}

async function validateSession() {
	let returnValue = false;
	await fetch(apiLink + "status/" + activeToken).then((response) => {
		if (response.status == 200) {
			returnValue = true;
		} else {
			returnValue = false;
		}
	});
	return returnValue;
}

async function removeItems() {
	await fetch("stuffAdmin.html")
		.then((response) => response.text())
		.then((data) => {
			document.getElementById("body").innerHTML = data;
		});
	if ((await validateSession()) == true) {
		await fetch("editForm.html")
			.then((response) => response.text())
			.then((data) => {
				document.getElementById("body").innerHTML += data;
			});
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
			renderMenuSites();
			currentPage = [];
			updatePath();
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

setTimeout(() => {
	if (window.location.href == "https://cheesyphoenix.tk/") {
		window.location.href = "http://cheesyphoenix.tk";
	}
}, 100);
