const humburger = $('.js-humburger');
const headerMenu = $('.js-nav');
const scrollBtn = $('.scroll-btn');
const header = $('.header');
const logoImg = $('.logo img');
const subMenu = $('.subnav');
const reviewNext = $('.js-review_next');
const reviewPrev = $('.js-review_prev');
const closeBtn = $('.js-close');

function setInnerHeader() {
  logoImg.attr("src", logoWhiteUrl);
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

function setInstagramHeight() {
  let itemWidth = $('.instagram-content__item').width();
  $('.instagram-content__item').css('height', itemWidth);
}

function setWhiteLogo() {
  logoImg.attr("src", logoWhiteUrl);
}

function setColorLogo() {
  logoImg.attr("src", logoMainUrl);
}

function openMenu() {
  humburger.addClass('open');
  headerMenu.fadeIn();
}

function closeMenu() {
  humburger.removeClass('open');
  headerMenu.fadeOut();
}

function showContent() {
  $('.main-wrapper').removeClass('js-fadeIn');
}

$(document).ready(function () {

  $(window).scroll(function () {
    const scrollValue = $(this).scrollTop();
    // scrollValue >= 1 ? closeMenu() : null;
    if (scrollValue > 1 && scrollValue < 400) {
      header.addClass('hidden');
    }
    else if (scrollValue > 400) {
      header.removeClass('hidden');
      header.addClass('sticky');
      setWhiteLogo();
    } else {
      header.removeClass('sticky');
      header.removeClass('hidden');
      setColorLogo();
    }
  });
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

  // if ($(window).width() > 992) {
  //   setPositionSubmenu();
  // }
  setPositionSubmenu();
  // if ($('.inner-page').length > 0) {
  //   setInnerHeader();
  // } else {
  //   setHomeHeader();
  // }
  showContent();

  humburger.click(function () {
    if ($(this).hasClass('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  closeBtn.click(function () {
    closeMenu();
  });

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
$(window).on('load', function () {
  setInstagramHeight();
});

$(window).resize(function () {
  setInstagramHeight();
});

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
  nextArrow: reviewNext,
  responsive: [{
    breakpoint: 768,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1,
    }
  }]
});

svg4everybody();