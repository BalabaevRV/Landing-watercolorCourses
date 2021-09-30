"use strict";

let burgerMenu = document.getElementById("burgerMenu");
let mainNav = document.getElementById("mainNav");
let navigationList = document.getElementById("navigationList");


burgerMenu.addEventListener ("click", burgerMenuClick);
mainNav.addEventListener ("transitionend",endCloseMobile);
mainNav.addEventListener ("click", mainNavClick); 
navigationList.addEventListener("click", navigationListClick);

let closeMenu;

function mainNavClick (event) {
 if (event.target === this) {
 	closeMobileMenu();
 }
}

function navigationListClick () {
	if (event.target.nodeName === "A") {
		closeMobileMenu();
	}
}

function burgerMenuClick () {
	// burgerMenu.classList.toggle("openMenu");

	if (mainNav.classList.contains("mainNavigation__container--mobile")) {
		closeMobileMenu();
	} else {
		OpenMobileMenu();
	};
}

function closeMobileMenu () {
	mainPage.style.overflow = "auto";
	closeMenu = true;
	burgerMenu.classList.toggle("openMenu");
	mainNav.style.backgroundColor = "rgba(0, 0, 0, 0)";
	navigationList.style.right = "-100%";
}

function OpenMobileMenu() {
	mainPage.style.overflow = "hidden";
	burgerMenu.classList.toggle("openMenu");
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
