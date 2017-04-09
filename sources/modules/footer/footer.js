var ST = ST || {};

ST.FOOTER = (function() {

  return {

    init: function(element, data) {
      var view = this;
      view.el = $(element);
      view.variables();
      view.events();
      //view.insertTextPT();
    },

    variables: function() {
      var view = this;
      view.itemsBlock = view.el.find(".footer__textbox");
      view.itemsTemplate = `
        <p class="animated ">{{firstPart}}</p>
        <div class="heart click-heart"></div>
        <p class="animated ">{{secondPart}}</p>`;
      view.itemsPT = {
        "firstPart": "Feito com",
        "secondPart": "por Studio Tagus"
      }
      view.itemsEN = {
        "firstPart": "Made with",
        "secondPart": "by Studio Tagus"
      }
    },
    events: function() {
      var view= this;
      $("#en").on("click", view.insertTextEN.bind(view))
      $("#pt").on("click", view.insertTextPT.bind(view))
    },
    insertTextPT: function() {
      var view = this;
      view.itemsBlock.html(Handlebars.compile(view.itemsTemplate)(view.itemsPT));
    },
    insertTextEN: function() {
      var view = this;
      view.itemsBlock.html(Handlebars.compile(view.itemsTemplate)(view.itemsEN));
    }
  }

});
