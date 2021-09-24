"use strict";

let teachersWork = document.getElementById("teachersWork");
let popUp = document.getElementById("popUp");
let closePopUpButton = document.getElementById("closePopUpButton");

teachersWork.addEventListener("click", openPopUp);
closePopUpButton.addEventListener("click", closePopUp);

function openPopUp () {
	let textPopUp = getText(this);
	popUp.querySelector(".popUp__paragraph").innerHTML = textPopUp;
	popUp.style.display = "block";
	setTimeout(() => popUp.style.backgroundColor = "rgba(0, 0, 0, 0.9)"), 20);
}

function closePopUp () {
	popUp.querySelector(".popUp__paragraph").innerHTML = "";
	popUp.style.display = "none";
}

function getText(button) {
	return "Данный раздел еще не готов";
}