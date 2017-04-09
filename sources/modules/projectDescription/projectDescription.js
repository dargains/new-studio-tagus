var ST = ST || {};

ST.PROJECTDESCRIPTION = (function() {
  return {
    init: function(element, data) {
      var view = this;
      view.el = $(element);
      view.variables();
      view.events();
    },
    variables: function() {
      var view = this;
      view.closeButton = view.el.find(".icon-cross");
    },
    events: function() {
      var view = this;
      view.closeButton.on("click", view.closeScreen.bind(view)); 
    },
    closeScreen: function() {
      var view = this;
      view.el.addClass("hide");
      view.el.find(".projectDescription__slider").slick("unslick").empty();
    }
  }
});
