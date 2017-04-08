var ST = ST || {};

ST.HERO = (function() {

  return {

    init: function(element, data) {
      var view = this;
      view.el = $(element);
      view.triggers();
      view.initAnimation();
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
    }
  }

});
