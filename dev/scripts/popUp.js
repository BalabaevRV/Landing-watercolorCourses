"use strict";

const teachersWork = document.getElementById("teachersWork");
const popUp = document.getElementById("popUp");
const popUpWindow = document.getElementById("popUpWindow");
const closePopUpIcon = document.getElementById("closePopUpIcon");
const closePopUpButton = document.getElementById("closePopUpButton");
const buttonCapture = document.getElementById("buttonCapture");
const linkPrivacyPolicy = document.getElementById("linkPrivacyPolicy");
const mainPage = document.getElementById("mainPage");
let close;

teachersWork.addEventListener("click", openPopUp);
linkPrivacyPolicy.addEventListener("click", openPopUp);
buttonCapture.addEventListener("click", buttonCaptureClick);
closePopUpIcon.addEventListener("click", closePopUp);
closePopUpButton.addEventListener("click", closePopUp);
popUp.addEventListener("click", popUpClick);
popUp.addEventListener("transitionend", endClosePopUp);
moreWorkButton.addEventListener("click", openPopUp);

function buttonCaptureClick (event) {
	event.preventDefault();
	if (typeof validationForm == "function") {
		if (validationForm()) {
			openPopUp(event);
		};
	} else {
		openPopUp(event);	
	}
}

function popUpClick (event) {
 if (event.target === this) {
 	closePopUp();
 }
}

function openPopUp (event) {
	event.preventDefault();
	mainPage.style.overflow = "hidden";
	close = false;
	let textPopUp = getText(event.currentTarget);
	popUp.querySelector(".popUp__paragraph").innerHTML = textPopUp;
	popUp.style.display = "block";
	setTimeout(() => {
		popUp.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
		popUpWindow.style.right ="0";
	}, 20);
}

function closePopUp () {
	mainPage.style.overflow = "auto";
	popUp.style.backgroundColor = "rgba(0, 0, 0, 0)";
	popUpWindow.style.right ="-200%";
	close = true;
}

function endClosePopUp () {
	if (close) {
		popUp.style.display = "none";	
		popUp.querySelector(".popUp__paragraph").innerHTML = "";
	}
}

function getText(button) {
	if (button === buttonCapture) {
		return "Cпасибо за заявку! Скоро с вами свяжется специалист";	
	} else {
		return "Данный раздел еще не готов";
	}
}