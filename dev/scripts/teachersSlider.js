"use strict";

let teachersLeftButton = document.getElementById("teachersLeftButton");
let teachersRightButton = document.getElementById("teachersRightButton");
let slideIndex = 0;
let teacherSliderList = document.getElementById("teacherSliderList");
let numSliders = teachersSlider.querySelectorAll("li").length-1;

teachersLeftButton.addEventListener("click", teachersArrowClick);
teachersRightButton.addEventListener("click", teachersArrowClick);
teacherSliderList.addEventListener("click", teacherSliderListClick);

function teacherSliderListClick (event) {
	let OffsetWidth;
	if (event.target.tagName === "IMG") {
		slideIndex = getNewSlideIndex (event.target);
		OffsetWidth = getOffsetWidth (slideIndex);
		moveSlide(OffsetWidth);
		toggleArrows (slideIndex);
	};
}

function getOffsetWidth (index) {
	return teachersSlider.offsetWidth * index; 
} 

function getNewSlideIndex (newSlide) {
	let allitemList = teacherSliderList.querySelectorAll(".teacherSlider__img");
	for (let index = 0; index < allitemList.length; ++index) {
    	if (allitemList[index] === newSlide) {
    		return index;
    	}
	}
}

function teachersArrowClick (event) {
	if (!event.currentTarget.classList.contains("arrow--disabled")) {
		if (event.currentTarget == teachersLeftButton) {
			moveSlideByArrow("Left");
		} else if (event.currentTarget == teachersRightButton) {
			moveSlideByArrow("Right");
		}	
	}	
}

function moveSlideByArrow (moveDirection = "Right") {
	let teachersSlider = document.getElementById("teachersSlider");
	let offsetWidth; 
	if (moveDirection === "Right") {
		slideIndex++;
	}  else if (moveDirection === "Left") {		
		slideIndex--;
	}
	offsetWidth = getOffsetWidth(slideIndex);  
	moveSlide (offsetWidth);
	toggleArrows (slideIndex);
}

function moveSlide (offsetWidth) {
	teachersSlider.style.transform = `translateX(-${offsetWidth}px)`;
}

function toggleArrows (slideIndex) {
	if (slideIndex === 0) {
		teachersLeftButton.classList.add("arrow--disabled");	
	} else {
		teachersLeftButton.classList.remove("arrow--disabled");			
	}

	if (slideIndex === numSliders) {
		teachersRightButton.classList.add("arrow--disabled");	
	} else {
		teachersRightButton.classList.remove("arrow--disabled");			
	}
} 

