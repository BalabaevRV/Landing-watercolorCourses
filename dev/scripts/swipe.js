"use strict";

let evt;
let posX1;
let posX2;
let thisList;
let currentEl;
let distance = 0;
let distanceSlider = 0;
let distanceList = 0;
let minDistance = 50;
let maxDistance = 0;
let isSwipe = false;


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

	thisList = event.currentTarget;
	thisList.style.cursor = "grabbing";

	distance = (thisList === teacherSliderList) ? distanceList : distanceSlider;   
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
  	(thisList === teacherSliderList) ? setDistanceForList () : setDistanceForSlider ();
	thisList.style.transform ="translateX(" + distance + "px)";
}

function setDistanceForSlider () {
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
			distanceList = distance;
		} else {
			isSwipe = false;
		}	
	} else {
	    if (Math.abs(distance - distanceSlider) >= minDistance) {
			console.log("distanceSlider 2:" + distanceSlider);
			swipeDirection = (distance >= distanceSlider) ? "Left" : "Right"; 
			distanceSlider = moveSlideByArrow (swipeDirection);
		};
	};
}    
