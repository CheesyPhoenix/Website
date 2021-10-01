function debugToggle() {
	if (apiLink == debugLink) {
		apiLink = mainApiLink;
		document.getElementById("debugText").innerText = "MainAPI";
		renderMenuSites();
	} else {
		apiLink = debugLink;
		document.getElementById("debugText").innerText = "DebugAPI";
		renderMenuSites();
	}
}
