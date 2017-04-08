var ST = ST || {};

ST.PLANES = (function() {

  return {

    init: function(element, data) {
      var view = this;
      view.el = $(element);
      view.getTriggers();
      view.initAnimation();
    },

    getTriggers: function() {
      var view = this;
      view.triggerPlane1 = document.getElementById('triggerPlane1');
      view.triggerPlane2 = document.getElementById('triggerPlane2');
      view.triggerPlane3 = document.getElementById('triggerPlane3');
    },
    initAnimation: function() {
      var view = this;
      var controller = new ScrollMagic.Controller();
      var plane1 = TweenMax.to("#plane1", 0.5, {x:2600, y:800, scale:5})
      var plane1Scene = new ScrollMagic.Scene({triggerElement: view.triggerPlane1, duration: "200%"})
					.setTween(plane1)
          .on("enter",function(){
            document.getElementById("title1").style.opacity = 1;
            document.getElementById("text1").style.opacity = 1;
          })
					.addIndicators({name: "plane1"})
					.addTo(controller);
      var plane2Scene = new ScrollMagic.Scene({triggerElement: view.triggerPlane2, duration: "200%"})
					.setTween("#plane2", {x: -2600, y: 800, scale: 5})
          .on("enter",function(){
            document.getElementById("title2").style.opacity = 1;
            document.getElementById("text2").style.opacity = 1;
          })
					.addIndicators({name: "plane2"})
					.addTo(controller);
      var plane3Scene = new ScrollMagic.Scene({triggerElement: view.triggerPlane3, duration: "200%"})
					.setTween("#plane3", {x: 2600, y: 800, scale: 5})
          .on("enter",function(){
            document.getElementById("title3").style.opacity = 1;
            document.getElementById("text3").style.opacity = 1;
          })
					.addIndicators({name: "plane3"})
					.addTo(controller);
    }
  }

});
