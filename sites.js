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
const ProgrammingSites = [
	new siteListItem(
		"Arkiv Side",
		"Denne siden (cheesyphoenix.tk)",
		"https://cheesyphoenix.tk"
	),
];
const TeknologiSites = [
	new siteListItem(
		"Hjemmenettverk",
		"Prosjekt om hjemmenettverk",
		"hjemmenettverk.png"
	),
];
const MedieSites = [new siteListItem("This page is currently empty", "Empty")];

const MenuSites = [
	new siteListItem(
		"Personlige Prosjekter",
		"Andre prosjekter jeg har gjort",
		null,
		"page",
		PersonalSites,
		"blue"
	),
	new siteListItem(
		"Programmering",
		"Prosjekter fra programmerings timene",
		null,
		"page",
		ProgrammingSites,
		"blue"
	),
	new siteListItem(
		"Teknologiforståelse",
		"Prosjekter fra teknologiforståelses timene",
		null,
		"page",
		TeknologiSites,
		"blue"
	),
	new siteListItem(
		"Medieproduksjon",
		"Prosjekter fra medieproduksjons timene",
		null,
		"page",
		MedieSites,
		"coral"
	),
];
