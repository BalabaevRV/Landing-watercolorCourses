"use strict";

let formInputPhone = document.getElementById("formInputPhone");
let spanMask = document.getElementById("spanMask");

let phonePattern = "+ 7 (___) ___-__-__";  
let regSample = /^\+{0,1}[\s-]{0,1}[78]{0,1}[\s-]{0,1}[(]{0,1}\d{3}[)]{0,1}[\s-]{0,1}\d{3}[\s-]{0,1}\d{2}[\s-]{0,1}\d{2}$/;

formInputPhone.addEventListener("blur", blurValidationPhone);
formInputPhone.addEventListener("input", inputValidationPhone);
formInputPhone.addEventListener("keydown", keydownOnInputPhone);
formInputPhone.addEventListener("focus", focusOnInputPhone);
formInputPhone.addEventListener("mouseup", () => {
	if (event.target.selectionStart < 5 && event.target.selectionStart === event.target.selectionEnd) {
		setPositionInputPhone(event.target);
	};});

function inputValidationPhone () {
	if (regSample.test(formInputPhone.value)) {
		insertCorrectPhone ();
	} else {
		showErrorInputPhone ();
		formInputPhone.value = phonePattern;
	}
}

function insertCorrectPhone () {
	let currentPhone = formInputPhone.value;
	let currentPhoneIndex = currentPhone.length-1;
	let newCurrentPhone = "";
	while (newCurrentPhone.length<2) {
		addSymbolToCurrentPhone ();
	}
	newCurrentPhone = "-" + newCurrentPhone;
	while (newCurrentPhone.length<5) {
		addSymbolToCurrentPhone ();
	}
	newCurrentPhone = "-" + newCurrentPhone;
	while (newCurrentPhone.length<9) {
		addSymbolToCurrentPhone ();
	}
	newCurrentPhone = ") " + newCurrentPhone;
	while (newCurrentPhone.length<14) {
		addSymbolToCurrentPhone ();
	}
	newCurrentPhone = "+7 (" + newCurrentPhone;
	
	function addSymbolToCurrentPhone () {
		let currentSymbol = "_";
		while ((isNaN(currentSymbol) || currentSymbol == " ") && currentPhoneIndex>=0) {
			currentSymbol = currentPhone[currentPhoneIndex--];	
		}
		newCurrentPhone = currentSymbol + newCurrentPhone; 
	}	

	formInputPhone.value = newCurrentPhone; 
} 

function showErrorInputPhone () {
	let errorParagraph = formInputPhone.previousElementSibling;	
	formInputPhone.classList.add ("form__input--error");
	errorParagraph.style.display = "block";
}

function removeErrorInputPhone() {
	let errorParagraph = formInputPhone.previousElementSibling;	
	formInputPhone.classList.remove ("form__input--error");
	errorParagraph.style.display = "none";
}
function blurValidationPhone () {
	if (formInputPhone.value.indexOf("_")>-1 || !regSample.test(formInputPhone.value)) {
		showErrorInputPhone ();
	} else {
		removeErrorInputPhone ();	
	};
}

function keydownOnInputPhone (event) {
	let numCurrentChar = formInputPhone.selectionStart;
	let currentValue = formInputPhone.value;
	let key = event.key;
	if (key >= "0" && key <= "9") {
		if (numCurrentChar>18) {
			event.preventDefault();
			return;	
		}
		let nextElement;
		event.preventDefault();
		nextElement = currentValue.charAt(numCurrentChar);
		while (nextElement != "_" && (isNaN(nextElement) || nextElement == " ")) {
			nextElement = currentValue.charAt(++numCurrentChar);
			if (numCurrentChar>19) {
				return;
			}
		}	
		formInputPhone.value = currentValue.substring(0, numCurrentChar) + key +  currentValue.substring(numCurrentChar+1);	
		setPositionInputPhone(formInputPhone, ++numCurrentChar);
	} 
	if (event.key == "Backspace") {
		event.preventDefault();
		let currentChar;
		do {
			currentChar = currentValue.charAt(--numCurrentChar);
			if (numCurrentChar<4) {
				return;
			};
		} while ((isNaN(currentChar) || currentChar == " ") && currentChar != "_");
		formInputPhone.value = currentValue.substring(0, numCurrentChar) + "_" +  currentValue.substring(numCurrentChar+1);	
		setPositionInputPhone(formInputPhone, numCurrentChar);
		}

	if (event.key == "ArrowLeft") {
		event.preventDefault();
		setPositionInputPhone(formInputPhone, --numCurrentChar);
	};	

	if (event.key == "ArrowRight") {
		event.preventDefault();
		setPositionInputPhone(formInputPhone, ++numCurrentChar);
	};	
}

function focusOnInputPhone (event) {
	event.preventDefault();
	if (formInputPhone.value === "") {
		formInputPhone.value = phonePattern;
	}
	setPositionInputPhone(event.target);
}

function setPositionInputPhone (inputField, indexPosition = 5) {
	inputField.setSelectionRange(indexPosition, indexPosition);	
}
 
