const humburger = $('.js-humburger');
const headerMenu = $('.menu');
const scrollBtn = $('.scroll-btn');
const header = $('.header');
const logoImg = $('.logo img');
const subMenu = $('.subnav');
const reviewNext = $('.js-review_next');
const reviewPrev = $('.js-review_prev');

function setInnerHeader() {
  logoImg.attr("src", logoBlackUrl);
  header.addClass('header_inner');
}


function setHomeHeader() {
  logoImg.attr("src", logoMainUrl);
  header.removeClass('header_inner');
}

function setPositionSubmenu() {
  let subMenuPosition = $('.nav-list li:nth-child(2)').position().left + 20;
  subMenu.css('left', subMenuPosition)
}
// function showOnScroll(scrollValue) {
//   $('.js-scroll').each(function () {
//     let elem = $(this);
//     let sectionPos = elem.offset().top;
//     let windowPos = $(window).scrollTop() + $(window).height() / 1.2;
//     if (sectionPos < windowPos) {
//       elem.removeClass('js-fadeIn js-slideLeft js-slideRight js-slideTop');
//     }
//   });

//   $('.js-active').each(function () {
//     let item = $(this);
//     let sectionPos = item.offset().top;
//     let windowPos = $(window).scrollTop() + $(window).height() / 2.8;
//     if (sectionPos < windowPos) {
//       item.addClass('active');
//     } else {
//       item.removeClass('active');
//     }
//   });
// }

// function openMenu() {
//   humburger.addClass('open');
//   headerMenu.addClass('open');
// }

// function closeMenu() {
//   humburger.removeClass('open');
//   headerMenu.removeClass('open');
// }

function showContent() {
  $('.main-wrapper').removeClass('js-fadeIn');
}

$(document).ready(function () {

  // navigation hover effect
  let leftPos, newWidth, $magicLine;
  $('.nav-list').append("<li id='magic-line'></li>");
  $magicLine = $('#magic-line');
  $magicLine.width($('.active').width())
    .css('left', $('.active a').position().left)
    .data('origLeft', $magicLine.position().left)
    .data('origWidth', $magicLine.width());

  $('.nav-list__link').click(function () {
    let $this = $(this);
    $this.parent().addClass('active').siblings().removeClass('active');
    $magicLine
      .data('origLeft', $this.position().left - 20)
      .data('origWidth', $this.parent().width() - 40);
    return false;
  });

  /*Magicline hover animation*/
  $('.nav-list__item').find('.nav-list__link').hover(function () {
    let $thisBar = $(this);
    leftPos = $thisBar.position().left + 20;
    newWidth = $thisBar.parent().width() - 40;
    $magicLine.css({
      "left": leftPos,
      "width": newWidth
    });
  }, function () {
    $magicLine.css({
      "left": $magicLine.data('origLeft'),
      "width": $magicLine.data('origWidth')
    });
  });

  setPositionSubmenu();
  // if ($('.inner-page').length > 0) {
  //   setInnerHeader();
  // } else {
  //   setHomeHeader();
  // }
  showContent();

  // humburger.click(function () {
  //   if ($(this).hasClass('open')) {
  //     closeMenu();
  //   } else {
  //     openMenu();
  //   }


  // FAQ accordion
  $('.accordion-list__link').click(function (e) {
    e.preventDefault();
    if ($(this).hasClass('accordion_active')) {
      $(this).removeClass("accordion_active").closest('.accordion-list__item').find('.accordion__content').slideUp(200);
      $(this).find('.accordion__plus').removeClass('accordion__plus_active');
    } else {
      $(this).addClass("accordion_active").closest('.accordion-list__item').find('.accordion__content').slideDown(200);
      $(this).parent().siblings('.accordion-list__item').find('.accordion-list__link').removeClass("accordion_active");
      $(this).parent().siblings('.accordion-list__item').find('.accordion__content').slideUp(200);
      $(this).find('.accordion__plus').addClass('accordion__plus_active');
      $(this).parent().siblings('.accordion-list__item').find('.accordion__plus').removeClass('accordion__plus_active');
    }
  });
});


// slow scroll to id

//   scrollBtn.click(function (e) {
//     e.preventDefault();
//     let link = $($(this).attr('href'))
//     $('html, body').animate({
//       scrollTop: link.offset().top
//     }, 1000);
//   });

//   showOnScroll($(window).scrollTop());

//   $(window).scroll(function () {
//     const scrollValue = $(this).scrollTop();
//     showOnScroll(scrollValue);
//     scrollValue >= 1 ? closeMenu() : null;

//     if (scrollValue > 1) {
//       header.addClass('sticky');
//     } else {
//       header.removeClass('sticky');
//       // logoImg.attr("src", logoColorUrl);
//     }
//   });

$('.js-reviews-slider').slick({
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  dots: false,
  arrows: true,
  infinite: false,
  fade: false,
  speed: 400,
  cssEase: 'linear',
  autoplaySpeed: 10000,
  prevArrow: reviewPrev,
  nextArrow: reviewNext
});
// $('.testimonials-slider__wrapper').slick({
//   slidesToShow: 1,
//   slidesToScroll: 1,
//   autoplay: true,
//   dots: true,
//   arrows: false,
//   infinite: true,
//   fade: true,
//   speed: 1000,
//   cssEase: 'linear',
//   autoplaySpeed: 10000,
//   arrows: true,
//   prevArrow: $('.testimonials-slider_prev'),
//   nextArrow: $('.testimonials-slider_next')
// });
// }); 
svg4everybody();