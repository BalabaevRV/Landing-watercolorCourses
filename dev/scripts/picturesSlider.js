let picturesLeftButton = document.getElementById("picturesLeftButton");
let picturesRightButton = document.getElementById("picturesRightButton");
let pictureCarousel = document.getElementById("pictureCarousel");
let offsetWidthCarousel = 0;
let widthPic = document.querySelector(".pictureCarousel__item").offsetWidth;
let maxOffsetWidthCarousel = (pictureCarousel.offsetWidth-window.innerWidth)/2; 

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
		offsetWidthCarousel = offsetWidthCarousel + widthPic;
		if (offsetWidthCarousel>maxOffsetWidthCarousel) {
			offsetWidthCarousel = maxOffsetWidthCarousel;	
		}
	}  else if (moveDirection === "Left") {		
		offsetWidthCarousel = offsetWidthCarousel - widthPic;
		if (Math.abs(offsetWidthCarousel)>maxOffsetWidthCarousel) {
			offsetWidthCarousel = -maxOffsetWidthCarousel;	
		}
	}
	movePictures (offsetWidthCarousel);
}

function movePictures (offsetWidth) {
	// pictureCarousel.style.transform = `translateX(1500px)`;
	pictureCarousel.style.transform = `translateX(${-offsetWidth}px)`;
}