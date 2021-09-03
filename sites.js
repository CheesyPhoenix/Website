class siteListItem {
	constructor(title, desc, link = "", type = "link", array = []) {
		this.title = title;
		this.desc = desc;
		this.type = type;
		this.link = link;
		this.array = array;
	}
}
const TestSites = [
	new siteListItem(
		"Ghost House",
		"A ghost house themed web game",
		"https://ghosthouse.tk/"
	),
	new siteListItem("Test Title", "Test desc", "https://www.google.com/"),
	new siteListItem("Test Title", "Test desc", "https://www.google.com/"),
	new siteListItem("Test Title", "Test desc", "https://www.google.com/"),
];

const MenuSites = [
	new siteListItem(
		"Ghost House",
		"A ghost house themed web game",
		"https://ghosthouse.tk/"
	),
	new siteListItem("Test Sub Page", "Test desc", null, "page", TestSites),
	new siteListItem("Test Title", "Test desc", "https://www.google.com/"),
	new siteListItem("Test Title", "Test desc", "https://www.google.com/"),
	new siteListItem("Test Title", "Test desc", "https://www.google.com/"),
	new siteListItem("Test Title", "Test desc", "https://www.google.com/"),
	new siteListItem("Test Title", "Test desc", "https://www.google.com/"),
	new siteListItem("Test Title", "Test desc", "https://www.google.com/"),
];
