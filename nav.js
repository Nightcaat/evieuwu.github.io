function navclick() {
	const navbar = document.getElementsByClassName("nav")[0];
	const children = navbar.children;
	for (var i = 0; i < children.length; i++) {
		const elem = children[i];
		if (elem.id == "intro") continue;
		switch (elem.children[1].innerText) {
			case "Home":
				elem.href = "index.html";
				break;
			case "About":
				elem.href = "about.html";
				break;
			case "Projects":
				elem.href = "javascript:void(alert('In Progress'))";
				break;
			default:
				break;
		}
	}
}

navclick();