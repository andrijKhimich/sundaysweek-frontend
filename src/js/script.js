const humburger = $('.js-humburger');
const headerMenu = $('.js-nav');
const header = $('.header');
const logoImg = $('.logo img');
const subMenu = $('.subnav');
const reviewNext = $('.js-review_next');
const reviewPrev = $('.js-review_prev');
const boatNext = $('.js-boat_next');
const boatPrev = $('.js-boat_prev');
const closeBtn = $('.js-close');
const articleNav = $('.js-article-navigation');
const sidebar = $('.js-sidebar');

// let lastScrollTop = 0;
// let navPosition = articleNav.offset().top;
// let sidebarPosition = sidebar.offset().top;

function stickyHeader() {
  const scrollValue = $(this).scrollTop();
  if (scrollValue > 1 && scrollValue < 400) {
    header.addClass('hidden');
  } else if (scrollValue > 400) {
    header.removeClass('hidden');
    header.addClass('sticky');
    setWhiteLogo();
  } else {
    header.removeClass('sticky');
    header.removeClass('hidden');
    setColorLogo();
  }
}


function stickyNav() {
  let scrollValue = $(this).scrollTop();
  console.log(scrollValue, navPosition);
  if (scrollValue >= navPosition) {
    articleNav.addClass('sticky');
  } else {
    articleNav.removeClass('sticky');
  }
}

function setInnerHeader() {
  logoImg.attr("src", logoWhiteUrl);
  header.addClass('header_inner');
}

function setHomeHeader() {
  logoImg.attr("src", logoMainUrl);
  header.removeClass('header_inner');
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
  showContent();

  $(window).bind('scroll', function () {
    var currentTop = $(window).scrollTop();
    var elems = $('.scrollspy');
    elems.each(function (index) {
      var elemTop = $(this).offset().top;
      var elemBottom = elemTop + $(this).height();
      if (currentTop >= elemTop && currentTop <= elemBottom) {
        var id = $(this).attr('id');
        var navElem = $('a[href="#' + id + '"]');
        navElem.parent().addClass('active').siblings().removeClass('active');
      }
    })
  });

  $(window).scroll(function () {
    if ($('.js-article-navigation').length == 0) {
      stickyHeader();
    } else {
      stickyNav();
    }
    let currentPosition = $(this).scrollTop();
    if (currentPosition > lastScrollTop) {
      // scroll down
      console.log('down')
    } else {
      // scroll up
      console.log('up')
    }
    lastScrollTop = currentPosition;
  });

  // slow scroll to id 
  $('.article-navigation li a[href^="#"]').on('click', function () {
    $('html, body').animate({
      scrollTop: $($(this).attr('href')).offset().top - 60
    }, 1000);
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
    // return false;
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
  $(".wrapper .tab").click(function () {
    $(".wrapper .tab").removeClass("active").eq($(this).index()).addClass("active");
    $(".tab_item").hide().eq($(this).index()).fadeIn()
  }).eq(0).addClass("active");


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
  // tour days accordion
  $('.tour-accordion__link').click(function (e) {
    e.preventDefault();
    if ($(this).hasClass('active')) {
      $(this).removeClass("active").closest('.tour-accordion__item').find('.tour-accordion__content').slideUp(400);
    } else {
      $(this).addClass("active").closest('.tour-accordion__item').find('.tour-accordion__content').slideDown(400);
      $(this).parent().siblings('.tour-accordion__item').find('.tour-accordion__link').removeClass("accordion_active");
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
$('.js-boat-slider').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: false,
  dots: true,
  arrows: true,
  infinite: false,
  fade: false,
  prevArrow: boatPrev,
  nextArrow: boatNext,
});

svg4everybody();