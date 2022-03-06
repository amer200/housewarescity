(function ($) {
  "use strict";
  /*=================================
      JS Index Here
  ==================================*/
  /*
    01. On Load Function
    02. Preloader
    03. Mobile Menu Active
    04. Sticky fix
    05. Scroll To Top
    06. Set Background Image
    07. Hero Slider Active 
    08. Popup Sidemenu & Newsletter
    09. Search Box Popup
    10. Magnific Popup
    11. Section Position
    12. Filter
    13. Woocommerce Toggle
    14. Count Down
    15. Product Toggler
    16. Image Switcher
    17. News Ticker
    18. Product Swither
    19. Product Sliders
    20. Shop Tab Toggler
    21. Category Nav Toggler
    00. Right Click Disable
    00. Inspect Element Disable
  */
  /*=================================
      JS Index End
  ==================================*/
  /*

  /*---------- 01. On Load Function ----------*/
  $(window).on('load', function () {
    $('.preloader').fadeOut();
  });



  /*---------- 02. Preloader ----------*/
  if ($('.preloader').length > 0) {
    $('.preloaderCls').each(function () {
      $(this).on('click', function (e) {
        e.preventDefault();
        $('.preloader').css('display', 'none');
      })
    });
  };



  /*---------- 03. Mobile Menu Active ----------*/
  $.fn.vsmobilemenu = function (options) {
    var opt = $.extend({
      menuToggleBtn: '.vs-menu-toggle',
      bodyToggleClass: 'vs-body-visible',
      subMenuClass: 'vs-submenu',
      subMenuParent: 'vs-item-has-children',
      subMenuParentToggle: 'vs-active',
      meanExpandClass: 'vs-mean-expand',
      appendElement: '<span class="vs-mean-expand"></span>',
      subMenuToggleClass: 'vs-open',
      toggleSpeed: 400,
    }, options);

    return this.each(function () {
      var menu = $(this); // Select menu

      // Menu Show & Hide
      function menuToggle() {
        menu.toggleClass(opt.bodyToggleClass);

        // collapse submenu on menu hide or show
        var subMenu = '.' + opt.subMenuClass;
        $(subMenu).each(function () {
          if ($(this).hasClass(opt.subMenuToggleClass)) {
            $(this).removeClass(opt.subMenuToggleClass);
            $(this).css('display', 'none')
            $(this).parent().removeClass(opt.subMenuParentToggle);
          };
        });
      };

      // Class Set Up for every submenu
      menu.find('li').each(function () {
        var submenu = $(this).find('ul');
        submenu.addClass(opt.subMenuClass);
        submenu.css('display', 'none');
        submenu.parent().addClass(opt.subMenuParent);
        submenu.prev('a').append(opt.appendElement);
        submenu.next('a').append(opt.appendElement);
      });

      // Toggle Submenu
      function toggleDropDown($element) {
        if ($($element).next('ul').length > 0) {
          $($element).parent().toggleClass(opt.subMenuParentToggle);
          $($element).next('ul').slideToggle(opt.toggleSpeed);
          $($element).next('ul').toggleClass(opt.subMenuToggleClass);
        } else if ($($element).prev('ul').length > 0) {
          $($element).parent().toggleClass(opt.subMenuParentToggle);
          $($element).prev('ul').slideToggle(opt.toggleSpeed);
          $($element).prev('ul').toggleClass(opt.subMenuToggleClass);
        };
      };

      // Submenu toggle Button
      var expandToggler = '.' + opt.meanExpandClass;
      $(expandToggler).each(function () {
        $(this).on('click', function (e) {
          e.preventDefault();
          toggleDropDown($(this).parent());
        });
      });

      // Menu Show & Hide On Toggle Btn click
      $(opt.menuToggleBtn).each(function () {
        $(this).on('click', function () {
          menuToggle();
        })
      })

      // Hide Menu On out side click
      menu.on('click', function (e) {
        e.stopPropagation();
        menuToggle()
      })

      // Stop Hide full menu on menu click
      menu.find('div').on('click', function (e) {
        e.stopPropagation();
      });

    });
  };

  $('.vs-menu-wrapper').vsmobilemenu();


  /*---------- 04. Sticky fix ----------*/
  var lastScrollTop = '';
  var scrollToTopBtn = '.scrollToTop'

  function stickyMenu($targetMenu, $toggleClass, $parentClass) {
    var st = $(window).scrollTop();
    var height = $targetMenu.css('height');
    $targetMenu.parent().css('min-height', height);
    if ($(window).scrollTop() > 800) {
      $targetMenu.parent().addClass($parentClass);

      if (st > lastScrollTop) {
        $targetMenu.removeClass($toggleClass);
      } else {
        $targetMenu.addClass($toggleClass);
      };
    } else {
      $targetMenu.parent().css('min-height', '').removeClass($parentClass);
      $targetMenu.removeClass($toggleClass);
    };
    lastScrollTop = st;
  };
  $(window).on("scroll", function () {
    stickyMenu($('.sticky-active'), "active", "will-sticky");
    if ($(this).scrollTop() > 500) {
      $(scrollToTopBtn).addClass('show');
    } else {
      $(scrollToTopBtn).removeClass('show');
    }
  });


  /*---------- 05. Scroll To Top ----------*/
  $(scrollToTopBtn).each(function () {
    $(this).on('click', function (e) {
      e.preventDefault();
      $('html, body').animate({
        scrollTop: 0
      }, lastScrollTop / 3);
      return false;
    });
  })


  /*---------- 06.Set Background Image ----------*/
  if ($('[data-bg-src]').length > 0) {
    $('[data-bg-src]').each(function () {
      var src = $(this).attr('data-bg-src');
      if (src.length) {
        $(this).css('background-image', 'url(' + src + ')');
        $(this).removeAttr('data-bg-src').addClass('background-image');
      }
    });
  };




  /*----------- 07. Hero Slider Active ----------*/
  $('.vs-hero-carousel').each(function () {
    var vsHslide = $(this);

    // Get Data From Dom
    function d(data) {
      return vsHslide.data(data)
    }

    // Custom Arrow 
    vsHslide.find('[data-ls-go]').each(function () {
      $(this).on('click', function (e) {
        e.preventDefault();
        var target = $(this).data('ls-go');
        vsHslide.layerSlider(target)
      });
    });

    vsHslide.layerSlider({
      startInViewport: false,
      allowRestartOnResize: true,
      globalBGColor: (d('global-bg') ? d('global-bg') : false),
      globalBGImage: (d('global-img') ? d('global-img') : false),
      maxRatio: (d('maxratio') ? d('maxratio') : 1),
      type: (d('slidertype') ? d('slidertype') : 'responsive'),
      pauseOnHover: (d('pauseonhover') ? true : false),
      navPrevNext: (d('navprevnext') ? true : false),
      hoverPrevNext: (d('hoverprevnext') ? true : false),
      hoverBottomNav: (d('hoverbottomnav') ? true : false),
      navStartStop: (d('navstartstop') ? true : false),
      navButtons: (d('navbuttons') ? true : false),
      loop: ((d('loop') === false) ? false : true),
      autostart: (d('autostart') ? true : false),
      height: (d('height') ? d('height') : 1080),
      responsiveUnder: (d('responsiveunder') ? d('responsiveunder') : 1220),
      layersContainer: (d('container') ? d('container') : 1220),
      showCircleTimer: (d('showcircletimer') ? true : false),
      skinsPath: 'layerslider/skins/',
      thumbnailNavigation: ((d('thumbnailnavigation') === false) ? false : true)
    });
  });


  $(".hero-carousel-style2").layerSlider({
    createdWith: '6.11.8',
    sliderVersion: '6.11.8',
    startInViewport: false,
    skin: 'v6',
    globalBGColor: '#256bdb',
    navPrevNext: false,
    hoverPrevNext: false,
    navStartStop: false,
    navButtons: false,
    showCircleTimer: false,
    useSrcset: false,
    skinsPath: 'layerslider/skins/'
  });



  /*---------- 08. Popup Sidemenu & Newsletter ----------*/
  function popupSideMenu($sideMenu, $sideMunuOpen, $sideMenuCls, $toggleCls) {
    // Sidebar Popup
    $($sideMunuOpen).on('click', function (e) {
      e.preventDefault();
      $($sideMenu).addClass($toggleCls);
    });
    $($sideMenu).on('click', function (e) {
      e.stopPropagation();
      $($sideMenu).removeClass($toggleCls)
    });
    var sideMenuChild = $sideMenu + ' > div';
    $(sideMenuChild).on('click', function (e) {
      e.stopPropagation();
      $($sideMenu).addClass($toggleCls)
    });
    $($sideMenuCls).on('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      $($sideMenu).removeClass($toggleCls);
    });
  };
  popupSideMenu('.sidemenu-wrapper', '.sideMenuToggler', '.sideMenuCls', 'show');
  popupSideMenu('.popup-newsletter-active', '.popupNewsletterToggler', '.popup-newsletter-closer', 'show');


  /*---------- 09. Search Box Popup ----------*/
  function popupSarchBox($searchBox, $searchOpen, $searchCls, $toggleCls) {
    $($searchOpen).on('click', function (e) {
      e.preventDefault();
      $($searchBox).addClass($toggleCls);
    });
    $($searchBox).on('click', function (e) {
      e.stopPropagation();
      $($searchBox).removeClass($toggleCls);
    });
    $($searchBox).find('form').on('click', function (e) {
      e.stopPropagation();
      $($searchBox).addClass($toggleCls);
    });
    $($searchCls).on('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      $($searchBox).removeClass($toggleCls);
    });
  };
  popupSarchBox('.popup-search-box', '.searchBoxTggler', '.searchClose', 'show');


  /*----------- 10. Magnific Popup ----------*/
  /* magnificPopup img view */
  $('.popup-image').magnificPopup({
    type: 'image',
    gallery: {
      enabled: true
    }
  });

  /* magnificPopup video view */
  $('.popup-video').magnificPopup({
    type: 'iframe'
  });


  /*---------- 11. Section Position ----------*/
  // Interger Converter
  function convertInteger(str) {
    return parseInt(str, 10)
  }

  $.fn.sectionPosition = function (mainAttr, posAttr) {
    $(this).each(function () {
      var section = $(this);

      function setPosition() {
        var sectionHeight = Math.floor(section.height() / 2), // Main Height of section
          posData = section.attr(mainAttr), // where to position
          posFor = section.attr(posAttr), // On Which section is for positioning  
          topMark = 'top-half', // Pos top
          bottomMark = 'bottom-half', // Pos Bottom
          parentPT = convertInteger($(posFor).css('padding-top')), // Default Padding of  parent
          parentPB = convertInteger($(posFor).css('padding-bottom')); // Default Padding of  parent

        if (posData === topMark) {
          $(posFor).css('padding-bottom', parentPB + sectionHeight + 'px');
          section.css('margin-top', "-" + sectionHeight + 'px');
        } else if (posData === bottomMark) {
          $(posFor).css('padding-top', parentPT + sectionHeight + 'px');
          section.css('margin-bottom', "-" + sectionHeight + 'px');
        }
      }
      setPosition(); // Set Padding On Load
    })
  }

  var postionHandler = '[data-sec-pos]';
  if ($(postionHandler).length) {
    $(postionHandler).imagesLoaded(function () {
      $(postionHandler).sectionPosition('data-sec-pos', 'data-pos-for');
    });
  }


  /*----------- 12. Filter ----------*/
  $('.filter-active').imagesLoaded(function () {
    var $filter = '.filter-active',
      $filter2 = '.filter-active-style2',
      $filterItem = '.filter-item',
      $filterMenu = '.filter-menu-active';

    if ($($filter).length > 0) {
      var $grid = $($filter).isotope({
        itemSelector: $filterItem,
        filter: '*',
        masonry: {
          // use outer width of grid-sizer for columnWidth
          columnWidth: $filterItem
        }
      });
    }

    if ($($filter2).length > 0 ) {
      var $grid = $($filter2).isotope({
        itemSelector: $filterItem,
        filter: '*',
        masonry: {
          // use outer width of grid-sizer for columnWidth
          columnWidth: 1
        }
      });
    };

    // filter items on button click
    $($filterMenu).on('click', 'button', function () {
      var filterValue = $(this).attr('data-filter');
      $grid.isotope({
        filter: filterValue
      });
    });

    // Menu Active Class 
    $($filterMenu).on('click', 'button', function (event) {
      event.preventDefault();
      $(this).addClass('active');
      $(this).siblings('.active').removeClass('active');
    });


  });



  /*----------- 13. Woocommerce Toggle ----------*/
  // Ship To Different Address
  $('#ship-to-different-address-checkbox').on('change', function () {
    if ($(this).is(':checked')) {
      $('#ship-to-different-address').next('.shipping_address').slideDown();
    } else {
      $('#ship-to-different-address').next('.shipping_address').slideUp();
    }
  });

  // Login Toggle
  $('.woocommerce-form-login-toggle a').on('click', function (e) {
    e.preventDefault();
    $('.woocommerce-form-login').slideToggle();
  })

  // Coupon Toggle
  $('.woocommerce-form-coupon-toggle a').on('click', function (e) {
    e.preventDefault();
    $('.woocommerce-form-coupon').slideToggle();
  })

  // Woocommerce Shipping Method
  $('.shipping-calculator-button').on('click', function (e) {
    e.preventDefault();
    $(this).next('.shipping-calculator-form').slideToggle();
  })

  // Woocommerce Payment Toggle
  $('.wc_payment_methods input[type="radio"]:checked').siblings('.payment_box').show();
  $('.wc_payment_methods input[type="radio"]').each(function () {
    $(this).on('change', function () {
      $('.payment_box').slideUp();
      $(this).siblings('.payment_box').slideDown();
    })
  })

  // Woocommerce Rating Toggle
  $('.rating-select .stars a').each(function () {
    $(this).on('click', function (e) {
      e.preventDefault();
      $(this).siblings().removeClass('active');
      $(this).parent().parent().addClass('selected');
      $(this).addClass('active');
    });
  })


  /*---------- 14. Count Down ----------*/
  $.fn.countdown = function () {
    $(this).each(function () {
      var $counter = $(this),
        countDownDate = new Date($counter.data('offer-date')).getTime(), // Set the date we're counting down toz
        exprireCls = 'expired';

      // Finding Function
      function s$(element) {
        return $counter.find(element);
      }     

      // Update the count down every 1 second
      var counter = setInterval(function () {
        // Get today's date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Check If value is lower than ten, so add zero before number
        days < 10 ? days = '0' + days : null;
        hours < 10 ? hours = '0' + hours : null;
        minutes < 10 ? minutes = '0' + minutes : null;
        seconds < 10 ? seconds = '0' + seconds : null;

        // If the count down is over, write some text 
        if (distance < 0) {
          clearInterval(counter);
          $counter.addClass(exprireCls);
          $counter.find('.message').css('display', 'block');
        } else {
          // Output the result in elements
          s$('.day').html(days)
          s$('.hour').html(hours)
          s$('.minute').html(minutes)
          s$('.seconds').html(seconds)
        }
      }, 1000);
    })
  }

  if ($('.offer-counter').length) {
    $('.offer-counter').countdown();
  }

  if ($('.notice-counter').length) {
    $('.notice-counter').countdown();
  }


  /*----------- 15. Product Toggler ----------*/
  $('.product_ripple_icon').each(function(){
    var $btn = $(this);
    $btn.on('click', function(e){
      e.preventDefault();
      $(this).next('.product_ripple_body').toggleClass('show');
    })
  })
  
  
  /*----------- 16. Image Switcher ----------*/
  $('.img-switcher').each(function(){
    $(this).on('click', function(){
      var $sBtn = $(this);
      var imgUrl = $sBtn.data('switch');
      var locationUrl = $sBtn.data('switch-on');
      $sBtn.addClass('active');
      $sBtn.siblings().removeClass('active');
      $(locationUrl).attr('src', imgUrl);
    });
  });


  /*----------- 17. News Ticker ----------*/
  var $ticker = $('[data-ticker="list"]'),
    tickerItem = '[data-ticker="item"]',
    duration = $ticker.data('ticker-duration'),
    itemCount = $(tickerItem).length,
    viewportWidth = 0;

  function setupViewport() {
    $ticker.find(tickerItem).clone().prependTo('[data-ticker="list"]');
    for (var i = 0; i < itemCount; i++) {
      var itemWidth = $(tickerItem).eq(i).outerWidth();
      viewportWidth = viewportWidth + itemWidth;
    }
    $ticker.css('width', viewportWidth);
  }

  function animateTicker() {
    $ticker.animate({
      marginLeft: -viewportWidth
    }, duration, "linear",
    function () {
      $ticker.css('margin-left', '0');
      animateTicker();
    });
  }

  function initializeTicker() {
    setupViewport();
    animateTicker();

    $ticker.on('mouseenter', function () {
      $(this).stop(true);
    }).on('mouseout', function () {
      animateTicker();
    });

    $(window).on('resize', function(){
      setupViewport();
      animateTicker();
    })
  }

  initializeTicker();


  /*----------- 18. Product Swither ----------*/
  $('.product-switcher .switch').each(function(){
    $(this).on('click', function () {
      var img = $(this).closest('.product-switcher').find('.product-img img');
      var src = $(this).data('srcset');
      img.attr('src', src)
    });
  });



  /*----------- 19. Product Sliders ----------*/
  $('.product-big-slide').slick({
    dots: false,
    infinite: true,
    arrows: false,
    autoplay: false,
    fade: true,
    focusOnSelect: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: '.product-thumb-slide',
  });


  $('.product-thumb-slide').slick({
    dots: false,
    infinite: true,
    vertical: true,
    verticalSwiping: true,
    arrows: false,
    autoplay: false,
    fade: false,
    focusOnSelect: true,
    centerMode: true,
    centerPadding: '0',
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    asNavFor: '.product-big-slide',
    responsive: [{
      breakpoint: 1500,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1
      }
    }, {
      breakpoint: 1350,
      settings: {
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 1
      }
    }, {
      breakpoint: 992,
      settings: {
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 1
      }
    }, {
      breakpoint: 767,
      settings: {
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 1,
        vertical: false,
        verticalSwiping: false,
      }
    }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  });


  /*----------- 20. Shop Tab Toggler ----------*/
  $('.reviews-summary__buttons a').each(function(){
    $(this).on('click', function(e){
      e.preventDefault();
      var tabEle = $(this).attr('href');
      $(tabEle).siblings().removeClass('active').removeClass('show');
      $(tabEle).addClass('active show');
      var relativeLink = $('[href="'+tabEle+'"');
      relativeLink.parent().siblings().find('a').removeClass('active');
      relativeLink.addClass('active');
    })
  });

  $('.review-toggler').each(function(){
    $(this).on('click', function(){
      $('#review_form').slideToggle();
    })
  });


  /*----------- 21. Category Nav Toggler ----------*/
  function cateNavToggler () {
    if($(window).width() <= 576) {
      $('.vs-box-nav .menu-item-has-children > a').each(function () {
        $(this).on('click', function (e) {
          e.preventDefault();
          var $btn = $(this);
          $btn.next('.sub-menu').slideToggle('slow');
          $btn.toggleClass('active')
        })
      });
    }
  };

  cateNavToggler();

  $(window).on('resize', function(){
    cateNavToggler();
  })




  /*----------- 00. Right Click Disable ----------*/
  // window.addEventListener('contextmenu', function (e) {
  //   // do something here... 
  //   e.preventDefault();
  // }, false);


  /*----------- 00. Inspect Element Disable ----------*/
  // document.onkeydown = function (e) {
  //   if (event.keyCode == 123) {
  //     return false;
  //   }
  //   if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
  //     return false;
  //   }
  //   if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
  //     return false;
  //   }
  //   if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
  //     return false;
  //   }
  //   if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
  //     return false;
  //   }
  // }







})(jQuery);