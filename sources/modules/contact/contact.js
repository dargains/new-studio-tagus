var ST = ST || {};

ST.CONTACT = (function() {
  return {
    init: function(element, data) {
      var view = this;
      view.el = $(element);
      view.variables();
      view.events();
      //view.insertTextPT();
      view.getClientInfo();
    },
    variables: function() {
      var view = this;
      view.lang = "PT";
      view.clientInfo = {};
      view.form = view.el.find(".contact__form");
      view.formName = view.form.find("#userName");
      view.formEmail = view.form.find("#userEmail");
      view.formMessage = view.form.find("#userMessage");
      view.submitButton = view.form.find("#formSubmit");
      view.titleBlock = view.el.find(".titleBlock");
      view.itemsBlock = view.el.find(".contact__textblock");
      view.messageBlock = view.el.find(".contact__message");
      view.formBlock = view.el.find(".contact__form");
      view.titleTemplate = `
        <div class="left-block">
          <h1 class="left-block__title">{{title}}</h1>
        </div>
        <div class="right-block">
          <h2 class="right-block__text">{{subtitle}}</h2>
        </div>`;
      view.itemsTemplate = `
        {{#each items}}
          <h1 class="contact__title">{{title}}</h1>
          <p class="contact__text">{{text}}</p>
        {{/each}}`;
      view.formTemplate = `
        <form class="contact__form">
          <input type="text" id="userName" name="nome" placeholder="{{name}} *">
          <input type="email" id="userEmail" name="email" placeholder="{{email}} *">
          <textarea name="msg" id="userMessage" placeholder="{{message}}"></textarea>
          <div class="btn-accent">
            <a href="#" id="formSubmit" type="submit">{{submit}}</a>
          </div>
        </form>`;
      view.titlePT = {
        "title": "Contacto",
        "subtitle": "Entre em contacto connosco para que possamos trabalhar juntos."
      };
      view.titleEN = {
        "title": "Contact",
        "subtitle": "Get in touch for us to start working together."
      };
      view.itemsPT = {
        "items": [
          {
            "title": "Fale connosco...",
            "text": "Sinta-se à vontade para nos enviar uma mensagem utilizando o formulário do site ou, se preferir, nos contactar via whatsapp, telemóvel, skype ou e-mail."
          },
          {
            "title": "...sem compromissos",
            "text": "Vamos ajudar-lhe a encontrar a melhor solução."
          }
        ]
      },
      view.itemsEN = {
        "items": [
          {
            "title": "Send us a message...",
            "text": "Feel free to send us a message using the contact form below or, if you wish, you can skype, whatsapp, e-mail or phone us."
          },
          {
            "title": "...without any pressure",
            "text": "We won't try to push you anything, don't you worry. Ask us anything and you will get an answer within 24 hours."
          }
        ]
      }
      view.formPT = {
        "name": "Seu nome",
        "email": "Seu e-mail",
        "message": "Mensagem",
        "submit": "enviar"
      };
      view.formEN = {
        "name": "Your name",
        "email": "Your e-mail",
        "message": "Message",
        "submit": "submit"
      };
      view.succcessMessageTemplate = `
        <p><i class='icon-checked'></i>{{message}}</p>
        `;
      view.errorMessageTemplate = `
        <p><i class='icon-cross'></i>{{message}}</p>
        `;
      view.messageSuccessPT = {
        "message": "A mensagem foi enviada com sucesso. Entraremos em contacto em breve."
      };
      view.messageErrorPT = {
        "message": "A mensagem não foi enviada. Por favor tente novamente."
      };
      view.messageSuccessEN = {
        "message": "The message was sent successfully. We'll contact you back soon."
      };
      view.messageErrorEN = {
        "message": "The message was not sent. Please try again."
      };
    },
    events: function() {
      var view = this;
      view.submitButton.on("click", view.validateForm.bind(view));
      view.el.find("input, textarea").on("input", view.clearErrors);
      $("#en").on("click", view.insertTextEN.bind(view))
      $("#pt").on("click", view.insertTextPT.bind(view))
    },
    insertTextPT: function() {
      var view = this;
      view.lang = "PT";
      view.titleBlock.html(Handlebars.compile(view.titleTemplate)(view.titlePT));
      view.itemsBlock.html(Handlebars.compile(view.itemsTemplate)(view.itemsPT));
      view.formBlock.html(Handlebars.compile(view.formTemplate)(view.formPT));
    },
    insertTextEN: function() {
      var view = this;
      view.lang = "EN";
      view.titleBlock.html(Handlebars.compile(view.titleTemplate)(view.titleEN));
      view.itemsBlock.html(Handlebars.compile(view.itemsTemplate)(view.itemsEN));
      view.formBlock.html(Handlebars.compile(view.formTemplate)(view.formEN));
    },
    getClientInfo: function() {
      var view = this;
      $.get("http://ipinfo.io", function(response) {
          view.clientInfo = response;
      }, "jsonp");
    },
    clearErrors: function(input) {
      $(input.currentTarget).removeClass("error");
    },
    showMessage: function(outcome) {
      var view = this,
          messageTemplate,
          messageType;
      // view.lang === "PT" ?
      // outcome ? ((messageType = view.messageSuccessPT) && (messageTemplate = view.succcessMessageTemplate)) : ((messageType = view.messageErrorPT) && (messageTemplate = view.errorMessageTemplate)) :
      // outcome ? ((messageType = view.messageSuccessEN) && (messageTemplate = view.succcessMessageTemplate)) : ((messageType = view.messageErrorEN) && (messageTemplate = view.errorMessageTemplate));
      // view.messageBlock.html(Handlebars.compile(messageTemplate)(messageType));
      outcome ?
      view.messageBlock.find("p").html(view.messageBlock.data().success).find("i").removeClass("icon-cross").addClass("icon-checked") :
      view.messageBlock.find("p").html(view.messageBlock.data().error).find("i").removeClass("icon-checked").addClass("icon-cross")
    },
    outcome: function(outcome) {
      var view = this;
      view.form.hide();
      view.messageBlock.show("fast")
      view.showMessage(outcome);
      setTimeout(function() {
        view.messageBlock.hide("fast")
        view.form.show()
        view.form.trigger("reset")
      }, 5e3)
    },
    validateForm: function(e) {
      e.preventDefault();
      var view = this,
          formCheck = true,
          name = view.formName.val(),
          email = view.formEmail.val(),
          message = view.formMessage.val(),
          nameRegex = /^([ \u00c0-\u01ffa-zA-Z\-])+$/gm,
          emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          nameCheck = nameRegex.test(name),
          emailCheck = emailRegex.test(email),
          dataString = {
            name: name,
            email: email,
            message: message,
            city: view.clientInfo.city,
            region: view.clientInfo.region,
            country: view.clientInfo.country
          };
      if (name !== "" && nameCheck) view.formName.removeClass("error")
      else {
        view.formName.addClass("error");
        formCheck = false;
      }
      if (email !== "" && emailCheck) view.formEmail.removeClass("error");
      else {
        view.formEmail.addClass("error");
        formCheck = false;
      }
      if (message !== "") view.formMessage.removeClass("error");
      else {
        view.formMessage.addClass("error");
        formCheck = false;
      }
      if (formCheck) view.sendFormData(dataString);
    },
    sendFormData: function(dataString) {
      var view = this;
      view.submitButton.off("click");
      $.ajax({
        type: "POST",
        url: "/scripts/form-handler.php",
        data: dataString,
        success: function(){
          view.outcome(true);
          view.submitButton.on("click", view.validateForm.bind(view));
        },
        error: function() {
          view.outcome(false);
          view.submitButton.on("click", view.validateForm.bind(view));
        }
      });
    }
  }
});
