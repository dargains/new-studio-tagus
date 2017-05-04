var ST = ST || {};

ST.HERO = (function() {

  return {

    init: function(element, data) {
      var view = this;
      view.el = $(element);
      view.triggers();
      view.initAnimation();
      view.el.find("#tagus").show();
      view.initScroll();
    },

    triggers: function() {
      var view = this;
      view.triggerHero = document.getElementById('triggerHero');
      view.triggerMask = document.getElementById('triggerMask');
    },
    initAnimation: function() {
      var view = this;
      var controllerHero = new ScrollMagic.Controller({
        globalSceneOptions: {
          triggerHook: "onEnter",
          duration: "200%"
        }
      });
      var controllerMask = new ScrollMagic.Controller();
      new ScrollMagic.Scene({triggerElement: view.triggerHero})
					.setTween("#triggerHero > article", {y: "80%", ease: Linear.easeNone})
					.addTo(controllerHero);
      new ScrollMagic.Scene({triggerElement: view.triggerMask, duration: 800})
          .setTween("#darkmask", {opacity: 1, y:-200})
          //.addIndicators({name: "mask"})
					.addTo(controllerMask);
    },
    initScroll: function() {
      if (window.addEventListener) window.addEventListener('DOMMouseScroll', wheel, false);
      window.onmousewheel = document.onmousewheel = wheel;

      function wheel(event) {
        var delta = 0;
        event.wheelDelta ? (delta = event.wheelDelta / 120) :
        event.detail && (delta = -event.detail / 3);

        handle(delta);
        if (event.preventDefault) event.preventDefault();
        event.returnValue = false;
      }

      var goUp = true;
      var end = null;
      var interval = null;

      function handle(delta) {
        var animationInterval = 10; //lower is faster
        var scrollSpeed = 10; //lower is faster

        if (end == null) {
        end = $(window).scrollTop();
        }
        end -= 20 * delta;
        goUp = delta > 0;

        if (interval == null) {
        interval = setInterval(function() {
        var scrollTop = $(window).scrollTop();
        var step = Math.round((end - scrollTop) / scrollSpeed);
        if (scrollTop <= 0 ||
        scrollTop >= $(window).prop("scrollHeight") - $(window).height() ||
        goUp && step > -1 ||
        !goUp && step < 1) {
        clearInterval(interval);
        interval = null;
        end = null;
        }
        $(window).scrollTop(scrollTop + step);
        }, animationInterval);
        }
      }
    }
  }

});
