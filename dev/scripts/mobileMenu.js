"use strict";

let burgerMenu = document.getElementById("burgerMenu");
let mainNav = document.getElementById("mainNav");
let navigationList = document.getElementById("navigationList");

burgerMenu.addEventListener ("click", burgerMenuClick);
closeButton.addEventListener ("transitionend",endCloseMobile);

let closeMenu;

function burgerMenuClick () {
	burgerMenu.classList.toggle("openMenu");

	if (mainNav.classList.contains("mainNavigation__container--mobile")) {
		closeMobileMenu();
	} else {
		OpenMobileMenu();
	};
}

function closeMobileMenu () {
	closeMenu = true;
	mainNav.style.backgroundColor = "rgba(0, 0, 0, 0)";
	navigationList.style.right = "-100%";
}

function OpenMobileMenu() {
	toggleMenu ();
	mainNav.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
	setTimeout(() => navigationList.style.right = "0", 10);
} 

function endCloseMobile () {
	if (closeMenu) {
		toggleMenu ();
	};
}

function toggleMenu () {
	closeMenu = false;	
	mainNav.classList.toggle("mainNavigation__container--mobile");
	navigationList.classList.toggle("navigationList--mobile");
}
