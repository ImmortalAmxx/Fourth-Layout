$(".toggle-menu").on("click", function () {
  $(this).toggleClass("active");
  $(".nav-dropdown").toggleClass("open");
});

$(document).ready(function () {
  var screenWidth = $(window).width();
  var $siteDevContent = $(".development-content");
  var itemCount = $siteDevContent.find(".development-content-item").length;

  function initializeSlider() {
    let slidesToShow = 1;

    if (screenWidth < 600) {
      slidesToShow = 1;
    } else if (screenWidth < 860) {
      slidesToShow = 2;
    } else if (itemCount > 3) {
      slidesToShow = 3;
    }

    $siteDevContent.slick({
      slidesToShow: slidesToShow,
      arrows: false,
      dots: true,
      slidesToScroll: 1,
      infinite: true,
      initialSlide: 0,
    });
  }

  function destroySlider() {
    $(".development-content").slick("unslick");
  }

  if (screenWidth < 860 || itemCount > 3) {
    initializeSlider();
  }

  $(window).resize(function () {
    screenWidth = $(window).width();

    if (screenWidth < 860 || itemCount > 3) {
      if ($(".development-content").hasClass("slick-initialized")) {
        destroySlider();
      }
      initializeSlider();
    } else {
      if ($(".development-content").hasClass("slick-initialized")) {
        destroySlider();
      }
    }
  });
});

$(document).ready(function () {
  $(".feedback-slider").slick({
    dots: true,
    infinite: true,
    speed: 1,
    slidesToShow: 1,
    adaptiveHeight: true,
  });
});
