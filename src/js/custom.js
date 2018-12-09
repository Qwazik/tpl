$(function(){
  $('.js-select').select2({
    minimumResultsForSearch: -1
  });

  $('.input-download input[type="file"]').change(function(e){
    var string = this.value;
    var fileName = string.substring(string.lastIndexOf('\\')+1, string.length);
    $(this).siblings('.input-download__text').text(fileName);
  });
  /*-- START: mobile nav --*/
  var MOBILE_NAV = (function () {
    $('.mobile-nav-btn').click(function(){
      $(this).toggleClass('active');
      $('.mobile-nav').toggleClass('active');
    });
    var mobileNavClass = 'mobile-nav';
    var menus = [
      '.main-nav',
      '.top-nav'
    ];
    var additionalBlocks = [
      // '.top-search',
      // '#headerPhone'
    ];
    var cnt = $('<div/>');

    for (var j = 0; j < additionalBlocks.length; j++) {
      if ($(additionalBlocks[j]).length) {
        var section = $('<div/>').addClass(mobileNavClass + '__section ' + mobileNavClass + '__section_add' + j);
        section.append($(additionalBlocks[j]).clone());
        cnt.append(section);
      }
    }

    for (var i = 0; i < menus.length; i++) {
      if ($(menus[i]).length) {
        var section = $('<div/>').addClass(mobileNavClass + '__section ' + mobileNavClass + '__section_' + i);
        section.append(getItems(menus[i]));
        cnt.append(section);
      }
    }


    cnt.addClass(mobileNavClass);

    $('body').append(cnt);

    $('.header-mobile-wrap').click(function () {
      $('.' + mobileNavClass).toggleClass('active');
      $(this).toggleClass('active');
    });


    function getItems(selector) {
      var clone = $(selector).clone();
      return clearClasses(clone);
    }

    function clearClasses(element) {
      var depth = 0;
      $(element).removeClass().addClass(mobileNavClass + '__list');
      clear($(element).children());

      function clear(childrens) {
        depth++;
        $(childrens).removeClass();
        $(childrens).each(function () {
          var $this = $(this);
          if ($this.is(':empty')) $(this).remove();
          if ($this.is('li')) $(this).addClass(mobileNavClass + '__item');
          if ($this.is('a')) $(this).addClass(mobileNavClass + '__link');
          if ($this.is('ul') && depth > 0) {
            var dropdownBtn = $('<button/>').addClass(mobileNavClass + '__dropdown-toggler');
            var parentLi = $(this).closest('li');
            dropdownBtn.click(function () {
              $this.toggleClass('active');
            });
            parentLi.append(dropdownBtn);

            $(this).addClass(mobileNavClass + '__dropdown');
            $(parentLi).addClass(mobileNavClass + '__parent');
          };
        });
        if ($(childrens).children().length) clear($(childrens).children());
      }
      return element;
    }
  }());

    /*-- END: mobile nav --*/

  $('.fancybox').fancybox({
    padding: 0,
    smallBtn: false
  });
  $('.modal-close').click(function(){
    $.fancybox.close(true);
  })
	var location = (function(){
    var cnt = '.location';
    if(!$(cnt).length) return false;
    var current = $(cnt).find('[role="current"]');
    var list = $(cnt).find('[role="list"]');
    var items = $(cnt).find('[role="item"]');

    current.click(function(){
      list.toggleClass('active');
      $(cnt).toggleClass('active');
    });

    items.click(function(){
      clickItem(this);
      return false;
    });

    $(document).click(function(e){
      if(!$(e.target).closest(cnt).length) {
      list.removeClass('active');
      $(cnt).removeClass('active');
      }
    });

    function clickItem(element){
      var name = $(element).text().trim();
      var val = $(element).data('val');
      $(element).addClass('active');
      $(element).siblings().removeClass('active');
      $(cnt).removeClass('active');
      current.attr('data-val', val);
      current.find('[role="current-name"]').text(name);
      list.toggleClass('active');
    }
  }());

  /* ---- START: inits ---- */

  
  var homeSlider = new Swiper('.home-slider', {
    pagination: {
      el: '.swiper-pagination'
    },
  });

  var recentSlider = new Swiper('.recent-slider', {
    slidesPerView: 6,
    spaceBetween: 30,
    prevButton: '#recentPrev',
    nextButton: '#recentPrev',
    loop: true,
    breakpoints:{
      1250:{
        slidesPerView: 5,
        spaceBetween: 20
      },
      991:{
        slidesPerView: 4,
        spaceBetween: 3
      },
      575:{
        slidesPerView: 2,
        spaceBetween: 3
      }
    }
  });

  var productSlider = new Swiper('.product-slider', {
    slidesPerView: 4,
    spaceBetween: 30,
    prevButton: '#recentPrev',
    nextButton: '#recentPrev',
    loop: true,
    breakpoints:{
      1250:{
        slidesPerView: 3,
        spaceBetween: 20
      },
      991:{
        slidesPerView: 2,
      },
      575:{
        slidesPerView: 1,
      }
    }
  });

  $('.product-slider, .recent-slider').each(function(){
    var $this = $(this);
    var nav = $(this).data('nav');
    $(nav).children().click(function(){
      if ($(this).is('[role="prev"]')) $this[0].swiper.slidePrev();
      if($(this).is('[role="next"]')) $this[0].swiper.slideNext();
    });
  });


  // START: to tel
  $('.to-tel').each(function(){
    var text = $(this).html();
    var href = $(this).text();
    if(href.match(/^8/)){
      href = 'tel:' + href.replace(/^8/,'+7');
    }else{
      href = 'tel: +'+href.replace(/[^\d]/g, '');
    }
    var classes = this.classList + ' off-link';
    $(this).replaceWith('<a class="' + classes+'" href="'+href+'">'+text+'</a>');
  });
  // END: to tel

  // footer
  (function(){
    var cnt = '.footer-nav';
    $(cnt).each(function(){
      var header = $(this).find('.footer-nav__header');
      var body = $(this).find('.footer-nav__list');
      header.click(function(){
        (body.is(':visible'))?body.fadeOut():body.fadeIn();
      });
    });
  }());
  //footer
  
  //about-vacancy
  $('.about-vacancy-toggler').click(function(){
    $(this).closest('.about-vacancy').find('.about-vacancy__bottom').slideToggle();
    $(this).toggleClass('active');
  });
  //about-vacancy

  /* ----- END: inits ----- */
  
  
  /* ----- Catalog: start ----- */

  (function(){
    $('.js-slider').each(function(){
      var $this = $(this);
      var containerSelector = $this.closest('[role="slider"]');
      var minSelector = containerSelector.find('[role="min"]');
      var maxSelector = containerSelector.find('[role="max"]');
      var rangeSelectors = [minSelector, maxSelector];
      var range = [$this.data('min'), $this.data('max')];
      var start = $this.data('start');
      var slider = noUiSlider.create(this,{
        connect:true,
        step: 1,
        range: {
          min: range[0] || 0,
          max: range[1] || 100000,
        },
        start: start || [0, 1111]
      })

      slider.on('update', function(v,e){
        rangeSelectors[e].val(Math.round(v[e]).toLocaleString());
      });
    });
  }());
  
  /* ----- Catalog: end ----- */

  /* ----- Product: start ----- */
  (function(){
    var photoContainer = $('.product-photo'),
        main = photoContainer.find('.product-photo__main'),
        thumbnails = photoContainer.find('.product-thumbnails');
      thumbnails.children().click(function(){
        $(this).addClass('active').siblings().removeClass('active');
        main.attr('href', $(this).data('big'));
        main.find('img').attr('src', $(this).data('normal'));
      });

      main.click(function(){
        $.fancybox.open(getImages(thumbnails));
        return false;
      });

      function getImages(thumbnails){
        var arrayImages = [];
        thumbnails.children().not('.active').each(function(){
          arrayImages.push({ src: $(this).data('big')});
        });
        arrayImages.unshift({ src: main.attr('href')});
        return arrayImages;
      }
  }());
  /* ----- Product: end ----- */

  $('.catalog-filter__close, .open-catalog-filter').click(function(){
    $('.catalog-filter').toggleClass('active');
  });

  $('.open-catalog-sort').click(function(){
    $('.catalog-sort').toggleClass('active');
    
  });

  $('.js-tabs').each(function(){
    var $this = $(this);
    var nav = $this.find('[role="nav"]');
    var body = $this.find('[role="body"]');
    nav.children().click(function(){
      $(this).addClass('active');
      $(this).siblings().removeClass('active');
      $(body).children().removeClass('active');
      $(body).children().eq($(this).index()).addClass('active');
    });
  });


  $('.c-select').each(function () {
    var $this = $(this),
      name = $this.find('[role="selected"]'),
      close = $this.find('[role="close"]'),
      list = $this.find('[role="list"]'),
      label = $this.data('label'),
      closeTimeout;
    $(label).addClass('pointer');
    $(label).click(openSelect);
    clickItem(null, list.children().eq(0));
    name.click(openSelect);
    close.click(function(){
      if(list.is(':hidden')){
        openSelect();
      }else{
        closeSelect();
      }
    });

    $this.mouseenter(function () {
      clearTimeout(closeTimeout);
    });

    $this.mouseleave(function () {
      clearTimeout(closeTimeout);
      closeTimeout = setTimeout(function () {
        closeSelect();
      }, 500);
    });

    list.children().click(clickItem);

    function clickItem(e, element) {
      var el = element || this;
      $(el).addClass('active');
      $(el).siblings().removeClass('active');
      name.text($(el).text());
      name.attr('data-value', $(el).data('value'));
      closeSelect();
    }

    function openSelect() {
      clearTimeout(closeTimeout);
      $this.addClass('open');
      list.addClass('selectShow').removeClass('selectClose');
      list.show();
    }

    function closeSelect() {
      $this.removeClass('open');
      var animationDuration = parseFloat(list.css('animation-duration'));
      list.addClass('selectClose').removeClass('selectShow');
      setTimeout(function () {
        list.hide();
      }, animationDuration * 1000)
    }
  });
});