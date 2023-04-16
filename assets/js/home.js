(function ($) {
    "use strict";
  
    //Update Header Style and Scroll to Top
    function headerStyle() {
      if ($(".main-header").length) {
        var windowpos = $(window).scrollTop();
        var siteHeader = $(".main-header");
        var scrollLink = $(".scroll-to-top");
        if (windowpos >= 1) {
          siteHeader.addClass("fixed-header");
          scrollLink.fadeIn(300);
        } else {
          siteHeader.removeClass("fixed-header");
          scrollLink.fadeOut(300);
        }
      }
    }
  
    headerStyle();
  
    if ($(".testimonial-carousel .swiper-wrapper").length) {
      new Swiper(".testimonial-carousel", {
        autoplay: true,
        loop: true,
        slidesPerView: 1,
        spaceBetween: 20,
        breakpoints: {
          767: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
        },
        navigation: {
          nextEl: ".testimonial-button-next",
          prevEl: ".testimonial-button-prev",
        },
      });
    }
  
    if ($(".accordion-box").length) {
      $(".accordion-box").on("click", ".acc-btn", function () {
        var outerBox = $(this).parents(".accordion-box");
        var target = $(this).parents(".accordion");
  
        if ($(this).hasClass("active") !== true) {
          $(outerBox).find(".accordion .acc-btn").removeClass("active");
        }
  
        if ($(this).next(".acc-content").is(":visible")) {
          return false;
        } else {
          $(this).addClass("active");
          $(outerBox).children(".accordion").removeClass("active-block");
          $(outerBox).find(".accordion").children(".acc-content").slideUp(300);
          target.addClass("active-block");
          $(this).next(".acc-content").slideDown(300);
        }
      });
    }
  
    // Elements Animation
    if ($(".wow").length) {
      var wow = new WOW({
        boxClass: "wow", // animated element css class (default is wow)
        animateClass: "animated", // animation css class (default is animated)
        offset: 0, // distance to the element when triggering the animation (default is 0)
        mobile: true, // trigger animations on mobile devices (default is true)
        live: true, // act on asynchronously loaded content (default is true)
      });
      wow.init();
    }
  
    $(window).on("scroll", function () {
      headerStyle();
    });
  })(window.jQuery);
  