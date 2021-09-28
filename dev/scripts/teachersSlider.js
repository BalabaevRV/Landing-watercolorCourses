"use strict";

let teachersLeftButton = document.getElementById("teachersLeftButton");
let teachersRightButton = document.getElementById("teachersRightButton");
let slideIndex = 0;
let teacherSliderList = document.getElementById("teacherSliderList");
let numSliders = teachersSlider.querySelectorAll("li").length-1;

teachersLeftButton.addEventListener("click", teachersArrowClick);
teachersRightButton.addEventListener("click", teachersArrowClick);
teacherSliderList.addEventListener("click", teacherSliderListClick);
teacherSliderList.addEventListener("mousedown", swipeStart);
teacherSliderList.addEventListener("touchstart", swipeStart);
teachersSlider.addEventListener("mousedown", swipeStart);
teachersSlider.addEventListener("touchstart", swipeStart);

function teacherSliderListClick (event) {
	let OffsetWidth;

	if (event.target.tagName === "IMG" || event.target.tagName === "LI" || !isSwipe) {
		slideIndex = getNewSlideIndex (event.target, event.target.tagName);
		OffsetWidth = getOffsetWidth (slideIndex);
		moveSlide(OffsetWidth);
		toggleArrows (slideIndex);
	};
}

function getOffsetWidth (index) {
	console.log(index);
	if (index >= 0) {
		return teachersSlider.offsetWidth * index; 
	} else {
		index = 0;
		return 0;
	}
} 

function getNewSlideIndex (newSlide, tag) {

	let allitemList = (tag === "IMG") ? teacherSliderList.querySelectorAll(".teacherSlider__img") : teacherSliderList.querySelectorAll(".teacherSlider__teacher");
	for (let index = 0; index < allitemList.length; ++index) {
    	if (allitemList[index] === newSlide) {
    		return index;
    	}
	}
}

function teachersArrowClick (event) {
	if (!event.currentTarget.classList.contains("arrow--disabled")) {
		if (event.currentTarget === teachersLeftButton) {
			moveSlideByArrow("Left");
		} else if (event.currentTarget === teachersRightButton) {
			moveSlideByArrow("Right");
		}	
	}	
}

function moveSlideByArrow (moveDirection = "Right") {
	let teachersSlider = document.getElementById("teachersSlider");
	let offsetWidth; 
	if (moveDirection === "Right") {
		slideIndex = (slideIndex<numSliders) ? ++slideIndex : numSliders;
	}  else if (moveDirection === "Left") {		
		slideIndex = (slideIndex>0) ? --slideIndex : 0;
	}
	offsetWidth = getOffsetWidth(slideIndex);  
	moveSlide (offsetWidth);
	toggleArrows (slideIndex);
	return -offsetWidth; 
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

