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
const PersonalSites = [
	new siteListItem(
		"Ghost House",
		"A ghost house themed web game",
		"https://ghosthouse.tk/"
	),
];

const MenuSites = [
	new siteListItem(
		"Personal Projects",
		"Other websites that i've made",
		null,
		"page",
		PersonalSites,
		"blue"
	),
	new siteListItem("Test Title", "Test desc", "https://www.google.com/"),
	new siteListItem("Test Title", "Test desc", "https://www.google.com/"),
	new siteListItem("Test Title", "Test desc", "https://www.google.com/"),
	new siteListItem("Test Title", "Test desc", "https://www.google.com/"),
	new siteListItem("Test Title", "Test desc", "https://www.google.com/"),
	new siteListItem("Test Title", "Test desc", "https://www.google.com/"),
];
