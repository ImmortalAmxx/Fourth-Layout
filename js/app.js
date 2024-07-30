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
  
  // Initial click event for smooth scrolling and active link
  $('.menu-link').on('click', function (e) {
    var targetId = $(this).attr('href');
    if (targetId.startsWith("#")) {
      e.preventDefault();
      $('.menu-link').removeClass("active");
      $(this).addClass("active");
      var targetOffset = $(targetId).offset().top - 100;
      $('html, body').animate({ scrollTop: targetOffset }, 800, function () {
        history.pushState(null, null, targetId);
      });
    }
  });

  // Function to check which section is currently in view
  function checkActiveSection() {
    var scrollPos = $(window).scrollTop();
    $('.menu-link').each(function () {
      var currLink = $(this);
      var refElement = $(currLink.attr("href"));
      if (refElement.position().top - 110 <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
        $('.menu-link').removeClass("active");
        currLink.addClass("active");
      }
    });
  }

  // Check active section on scroll
  $(window).on('scroll', checkActiveSection);
  // Initial check when the page loads
  checkActiveSection();

  // /* Add button style for nav menu */
  // $('.menu-link').on('click', function (e) {
  //   var targetId = $(this).attr('href');
  //   if (targetId.startsWith("#")) {
  //     e.preventDefault();
  //     $('.menu-link').removeClass("active");
  //     $(this).addClass("active");
  //     var targetOffset = $(targetId).offset().top - 100;
  //     $('html, body').animate({ scrollTop: targetOffset }, 800, function () {
  //       history.pushState(null, null, targetId);
  //     });
  //   }
  // });
});

$(".feedback-slider").slick({
  slidesToShow: 1,
  arrows: false,
  dots: true,
  slidesToScroll: 1,
  infinite: true,
  initialSlide: 0,
  autoplay: true,
  autoplaySpeed: 10000,
  fade: true,
  cssEase: "linear",
});

$(".mentors-content").slick({
  slidesToShow: 1,
  arrows: false,
  dots: true,
  slidesToScroll: 1,
  infinite: true,
  initialSlide: 0,
  autoplay: true,
  autoplaySpeed: 10000
});
