(function($) {

  // NOTE: slow scroll might be causing buggs
  //jQuery.scrollSpeed(80, 700);

  var $window = $(window);
  var windowPos = $window.scrollTop();
  var scrollPos = $window.scrollTop();
  var scrollDirection = 'down';
  var pageBG = $('.Page-BG');
  var currentEnter = 1, currentExit = 0;

  inView.threshold(0.15);
  inView.offset({
    top: 0,
    bottom: -10,
    left: 0,
    right: 0
  });

  inView('.page-content').on('enter', function(el) {
    contentEnter(el);
  });

  // inView('.column-section').on('enter', function(el) {
  //   columnEnter(el);
  // });
  inView('.col4').on('enter', function(el) {
    columnEnter(el);
  });

  new LuminousGallery(document.querySelectorAll('.projects-gallery--open'), {}, {
    caption: function(trigger) {
      return trigger.querySelector('img').getAttribute('alt');
    }
  });

  $window.scroll(function() {
    scrollFuncs();
  });

  $window.resize(function() {
    resizeFuncs();
  });

  $window.load(function() {
    sizeSections();
    loadImages();
  });

  var scrollFuncs = debounce(function() {
    stickyHeader();
  }, 200);

  var resizeFuncs = debounce(function() {
    sizeSections();
    sizeVideo();
  }, 200);

  function sizeVideo() {
    var h = $('#videoBG').height();
    $('.video-wrapper').css('height', h+'px');
  }
  sizeVideo();

  $(document).ready(function() {

    $('.home-services .col4').each(function() {
      $(this).css('background-image', 'url('+$(this).attr("data-bg")+')');
    });

    $('.team__member:not(.halfed) .team-person-name').each(function() {
      var Me = $(this);
      var words = Me.text().split(" "); 
      Me.empty();
      $.each(words, function(i, v) {
        console.log(v);
        Me.append($('<div>').text(v));
      });
    });

    $('.menu-item-has-children').append('<span class="mobile-sub-toggle"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"/></svg></span>');

    $('.menu-item-has-children').on('click', '.mobile-sub-toggle', function() {
      var ME = $(this);
      var PARENT = ME.parent();
      ME.toggleClass('opened');
      PARENT.toggleClass('opened');
    });

    $('.menu--open').click(function(e) {
      $('.header-menu').slideDown();
    });

    $('.menu--close').click(function(e) {
      $('.header-menu').slideUp();
    });



    var reviewSlider = $('.review-slider');

    $(window).load(function() {
      $('.related-proj-slider').owlCarousel({
        items: 1,
        nav: false,
        dots: true,
        loop: true,
        autoplay: true,
      });
      if (reviewSlider.length) {
        reviewSlider.owlCarousel({
          items: 1,
          nav: false,
          dots: true,
          autoplay: true,
          loop: true,
          autoplayTimeout: 9000,
          autoplaySpeed: 800,
          animateOut: 'fadeOut'
        });
      }
    });

    $('#open_video_layer').click(function(e) {
      e.preventDefault();
      $('.video-layer-bg').fadeIn();
      $('.video-layer iframe')[0].contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*');  
    });

    $('.video-layer-bg').click(function(e) {
      if(e.target == this) {
        $('.video-layer-bg').fadeOut();
      }
    });

    $('.close-video-layer').click(function(e) {
      e.preventDefault();
      $('.video-layer-bg').fadeOut();
      $('.video-layer iframe')[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');    
    });

    // $('.job-layer-bg').click(function(e) {
    //   if(e.target == this) {
    //     $('.job-layer-bg').fadeOut();
    //   }
    // });

    $('.close-job-layer').click(function(e) {
      e.preventDefault();
      $('.job-layer-bg').fadeOut();
    });

    $('a[data-open-quiz]').click(function(e) {
      e.preventDefault();
      $('#quiz1').fadeIn();
    });

    $('.step-next-btn').click(function(e) {
      var p = $(this).parents('.step-form');
      var steps = p.find('.step').length;
      var current = p.find('.step.active').attr('data-step');
      var next = +current + 1;
      var percent = (next / steps) * 100;
      //console.log(steps, current, next, percent);

      if(steps+1 == next) {
        return;
      }
      if(steps == next) {
        $(this).hide();
      }

      p.find('.step-prev-btn').show();
      p.find('.step-progress-current').text(next);
      p.find('.step.active').removeClass('active');
      p.find('.step[data-step="'+next+'"]').addClass('active');
      p.find('.step-progress-bar span').css('width',percent+'%');
    });

    $('.step-prev-btn').click(function(e) {
      var p = $(this).parents('.step-form');
      var steps = p.find('.step').length;
      var current = p.find('.step.active').attr('data-step');
      var next = +current - 1;
      var percent = (next / steps) * 100;

      $(this).next().show();

      if(0 == next) return;

      p.find('.step-progress-current').text(next);
      p.find('.step.active').removeClass('active');
      p.find('.step[data-step="'+next+'"]').addClass('active');
      p.find('.step-progress-bar span').css('width',percent+'%');
    });

  });

  function contentEnter(el) {
    var t = $(el),
        p = t.parent(),
        bg = p.attr('data-bg'),
        overlay = p.attr('data-bg-overlay'),
        lighten = p.attr('data-bg-lighten'),
        cols = p.attr('data-cols');

    if(t.parent().hasClass('fixed-section')) return false;

    $('.page-content.visible').removeClass('visible');

    t.addClass('visible');

    if(cols) {
      return false;
    } else {
      $('.Page-BG-Cols, .Page-BG-Cols > div').removeClass('visi');
      pageBG.css('background-image', 'url('+bg+')');
      if(lighten) {
        pageBG.addClass('lighten');
      } else {
        pageBG.removeClass('lighten');
      }
      if(overlay) {
        pageBG.addClass('overlay-on');
      } else {
        pageBG.removeClass('overlay-on');
      }
    }
  }

  function columnEnter(el) {
    var t = $(el);

    if(t.parent().parent().hasClass('fixed-section')) return false;

    $('.Page-BG-Cols > div').removeClass('visi');
    $('.Page-BG-Cols').addClass('visi');

    var cols = t.siblings('.col4');
    var ww = $window.width();
    if(ww > 1023) {
      var colView = 4;
    } else if(ww < 769) {
      var colView = 1;
    } else {
      var colView = 2;
    }

    for(var i=1;i<=colView;i++) {
      $('.Page-BG-Col'+i).addClass('visi');
    }

    if(colView == 1) {
      var i = t.index() + 1;
      var ov = t.attr('data-bg-overlay');
      $('.Page-BG-Col'+i).addClass('visi');
      $('.Page-BG-Col'+i).css('background-image', 'url('+t.attr('data-bg')+')');
      if(ov) {
        $('.Page-BG-Col'+i).addClass('overlay-on');
      } else {
        $('.Page-BG-Col'+i).removeClass('overlay-on');
      }
    } else {
      cols.each(function() {
        var i = $(this).index() + 1;
        var ov = $(this).attr('data-bg-overlay');
        // $('.Page-BG-Col'+i).addClass('visi');
        $('.Page-BG-Col'+i).css('background-image', 'url('+$(this).attr('data-bg')+')');
        if(ov) {
          $('.Page-BG-Col'+i).addClass('overlay-on');
        } else {
          $('.Page-BG-Col'+i).removeClass('overlay-on');
        }

        // if(i == colView) {
        //   return false;
        // }
      });
    }
  }

  function loadImages() {
    var imgArr = [];
    var imgUnique = [];
    $('.page-section').each(function() {
      var t = $(this);
      if(t.attr('data-cols')) {
        t.find('.col4').each(function() {
          imgArr.push($(this).attr('data-bg'));
        });
      } else {
        imgArr.push(t.attr('data-bg'));
      }
    });
    $.each(imgArr, function(i, el) {
      if($.inArray(el, imgUnique) === -1) imgUnique.push(el);
    });
    imgUnique.forEach(function (url) {
      new Image().src = url;
    });
    $('.loader').fadeOut();
  }

  function sizeSections() {
    $('.page-section:not(.team__section):not(.fixed-section)').each(function() {
      var h = $(this).find('.page-content').outerHeight();
      //var h = $(this).find('.page-content').height();
      h = h + 200;
      $(this).css('height',h+'px');
    });
  }

  function stickyHeader() {
    var scrollPos = $window.scrollTop();

    if(scrollPos > 150) {
      $('.header').addClass('sticky');
    } else {
      $('.header').removeClass('sticky');
    }
  }

  function debounce(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  $('.rem-acc-title').click(function() {
    var p = $(this).parent();
    p.toggleClass('opened');
    p.find('.rem-acc-content').slideToggle();
  });

if($('._form_0').length) {
  var quote_parent, select_quote_child, $quote_parent, $quote_child;

  $quote_child = $('._form_0 .quote-select-child').selectize({
    create: false,
    options: [],
    labelField: 'item',
    valueField: 'item',
    searchField: 'item',
    placeholder: 'SERVICE(S) REQUIRED',
    maxItems: 1
  });

  $quote_parent = $('._form_0 .quote-select-parent').selectize({
    create: false,
    options: [{item: 'PAINTING'}, {item: 'RESTORATION'}],
    labelField: 'item',
    valueField: 'item',
    searchField: 'item',
    placeholder: 'SERVICE TYPE',
    maxItems: 1,
    onChange: function(value) {
      if(!value.length) return;
      $('._form_0 .form-service-child-wrap').show();
      select_quote_child.disable();
      select_quote_child.clear();
      select_quote_child.clearOptions();
      select_quote_child.renderCache = {};
      select_quote_child.load(function (callback) {
        select_quote_child.enable();
        if (value == 'PAINTING') {
          callback([
            { item: 'EXTERIOR PAINTING'},
            { item: 'INTERIOR PAINTING'},
            { item: 'DESIGN UPGRADES'},
            { item: 'HIGH RISE PAINTING' },
            { item: 'OTHER'},
          ]);
        } else if (value == 'RESTORATION') {
          callback([
            { item: 'CONCRETE RESTORATION' },
            { item: 'MEMBRANES' },
            { item: 'CAULKING & SEALANT RENEWAL' },
            { item: 'BALCONY RESTORATION' },
            { item: 'OTHER' },
          ]);
        }
      });
    }
  });

  select_quote_child = $quote_child[0].selectize;
  quote_parent = $quote_parent[0].selectize;
  select_quote_child.disable();
}

if ($('._form_1').length) {
  var quote_parent2, select_quote_child2, $quote_parent2, $quote_child2;

  $quote_child2 = $('._form_1 .quote-select-child').selectize({
    create: false,
    options: [],
    labelField: 'item',
    valueField: 'item',
    searchField: 'item',
    placeholder: 'SERVICE(S) REQUIRED',
    maxItems: 1
  });

  $quote_parent2 = $('._form_1 .quote-select-parent').selectize({
    create: false,
    options: [{ item: 'PAINTING' }, { item: 'RESTORATION' }],
    labelField: 'item',
    valueField: 'item',
    searchField: 'item',
    placeholder: 'SERVICE TYPE',
    maxItems: 1,
    onChange: function (value) {
      if (!value.length) return;
      $('._form_1 .form-service-child-wrap').show();
      select_quote_child2.disable();
      select_quote_child2.clear();
      select_quote_child2.clearOptions();
      select_quote_child2.renderCache = {};
      select_quote_child2.load(function (callback) {
        select_quote_child2.enable();
        if (value == 'PAINTING') {
          callback([
            { item: 'EXTERIOR PAINTING' },
            { item: 'INTERIOR PAINTING' },
            { item: 'DESIGN UPGRADES' },
            { item: 'HIGH RISE PAINTING' },
            { item: 'OTHER' },
          ]);
        } else if (value == 'RESTORATION') {
          callback([
            { item: 'CONCRETE RESTORATION' },
            { item: 'MEMBRANES' },
            { item: 'CAULKING & SEALANT RENEWAL' },
            { item: 'BALCONY RESTORATION' },
            { item: 'OTHER' },
          ]);
        }
      });
    }
  });

  select_quote_child2 = $quote_child2[0].selectize;
  quote_parent2 = $quote_parent2[0].selectize;
  select_quote_child2.disable();
}

if ($('._form_2').length) {
  var quote_parent3, select_quote_child3, $quote_parent3, $quote_child3;

  $quote_child3 = $('._form_2 .quote-select-child').selectize({
    create: false,
    options: [],
    labelField: 'item',
    valueField: 'item',
    searchField: 'item',
    placeholder: 'SERVICE(S) REQUIRED',
    maxItems: 1
  });

  $quote_parent3 = $('._form_2 .quote-select-parent').selectize({
    create: false,
    options: [{ item: 'PAINTING' }, { item: 'RESTORATION' }],
    labelField: 'item',
    valueField: 'item',
    searchField: 'item',
    placeholder: 'SERVICE TYPE',
    maxItems: 1,
    onChange: function (value) {
      if (!value.length) return;
      $('._form_2 .form-service-child-wrap').show();
      select_quote_child3.disable();
      select_quote_child3.clear();
      select_quote_child3.clearOptions();
      select_quote_child3.renderCache = {};
      select_quote_child3.load(function (callback) {
        select_quote_child3.enable();
        if (value == 'PAINTING') {
          callback([
            { item: 'EXTERIOR PAINTING' },
            { item: 'INTERIOR PAINTING' },
            { item: 'DESIGN UPGRADES' },
            { item: 'HIGH RISE PAINTING' },
            { item: 'OTHER' },
          ]);
        } else if (value == 'RESTORATION') {
          callback([
            { item: 'CONCRETE RESTORATION' },
            { item: 'MEMBRANES' },
            { item: 'CAULKING & SEALANT RENEWAL' },
            { item: 'BALCONY RESTORATION' },
            { item: 'OTHER' },
          ]);
        }
      });
    }
  });

  select_quote_child3 = $quote_child3[0].selectize;
  quote_parent3 = $quote_parent3[0].selectize;
  select_quote_child3.disable();
}

})(jQuery);
