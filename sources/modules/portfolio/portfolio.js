var ST = ST || {};

ST.PORTFOLIO = (function() {
  return {
    init: function(element, data) {
      var view = this;
      view.el = $(element);
      view.variables();
      view.events();
      view.insertTextPT();
      view.initMasonry();
    },
    variables: function() {
      var view = this;
      view.description = $(".projectDescription");
      view.lang = "pt";
      view.titleBlock = view.el.find(".titleBlock");
      view.itemsBlock = view.el.find(".portfolio__projects");
      view.titleTemplate = `
        <div class="left-block">
          <h1 class="left-block__title">{{title}}</h1>
        </div>
        <div class="right-block">
          <h2 class="right-block__text">{{subtitle}}</h2>
        </div>`;
      view.titlePT = {
        "title": "Projetos",
        "subtitle": "Nós trabalhamos com clientes nacionais e internacionais, entregando soluções construidas com criatividade e tecnologia de ponta. Aqui está apenas alguns dos nossos projetos mais recentes."
      };
      view.titleEN = {
        "title": "Projects",
        "subtitle": "We work with clients all over the globe, delivering creative and high quality solutions with the latest technology. Here are just a few of our most recent projects."
      };
      view.itemsTemplate = `
        {{#each items}}
        <article class="portfolio__project" data-project="{{name}}">
          <div class="portfolio__mask" style="background-image:url({{image}})"></div>
          <div class="portfolio__textbox">
            <h1 class="portfolio__title">{{title}}</h1>
            <div class="portfolio__line"></div>
            <p class="portfolio__text">{{subtitle}}</p>
          </div>
        </article>
        {{/each}}`;
      view.images = [
        [
          "/images/arval/arval-mock-desktop.jpg",
          "/images/arval/arval-mock-laptop.jpg",
          "/images/arval/arval-mock-tablet.jpg",
          "/images/arval/arval-mock-mobile.jpg"
        ],
        [
          "/images/mealmasters/mealmasters-mock-desktop.jpg",
          "/images/mealmasters/mealmasters-mock-laptop.jpg",
          "/images/mealmasters/mealmasters-mock-tablet.jpg",
          "/images/mealmasters/mealmasters-mock-mobile.jpg"
        ],
        [
          "/images/hazyshade/hazyshade-mock-desktop.jpg",
          "/images/hazyshade/hazyshade-mock-laptop.jpg",
          "/images/hazyshade/hazyshade-mock-tablet.jpg",
          "/images/hazyshade/hazyshade-mock-mobile.jpg"
        ],
        [
          "/images/megalancers/megalancers-mock-desktop.jpg",
          "/images/megalancers/megalancers-mock-laptop.jpg",
          "/images/megalancers/megalancers-mock-tablet.jpg",
          "/images/megalancers/megalancers-mock-mobile.jpg"
        ],
        [
          "/images/foxlife/foxlife-mock-desktop.jpg",
          "/images/foxlife/foxlife-mock-laptop.jpg",
          "/images/foxlife/foxlife-mock-tablet.jpg",
          "/images/foxlife/foxlife-mock-mobile.jpg"
        ]
      ]
      view.itemsPT = {
        "items": [
          {
            "title": "Arval Printing Machinery",
            "subtitle": "Website",
            "text": "Arval é uma companhia com décadas de experiência no mercado. Este projeto teve como objetivo renovar seu website para um novo e moderno layout, mantendo seu espírito minimalista e direto.",
            "image": "/images/arval.jpg"
          },
          {
            "title": "Meal Masters",
            "subtitle": "Concept, Branding, Website",
            "text": "Se pode sonhar, podemos construir. Para o Studio Tagus a satisfação total do nosso cliente é o maior compromisso.",
            "image": "/images/mealmasters.jpg"
          },
          {
            "title": "Hazy Shade of Spring",
            "subtitle": "Website",
            "text": "Sem dores de cabeça! Seu projeto será terminado dentro do prazo determinado e com a qualidade expectada.",
            "image": "/images/hazyshade.jpg"
          },
          {
            "title": "Megalancers",
            "subtitle": "Website",
            "text": "Megalancers é um mercado para os fãs se conectarem com influenciadores como artistas, blogueiros e celebridades. Neste ambiente é possível navegue através de atividades e perfis, e contratar seu influenciadores como freelancers.",
            "image": "/images/megalancers.jpg"
          },
          {
            "title": "Fox Life",
            "subtitle": "Concept, Branding, Website",
            "text": "Fox Life é um canal pago de entretenimento para toda a família e veio completar o já extenso portfolio de canais FOX. A sua programação é constituída por grandes séries internacionais.",
            "image": "/images/foxlife.jpg"
          }
        ]
      };
      view.itemsEN = {
        "items": [
          {
            "title": "Arval Printing Machinery",
            "subtitle": "Website",
            "text": "Arval is a company with decades on the market. We were contacted by them to upgrade their website to a newer and modern layout, yet minimalist and direct.",
            "image": "/images/arval.jpg"
          },
          {
            "title": "Meal Masters",
            "subtitle": "Concept, Branding, Website",
            "text": "In this project we had the main objective to direct customers from a website to a mobile app. The whole site was built with this in mind.",
            "image": "/images/mealmasters.jpg"
          },
          {
            "title": "Hazy Shade of Spring",
            "subtitle": "Website",
            "text": "A simple yet complete e-commerce site for a clothes company. Built for all devices and screen sizes.",
            "image": "/images/hazyshade.jpg"
          },
          {
            "title": "Megalancers",
            "subtitle": "Website",
            "text": "Megalancers is a maketplace for fans to connect with Influencers like artists, bloggers and celebrities. Browse through activities and profiles, and hire your influencer!",
            "image": "icon-heart"
          },
          {
            "title": "Fox Life",
            "subtitle": "Concept, Branding, Website",
            "text": "Fox Life is a television network, launched by the Fox Broadcasting Company, which airs across Latin America, Europe and Japan. Its basic programming include numerous television series, sitcoms and movies, among others, which includes some original programming in certain regions.",
            "image": "icon-heart"
          }
        ]
      };
    },
    events: function() {
      var view = this;
      view.el.find(".portfolio__projects").on("click", ".portfolio__project", view.onSeeMoreClick.bind(view));
      $("#en").on("click", view.insertTextEN.bind(view))
      $("#pt").on("click", view.insertTextPT.bind(view))
    },
    insertTextPT: function() {
      var view = this;
      view.titleBlock.html(Handlebars.compile(view.titleTemplate)(view.titlePT));
      view.itemsBlock.html(Handlebars.compile(view.itemsTemplate)(view.itemsPT));
      view.lang = "pt";
    },
    insertTextEN: function() {
      var view = this;
      view.titleBlock.html(Handlebars.compile(view.titleTemplate)(view.titleEN));
      view.itemsBlock.html(Handlebars.compile(view.itemsTemplate)(view.itemsEN));
      view.lang = "en";
    },
    initMasonry: function(){
      var view = this;
      //view.itemsBlock.imagesLoaded(function() {
        view.itemsBlock.masonry({
          itemSelector: ".portfolio__project"
        });
      //})
    },
    onSeeMoreClick: function(e) {
      e.preventDefault();
      var view = this;
      view.feedDescription($(e.currentTarget).index());
    },
    feedDescription: function(project) {
      var view = this,
          description = {};
      view.lang === "pt" ? (description = view.itemsPT.items[project]) : (description = view.itemsEN.items[project]);
      view.openDescription(description, project);
    },
    openDescription: function(description, project) {
      var view = this;
      view.description.find(".projectDescription__title").html(description.title);
      view.description.find(".projectDescription__text").html(description.text);
      for(let i = 0; i < view.images[project].length; i++) {
        view.description.find(".projectDescription__slider").append(`
          <article class="projectDescription__slide" style="background-image:url(${view.images[project][i]})"></article>
        `);
      }
      view.description.find(".projectDescription__slider").slick({
        dots: true,
        infinite: true
      })
      view.description.removeClass("hide");
    }
  }

});
