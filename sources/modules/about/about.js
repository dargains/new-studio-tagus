var ST = ST || {};

ST.ABOUT = (function() {

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
      view.titleBlock = view.el.find(".titleBlock");
      view.itemsBlock = view.el.find(".pros");
      view.titleTemplate = `
        <div class="left-block">
          <h1 class="left-block__title">{{title}}</h1>
        </div>
        <div class="right-block">
          <h2 class="right-block__text">{{subtitle}}</h2>
        </div>`;
      view.itemsTemplate = `
        {{#each items}}
        <article>
          <i class="{{icon}}"></i>
          <h1>{{title}}</h1>
          <p>{{text}}</p>
        </article>
        {{/each}}`;
      view.titlePT = {
        "title": "Sobre nós",
        "subtitle": "Somos uma equipa de webdevelopers baseados em Lisboa, Portugal. Nós nos orgulhamos em entregar websites de qualidade com eficiência e profissionalismo."
      };
      view.titleEN = {
        "title": "About us",
        "subtitle": "We are a team of web developers located in Lisbon, Portugal. We are proud to deliver high quality websites with professionalism and efficiency."
      };
      view.itemsPT = {
        "items": [
          {
            "title": "Transparência",
            "text": "Nada de surpresas. Acompanhe de perto a construção do seu projeto e apresente feedback durante o desenvolvimento.",
            "icon": "icon-diamond"
          },
          {
            "title": "Compromisso",
            "text": "Se pode sonhar, podemos construir. Para o Studio Tagus a satisfação total do nosso cliente é o maior compromisso.",
            "icon": "icon-checked"
          },
          {
            "title": "Pontualidade",
            "text": "Sem dores de cabeça! Seu projeto será terminado dentro do prazo determinado e com a qualidade expectada.",
            "icon": "icon-calendar"
          },
          {
            "title": "Paixão",
            "text": "Acima de tudo, trabalhamos por amor à nossa profissão. Por isso temos total dedicação ao que fazemos e imenso respeito por nossos clientes.",
            "icon": "icon-heart"
          }
        ]
      }
      view.itemsEN = {
        "items": [
          {
            "title": "Transparency",
            "text": "No surprises. We will be keeping you on track throughout the whole development phase and constantly looking forward for your feedback on whether it suits your expectations.",
            "icon": "icon-diamond"
          },
          {
            "title": "Commitment",
            "text": "If you can dream it, we can build it. For Studio Tagus our customer's satisfaction is our biggest committal.",
            "icon": "icon-checked"
          },
          {
            "title": "Ponctuality",
            "text": "No headaches! Your project will be done within the given deadline and with the expected quality.",
            "icon": "icon-calendar"
          },
          {
            "title": "Passion",
            "text": "Above all, we love what we do. Because of that we wholeheartedly dedicate ourselves to our work and have great respect for our customers.",
            "icon": "icon-heart"
          }
        ]
      }
    },
    events: function() {
      var view= this;
      $("#en").on("click", view.insertTextEN.bind(view))
      $("#pt").on("click", view.insertTextPT.bind(view))
    },
    insertTextPT: function() {
      var view = this;
      view.titleBlock.html(Handlebars.compile(view.titleTemplate)(view.titlePT));
      view.itemsBlock.html(Handlebars.compile(view.itemsTemplate)(view.itemsPT));
    },
    insertTextEN: function() {
      var view = this;
      view.titleBlock.html(Handlebars.compile(view.titleTemplate)(view.titleEN));
      view.itemsBlock.html(Handlebars.compile(view.itemsTemplate)(view.itemsEN));
    }
  }

});
