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

function swipeStart (event) {
	console.log("distanceCarouselPicture swipe start:" + distanceCarouselPicture);
	evt = getEvent();	
	evt.target.ondragstart = function() {
  		return false;
	};
	isSwipe = false;
	thisList = event.currentTarget;
	thisList.style.cursor = "grabbing";
	setCurrentDistance();
  	posX1 = evt.clientX;
  	document.addEventListener("touchmove", moveAt);
  	document.addEventListener("touchend", swipeEnd);
  	document.addEventListener("mousemove", moveAt);
  	document.addEventListener("mouseup", swipeEnd); 
}

function setCurrentDistance () {
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
 		case tarriffsList: 			
 			distance = distanceTarrifs; 
 			maxDistance = getMaxDistance ();
 			break;				
 		default:
 			distance = 0;		
 			break;
 	};
}


function getMaxDistance () {
	return thisList.offsetWidth;
}

function getMaxOffsetPictureCarousel () {
	return (thisList.offsetWidth-window.innerWidth)/2;	
}

function getEvent() {
	return (event.type.search("touch") !== -1) ? event.touches[0] : event;
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
	thisList.style.cursor = "";
  	document.removeEventListener("touchmove", moveAt);
    document.removeEventListener("mousemove", moveAt);
    document.removeEventListener("touchend", swipeEnd);
    document.removeEventListener("mouseup", swipeEnd); 

	if (thisList === teacherSliderList) {
		swipeEndTeacherSliderList ();
	} else if (thisList === teachersSlider) {
		swipeEndTeachersSlider ();	  
	} else if (thisList === tarriffsList) {
		swipeEndTarriffsList ();		
	} else {
		swipeEndPictureCarousel ();
	};
}    

function swipeEndTeacherSliderList () {
	if (Math.abs(distance) > minDistance) {
		isSwipe = true;
	};	
	distanceList = distance;
}

function swipeEndTeachersSlider () {
	if (Math.abs(distance - distanceSlider) >= minDistance) {
		let	swipeDirection = (distance >= distanceSlider) ? "Left" : "Right"; 
		distanceSlider = moveSlideByArrow (swipeDirection);
	} else {
		thisList.style.transform ="translateX(" + distanceSlider + "px)";			
	};
}

function swipeEndTarriffsList () {
	if (Math.abs(distance)>=minDistance && thisList.offsetWidth>window.innerWidth) {
		isSwipe = true;
		(distance>distanceTarrifs) ? swipeTarrifs ("Left") : swipeTarrifs ("Right");
	} else {
		thisList.style.transform = "translateX(" + distanceTarrifs + "px)";	
	};
}

function swipeEndPictureCarousel () {
	let maxOffsetWidth = getMaxOffsetPictureCarousel ();
	if (Math.abs(distance)>maxOffsetWidth) {
		distance = (distance>0) ? maxOffsetWidth : -maxOffsetWidth; 
		thisList.style.transform ="translateX(" + distance + "px)";	
	};
	distanceCarouselPicture = distance; 
	switchArrowsPictureCarousel (distanceCarouselPicture);
}


function swipeTarrifs (swipeDirection) {
	let widthCard = getWidthCard ();
	widthCard = (swipeDirection === "Right") ? -widthCard : widthCard;
	distanceTarrifs = distanceTarrifs + widthCard; 
	distanceTarrifs = (Math.abs(distanceTarrifs)>Math.abs(widthCard)) ? widthCard : distanceTarrifs;
	thisList.style.transform = "translateX(" + distanceTarrifs + "px)";

}

function getWidthCard () {
	return thisList.querySelector(".tarrifsList__card").offsetWidth;
}

function tarriffsListclick () {
	if (isSwipe) {
		event.preventDefault();
	}
}