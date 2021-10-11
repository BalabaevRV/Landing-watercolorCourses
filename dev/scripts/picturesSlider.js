const picturesLeftButton = document.getElementById("picturesLeftButton");
const picturesRightButton = document.getElementById("picturesRightButton");
const pictureCarousel = document.getElementById("pictureCarousel");
let offsetWidthCarousel = 0;
const widthPic = document.querySelector(".pictureCarousel__item").offsetWidth;
const maxOffsetWidthCarousel = (pictureCarousel.offsetWidth-window.innerWidth)/2; 

picturesLeftButton.addEventListener("click", picturesArrowClick);
picturesRightButton.addEventListener("click", picturesArrowClick);

function picturesArrowClick () {
	if (!event.currentTarget.classList.contains("arrow--disabled")) {
		if (event.currentTarget === picturesLeftButton) {
			movePictureByArrow("Left");
		} else if (event.currentTarget === picturesRightButton) {
			movePictureByArrow("Right");
		};	
	};	
}

function movePictureByArrow (moveDirection = "Right") {
	if (moveDirection === "Right") {
		distanceCarouselPicture = distanceCarouselPicture - widthPic;
		if (Math.abs(distanceCarouselPicture)>maxOffsetWidthCarousel) {
			distanceCarouselPicture = -maxOffsetWidthCarousel;	
		}
	}  else if (moveDirection === "Left") {		
		distanceCarouselPicture = distanceCarouselPicture + widthPic;
		if (distanceCarouselPicture>maxOffsetWidthCarousel) {
			distanceCarouselPicture = maxOffsetWidthCarousel;	
		}
	}
	movePictures (distanceCarouselPicture);
	switchArrowsPictureCarousel (distanceCarouselPicture);
}

function switchArrowsPictureCarousel (distance) {
	if (Math.abs(distance)>=maxOffsetWidthCarousel) {
		(distance>0) ? picturesLeftButton.classList.add("arrow--disabled") : picturesRightButton.classList.add("arrow--disabled");  
	} else {
		picturesLeftButton.classList.remove("arrow--disabled");
		picturesRightButton.classList.remove("arrow--disabled");	
	}; 

}

function movePictures (offsetWidth) {
	pictureCarousel.style.transform = `translateX(${offsetWidth}px)`;
}