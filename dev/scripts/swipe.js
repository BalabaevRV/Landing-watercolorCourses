"use strict";

let evt;
let posX1;
let posX2;
let thisList;
let currentEl;
let distance = 0;
let distanceSlider = 0;
let distanceList = 0;
let distanceCarouselPicture = 0;
let distanceTarrifs = 0;
let minDistance = 100;
let maxDistance = 0;
let isSwipe = false;
let tarriffsList = document.getElementById("tarriffsList");

teacherSliderList.addEventListener("mousedown", swipeStart);
teacherSliderList.addEventListener("touchstart", swipeStart);
teachersSlider.addEventListener("mousedown", swipeStart);
teachersSlider.addEventListener("touchstart", swipeStart);
pictureCarousel.addEventListener("mousedown", swipeStart);
pictureCarousel.addEventListener("touchstart", swipeStart);
tarriffsList.addEventListener("mousedown", swipeStart);
tarriffsList.addEventListener("touchstart", swipeStart);
tarriffsList.addEventListener("click", tarriffsListclick);

function tarriffsListclick () {
	if (isSwipe) {
		event.preventDefault();
	}
}

function getMaxDistance () {
	return teacherSliderList.offsetWidth;
}

function getEvent() {
	return (event.type.search("touch") !== -1) ? event.touches[0] : event;
  }

function swipeStart (event) {
	evt = getEvent();	
	evt.target.ondragstart = function() {
  		return false;
	};
	isSwipe = false;
	thisList = event.currentTarget;
	thisList.style.cursor = "grabbing";
 	switch (thisList) {
 		case teacherSliderList:
 			distance = distanceList; 
 			break;
 		case teachersSlider: 			
 			distance = distanceSlider;
 			break;
 		case pictureCarousel: 			
 			distance = distanceCarouselPicture; 
 			break;			
 		default:
 			distance = 0;		
 			break;
 	};

  	posX1 = evt.clientX;
  	maxDistance = getMaxDistance ();
  	document.addEventListener("touchmove", moveAt);
  	document.addEventListener("touchend", swipeEnd);
  	document.addEventListener("mousemove", moveAt);
  	document.addEventListener("mouseup", swipeEnd); 
}

function moveAt() {
	evt = getEvent();
	posX2 = evt.clientX - posX1;
  	posX1 = evt.clientX;
  	(thisList === teacherSliderList) ? setDistanceForList () : setDistance();  

	thisList.style.transform ="translateX(" + distance + "px)";
}

function setDistance () {
	distance = distance + posX2;
}

function setDistanceForList () {
  	if (Math.abs(distance + posX2) + window.innerWidth<maxDistance) {
  		distance = distance + posX2; 
  	} 
  	if (distance>0) {
  		distance = 0;	
  	}
}

function swipeEnd (event) {

	let swipeDirection = "";
	thisList.style.cursor = "";
  	document.removeEventListener("touchmove", moveAt);
    document.removeEventListener("mousemove", moveAt);
    document.removeEventListener("touchend", swipeEnd);
    document.removeEventListener("mouseup", swipeEnd); 
	if (thisList === teacherSliderList) {
		if (Math.abs(distance) > minDistance) {
			isSwipe = true;
		};	
		distanceList = distance;
	} else if (thisList === teachersSlider) {
	    if (Math.abs(distance - distanceSlider) >= minDistance) {
			swipeDirection = (distance >= distanceSlider) ? "Left" : "Right"; 
			distanceSlider = moveSlideByArrow (swipeDirection);
		};
	} else if (thisList === tarriffsList) {
		if (Math.abs(distance)>=minDistance && thisList.offsetWidth>window.innerWidth) {
			isSwipe = true;
			(distance>0) ? swipeTarrifs ("Right") : swipeTarrifs ("Left");
		} else {
			thisList.style.transform = "translateX(0px)";	
		};
	} else {
		let maxOffsetWidth = getMaxOffsetWidth();
		if (Math.abs(distance)>maxOffsetWidth) {
			distance = (distance>0) ? maxOffsetWidth : -maxOffsetWidth; 
			thisList.style.transform ="translateX(" + distance + "px)";	
		};
		distanceCarouselPicture = distance; 
	};
}    

function getMaxOffsetWidth () {
	return (thisList.offsetWidth-window.innerWidth)/2;	
}

function swipeTarrifs (swipeDirection) {
	let widthCard = getWidthCard ();
	widthCard = (swipeDirection === "Right") ? widthCard : -widthCard;
	distanceTarrifs = distanceTarrifs + widthCard; 
	distanceTarrifs = (Math.abs(distanceTarrifs)>widthCard) ? widthCard : distanceTarrifs;
	thisList.style.transform = "translateX(" + distanceTarrifs + "px)";

}

function getWidthCard () {
	return thisList.querySelector(".tarrifsList__card").offsetWidth;
}