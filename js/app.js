$(document).ready(function () {
  $(".toggle-menu").on("click", function () {
    $(this).toggleClass("active");
    $(".nav-dropdown").toggleClass("open");
  });

  var screenWidth = $(window).width();
  var $siteDevContent = $(".development-content");
  var itemCount = $siteDevContent.find(".development-content-item").length;
  var linkClicked = false; // Змінна для контролю кліків на посилання

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
    if ($siteDevContent.hasClass("slick-initialized")) {
      $siteDevContent.slick("unslick");
    }
  }

  if (screenWidth < 860 || itemCount > 3) {
    initializeSlider();
  }

  $(window).resize(function () {
    screenWidth = $(window).width();

    if (screenWidth < 860 || itemCount > 3) {
      destroySlider();
      initializeSlider();
    } else {
      destroySlider();
    }
  });

  /* Initial click event for smooth scrolling and active link */
  $('.menu-link').on('click', function (e) {
    var targetId = $(this).attr('href');
    if (targetId && targetId.startsWith("#") && targetId.length > 1) {
      e.preventDefault();
      linkClicked = true; // Встановити змінну в true при кліку
      $('.menu-link').removeClass("active");
      $(this).addClass("active");
      var targetOffset = $(targetId).offset().top - 100;
      $('html, body').animate({ scrollTop: targetOffset }, 800, function () {
        history.replaceState(null, null, targetId);
        setTimeout(function () {
          linkClicked = false; // Повернути змінну в false після завершення анімації
        }, 1000);
      });
    }
  });

  /* Function to check which section is currently in view */
  function checkActiveSection() {
    if (linkClicked) return; // Перевірка, чи було клікано на посилання

    var windowHeight = $(window).height();
    var scrollTop = $(window).scrollTop();
    var scrollBottom = scrollTop + windowHeight;

    var newActiveLink = null;

    $('.menu-link').each(function () {
      var currLink = $(this);
      var refElement = $(currLink.attr("href"))[0];
      if (refElement) {
        var rect = refElement.getBoundingClientRect();
        var elementTop = rect.top + scrollTop;
        var elementBottom = elementTop + refElement.offsetHeight;

        if (elementTop >= scrollTop && elementBottom <= scrollBottom) {
          newActiveLink = currLink;
        }
      }
    });

    if (newActiveLink) {
      $('.menu-link').removeClass("active");
      newActiveLink.addClass("active");
      var newHref = newActiveLink.attr("href");
      history.replaceState(null, null, newHref);
    }
  }

  /* Check active section on scroll */
  $(window).on('scroll', checkActiveSection);

  /* Initial check when the page loads */
  checkActiveSection();
  
  // Валідація форми
  $('#registrationForm').on('submit', function (e) {
    e.preventDefault();
    var valid = true;

    /* Validation of the "Name" field */
    var name = $('#name').val().trim();
    var namePattern = /^[a-zA-Zа-яА-ЯїЇєЄіІ]{2,}$/;
    if (name === '') {
      alert('Будь ласка, введіть ім\'я');
      valid = false;
    } else if (!namePattern.test(name)) {
      alert('Ім\'я повинно містити тільки літери і мінімум 2 символи');
      valid = false;
    }

    /* Validation of the "Surname" field */
    var surname = $('#surname').val().trim();
    var surnamePattern = /^[a-zA-Zа-яА-ЯїЇєЄіІ]{2,}$/;
    if (surname === '') {
      alert('Будь ласка, введіть прізвище');
      valid = false;
    } else if (!surnamePattern.test(surname)) {
      alert('Прізвище повинно містити тільки літери і мінімум 2 символи');
      valid = false;
    }

    /* Validation of the "I'm more interested in" field */
    var interest = $('#interest').val().trim().toLowerCase();
    if (interest === '') {
      alert('Будь ласка, введіть ваш інтерес');
      valid = false;
    } else if (interest !== 'qa' && interest !== 'developer') {
      alert('Поле інтересу повинно містити або "qa", або "developer"');
      valid = false;
    }

    /* Validation of the "Phone number" field */
    var phone = $('#phone').val().trim();
    var phonePattern = /^\+38 \d{3} \d{2} \d{2} \d{3}$/;
    if (!phonePattern.test(phone)) {
      alert('Будь ласка, введіть коректний номер телефону у форматі: +38 XXX XX XX XXX');
      valid = false;
    }

    /* Validation of the "Email" field */
    var email = $('#email').val().trim();
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
      alert('Будь ласка, введіть коректний email');
      valid = false;
    }

    if (valid) {
      alert('Форма успішно відправлена!');
      this.submit();
    }
  });
});

if ($(".feedback-slider").length) {
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
}

if ($(".mentors-content").length) {
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
}
