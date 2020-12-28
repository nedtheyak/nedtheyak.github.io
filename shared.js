/*
<nav class="navbar navbar-light" style="background-color:rgb(252, 251, 249)">
  <a class="navbar-brand" href="/">Home</a>
</nav>
*/
let pageList = {
	dressember: {
		text: "Dressember",
		children: {
			main: {
				text: "About",
				href: "/dressember"
			},
			team: {
				text: "Our Team",
				href: "/dressember/team"
			},
			campaign: {
				text: "Donate Now",
				href: "/dressember/kayden"
			},
		}
	},
}

function getLinkList(pages) {
	let list = document.createElement('ul');
	list.classList.add('nav', 'justify-content-right', 'pr-1');
	for (let key in pages) {
		let item = document.createElement('li');
		item.classList.add('nav-item');
		let itemLink = document.createElement('a');
		itemLink.classList.add('nav-link');
		if (pages[key]['href']) {
			itemLink.href = pages[key]['href'];
		}
		itemLink.innerHTML = pages[key]['text'];
		item.appendChild(itemLink);
		if (pages[key]['children']) {
			item.classList.add('dropdown');
			item.style.cursor = "pointer";
			itemLink.classList.add('dropdown-toggle');
			itemLink.setAttribute('data-toggle', "dropdown");
			let nestedList = document.createElement('div');
			nestedList.classList.add('dropdown-menu');
			for (let nestedKey in pages[key]['children']) {
				let nestedItem = document.createElement('a');
				nestedItem.classList.add('dropdown-item');
				nestedItem.href = pages[key]['children'][nestedKey]['href'];
				nestedItem.innerHTML = pages[key]['children'][nestedKey]['text'];
				nestedList.appendChild(nestedItem);
			}
			item.appendChild(nestedList);
		}
		list.appendChild(item);
	}
	
	return list;
}

function generateNavBar() {
	let mainEl = document.createElement('nav');
	mainEl.classList.add('navbar', 'navbar-light');
	mainEl.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
	
	let homeButton = document.createElement('a');
	homeButton.classList.add('navbar-brand');
	homeButton.href = '/';
	homeButton.innerHTML = 'Home';
	mainEl.appendChild(homeButton);
	
	let linkList = getLinkList(pageList);
	mainEl.appendChild(linkList);
	
	return mainEl;
}

function loadPage(useNavBar) {
	if (useNavBar) {
		let navBar = generateNavBar();
		document.body.insertBefore(navBar, document.body.childNodes[0]);
	}
}
