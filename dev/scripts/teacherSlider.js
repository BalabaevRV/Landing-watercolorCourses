"use strict";

teachersLeftButton.addEventListener("click", teachersLeftClick);
teachersRightButton.addEventListener("input", teachersRightClick);

function teachersRightClick (event) {
	if (event.currentTarget == teachersLeftButton) {
		moveSlide("Left");
	} else if (event.currentTarget == teachersRightButton) {
		moveSlide("Right");
	}	
}

function moveSlide (moveDirection = "Right") {
	
}