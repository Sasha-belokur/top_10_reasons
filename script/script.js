(function() {
  var yDown = null;
  var arrow = document.querySelector(".white-arrow");

  var throttle = (func, limit) => {
    var lastFunc;
    var lastRan;
    return function() {
      var context = this;
      var args = arguments;
      if (!lastRan) {
        func.apply(context, args);
        lastRan = Date.now();
      } else {
        clearTimeout(lastFunc);
        lastFunc = setTimeout(function() {
          if (Date.now() - lastRan >= limit) {
            func.apply(context, args);
            lastRan = Date.now();
          }
        }, limit - (Date.now() - lastRan));
      }
    };
  };

  function handleDocumentClick(evt) {
    var isNextButton = evt.target.matches(".slider__control-button--next");
    var isPrevButton = evt.target.matches(".slider__control-button--prev");

    if (isNextButton) {
      showNextSlide();
    } else if (isPrevButton) {
      showPrevSlide();
    }
  }

  function showNextSlide() {
    var currentSlide = document.querySelector(".slider__item--active");
    var nextSlide = currentSlide.nextElementSibling;

    if (!nextSlide) return;
    nextSlide.classList.add("slider__item--active");
    currentSlide.classList.add("slider__item--move-top");
    currentSlide.classList.remove("slider__item--active");

    if (!nextSlide.nextElementSibling) {
      // document.removeEventListener("click", handleDocumentClick);
      // document.removeEventListener("touchstart", handleTouchStart);
      // document.removeEventListener("touchmove", handleTouchMove);
      // document.removeEventListener("keydown", handleKeyDown);
      // document.removeEventListener("wheel", handleMouseWheel);
    }
  }

  function showPrevSlide() {
    var currentSlide = document.querySelector(".slider__item--active");
    var prevSlide = currentSlide.previousElementSibling;

    if (!prevSlide) return;
    prevSlide.classList.remove("slider__item--move-top");
    prevSlide.classList.add("slider__item--active");
    currentSlide.style.transitionDelay = "0.1s";
    currentSlide.classList.remove("slider__item--active");

    setTimeout(function() {
      currentSlide.style.transitionDelay = "";
    }, 1000);
  }

  function handleTouchStart(evt) {
    xDown = evt.touches[0].clientX;
    yDown = evt.touches[0].clientY;
  }

  function handleTouchMove(evt) {
    if (!yDown) return;
    if (evt.touches.length > 1) return;

    var yUp = evt.touches[0].clientY;

    var yDiff = yDown - yUp;

    if (yDiff > 0) {
      showNextSlide();
    } else {
      showPrevSlide();
    }

    yDown = null;
  }

  function handleKeyDown(evt) {
    if (evt.key == "ArrowUp") {
      showPrevSlide();
    } else if (evt.key == "ArrowDown") {
      showNextSlide();
    }
  }

  function handleMouseWheel(evt) {
    var direction = evt.deltaY > 0 ? "up" : "down";

    if (direction === "up") {
      showNextSlide();
    } else if (direction === "down") {
      showPrevSlide();
    }
  }

  showNextSlide = throttle(showNextSlide, 700);
  showPrevSlide = throttle(showPrevSlide, 700);

  arrow.addEventListener("click", showNextSlide);
  document.addEventListener("click", handleDocumentClick);
  document.addEventListener("touchstart", handleTouchStart);
  document.addEventListener("touchmove", handleTouchMove);
  document.addEventListener("keydown", handleKeyDown);
  document.addEventListener("wheel", handleMouseWheel);
})();
