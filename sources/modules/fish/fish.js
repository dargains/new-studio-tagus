var ST = ST || {};

ST.FISH = (function() {

  return {

    init: function(element, data) {
      var view = this;
      view.el = $(element);
      view.variables();
      view.events();
      view.initControllers();
      view.initAnimations();
    },

    variables: function() {
      var view = this;
      view.triggerFish1 = "#triggerFish1";
      view.fish1 = document.getElementById("#fish1");
      view.flightpath = {
  			entry : {
  				curviness: 1.25,
  				autoRotate: true,
  				values: [
  						{x: 100,	y: -20},
  						{x: 300,	y: 10}
  					]
  			},
  			looping : {
  				curviness: 1.25,
  				autoRotate: true,
  				values: [
  						{x: 510,	y: 60},
  						{x: 620,	y: -60},
  						{x: 500,	y: -100},
  						{x: 380,	y: 20},
  						{x: 500,	y: 60},
  						{x: 580,	y: 20},
  						{x: 620,	y: 15}
  					]
  			},
  			leave : {
  				curviness: 1.25,
  				autoRotate: true,
  				values: [
  						{x: 660,	y: 20},
  						{x: 800,	y: 130},
  						{x: $(window).width() + 300,	y: -100}
  					]
  			}
      }
    },
    events: function() {
      var view = this;

    },
    initControllers: function() {
      var view = this;
      view.controllerFish1 = new ScrollMagic.Controller();
    },
    initAnimations: function() {
      var view = this;
      var tween = new TimelineMax()
      			.add(TweenMax.to($("#fish1"), 1.2, {css:{bezier:view.flightpath.entry}, ease:Power1.easeInOut}))
      			.add(TweenMax.to($("#fish1"), 2, {css:{bezier:view.flightpath.looping}, ease:Power1.easeInOut}))
      			.add(TweenMax.to($("#fish1"), 1, {css:{bezier:view.flightpath.leave}, ease:Power1.easeInOut}));

  		// build scene
  		var scene = new ScrollMagic.Scene({triggerElement: view.triggerFish1, duration: 800, offset: 100})
  						.setPin("#fish1")
  						.setTween(tween)
  						.addIndicators() // add indicators (requires plugin)
  						.addTo(view.controllerFish1);
    }
  }

});
