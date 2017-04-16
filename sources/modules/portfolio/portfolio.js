var ST = ST || {};

ST.PORTFOLIO = (function() {
    return {
        init: function(element, data) {
            var view = this;
            view.el = $(element);
            view.variables();
            view.events();
            //view.insertTextPT();
            view.initMasonry();
            view.initIsoGrid();
            view.startIsoGrid();
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
        <article class="portfolio__project">
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
                "items": [{
                        "title": "Arval Printing Machinery",
                        "subtitle": "Website",
                        "text": "Arval é uma companhia com décadas de experiência no mercado. Este projeto teve como objetivo renovar seu website para um novo e moderno layout, mantendo seu espírito minimalista e direto.",
                        "image": "/images/arval.jpg"
                    },
                    {
                        "title": "Meal Masters",
                        "subtitle": "Concept, Branding, Website",
                        "text": "Mealmasters é um novo conceito de fastfood, onde é possível comer uma refeição rápida e saudável.",
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
                "items": [{
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
        initMasonry: function() {
            var view = this;
            view.itemsBlock.masonry({
                itemSelector: ".portfolio__project"
            });
        },
        onSeeMoreClick: function(e) {
            e.preventDefault();
            var view = this;
            view.getDescription($(e.currentTarget).index());
        },
        getDescription: function(project) {
            var view = this,
                description = {};
            view.lang === "pt" ? (description = view.itemsPT.items[project]) : (description = view.itemsEN.items[project]);
            view.feedDescription(description, project);
        },
        feedDescription: function(description, project) {
            var view = this;
            view.description.find(".projectDescription__title").html(description.title);
            view.description.find(".projectDescription__text").html(description.text);
            for (let i = 0; i < view.images[project].length; i++) {
                view.description.find(".projectDescription__slider").append(`
          <article class="projectDescription__slide" style="background-image:url(${view.images[project][i]})"></article>
        `);
            }
            view.description.find(".projectDescription__slider").slick({
                dots: true,
                infinite: true
            })
            view.description.removeClass("hide");
        },

        initIsoGrid: function() {
            console.log('initiating iso grid');
            'use strict';

            function getComputedTranslateY(obj) {
                if (!window.getComputedStyle) return;
                var style = getComputedStyle(obj),
                    transform = style.transform || style.webkitTransform || style.mozTransform;
                var mat = transform.match(/^matrix3d\((.+)\)$/);
                if (mat) return parseFloat(mat[1].split(', ')[13]);
                mat = transform.match(/^matrix\((.+)\)$/);
                return mat ? parseFloat(mat[1].split(', ')[5]) : 0;
            }

            var lastTime = 0;
            var prefixes = 'webkit moz ms o'.split(' ');
            var requestAnimationFrame = window.requestAnimationFrame;
            var cancelAnimationFrame = window.cancelAnimationFrame;
            var prefix;
            for (var i = 0; i < prefixes.length; i++) {
                if (requestAnimationFrame && cancelAnimationFrame) {
                    break;
                }
                prefix = prefixes[i];
                requestAnimationFrame = requestAnimationFrame || window[prefix + 'RequestAnimationFrame'];
                cancelAnimationFrame = cancelAnimationFrame || window[prefix + 'CancelAnimationFrame'] ||
                    window[prefix + 'CancelRequestAnimationFrame'];
            }

            // fallback to setTimeout and clearTimeout if either request/cancel is not supported
            if (!requestAnimationFrame || !cancelAnimationFrame) {
                requestAnimationFrame = function(callback, element) {
                    var currTime = new Date().getTime();
                    var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                    var id = window.setTimeout(function() {
                        callback(currTime + timeToCall);
                    }, timeToCall);
                    lastTime = currTime + timeToCall;
                    return id;
                };

                cancelAnimationFrame = function(id) {
                    window.clearTimeout(id);
                };
            }
            /**********************************************/
            /** https://gist.github.com/desandro/1866474 **/
            /**********************************************/

            var docElem = window.document.documentElement;

            // some helper functions
            function scrollY() {
                return window.pageYOffset || docElem.scrollTop;
            }

            function extend(a, b) {
                for (var key in b) {
                    if (b.hasOwnProperty(key)) {
                        a[key] = b[key];
                    }
                }
                return a;
            }

            /**
             * Isometric grid obj
             */
            function IsoGrid(el, options) {

                this.isolayerEl = el;

                this.options = extend({}, this.options);
                extend(this.options, options);

                this.gridEl = this.isolayerEl.querySelector('.grid');

                // grid items
                this.gridItems = [].slice.call(this.gridEl.querySelectorAll('.grid__item'));
                this.gridItemsTotal = this.gridItems.length;

                this.didscroll = false;

                this._init();
            }

            IsoGrid.prototype.options = {
                type: 'static',
                perspective: 0,
                transform: '',
                stackItemsAnimation: {
                    properties: function(pos) {
                        return {
                            translateZ: (pos + 1) * 50
                        };
                    },
                    options: function(pos, itemstotal) {
                        return {
                            type: dynamics.bezier,
                            duration: 500,
                            points: [{
                                "x": 0,
                                "y": 0,
                                "cp": [{
                                    "x": 0.2,
                                    "y": 1
                                }]
                            }, {
                                "x": 1,
                                "y": 1,
                                "cp": [{
                                    "x": 0.3,
                                    "y": 1
                                }]
                            }]
                        };
                    }
                },

                onGridLoaded: function() {
                    return false;
                }
            };

            IsoGrid.prototype._init = function() {
                var self = this;

                imagesLoaded(this.gridEl, function() {
                    self.msnry = new Masonry(self.gridEl, {
                        itemSelector: '.grid__item',
                        isFitWidth: true
                    });

                    if (self.options.type === 'scrollable') {
                        self.isolayerEl.style.position = 'absolute';
                    }

                    self.isolayerEl.style.WebkitTransformStyle = self.isolayerEl.style.transformStyle = 'preserve-3d';

                    var transformValue = self.options.perspective != 0 ? 'perspective(' + self.options.perspective + 'px) ' + self.options.transform : self.options.transform;
                    self.isolayerEl.style.WebkitTransform = self.isolayerEl.style.transform = transformValue;

                    // create the div element that will force the height for scrolling
                    if (self.options.type === 'scrollable') {
                        self._createPseudoScroller();
                    }

                    // init/bind events
                    self._initEvents();

                    // effects for loading grid elements:
                    if (self.options.type === 'scrollable') {
                        new AnimOnScroll(self.gridEl, {
                            minDuration: 1,
                            maxDuration: 1.2,
                            viewportFactor: 0
                        });
                    }

                    // grid is "loaded" (all images are loaded)
                    self.options.onGridLoaded();
                    classie.add(self.gridEl, 'grid--loaded');
                });
            };

            /**
             * Creates the div element that will force the height for scrolling
             */
            IsoGrid.prototype._createPseudoScroller = function() {
                // element that will force the height for scrolling
                this.pseudoScrollerEl = document.createElement('div');
                this.pseudoScrollerEl.className = 'pseudo-scroller';
                // insert it inside the main container (same level of isolayerEl)
                this.isolayerEl.parentNode.insertBefore(this.pseudoScrollerEl, this.isolayerEl);
                // set the height of the pseudoScroller (grid´s height + additional space between the top of the rotated isolayerEl and the page - value set for the translation on the Y axis)

                this.pseudoScrollerEl.style.height = (this.gridEl.offsetHeight + getComputedTranslateY(this.isolayerEl))/2 + 'px';

                //this.pseudoScrollerEl.style.height = this.gridEl.offsetHeight + getComputedTranslateY(this.isolayerEl) * Math.sqrt(2) + 'px';
            };

            /**
             * Initialize/Bind events fn.
             */
            IsoGrid.prototype._initEvents = function() {
                var self = this;

                var scrollHandler = function() {
                        requestAnimationFrame(function() {
                            if (!self.didscroll) {
                                self.didscroll = true;
                                self._scrollPage();
                            }
                        });
                    },
                    mouseenterHandler = function(ev) {
                        self._expandSubItems(ev.target);
                    },
                    mouseleaveHandler = function(ev) {
                        self._collapseSubItems(ev.target);
                    };

                if (this.options.type === 'scrollable') {
                    // update the transform (ty) on scroll
                    window.addEventListener('scroll', scrollHandler, false);
                    // on resize (layoutComplete for the masonry instance) recalculate height
                    this.msnry.on('layoutComplete', function(laidOutItems) {
                        // reset the height of the pseudoScroller (grid´s height + additional space between the top of the rotated isolayerEl and the page)

                        self.pseudoScrollerEl.style.height = self.gridEl.offsetHeight + self.isolayerEl.offsetTop * Math.sqrt(2) + 'px';
                        self._scrollPage();
                    });
                }

                this.gridItems.forEach(function(item) {
                    item.addEventListener('mouseenter', mouseenterHandler);
                    item.addEventListener('mouseleave', mouseleaveHandler);
                });
            };

            IsoGrid.prototype._expandSubItems = function(item) {
                var self = this,
                    itemLink = item.querySelector('a'),
                    subItems = [].slice.call(itemLink.querySelectorAll('.layer')),
                    subItemsTotal = subItems.length;

                itemLink.style.zIndex = item.style.zIndex = this.gridItemsTotal;

                subItems.forEach(function(subitem, pos) {
                    dynamics.stop(subitem);
                    dynamics.animate(subitem, self.options.stackItemsAnimation.properties(pos), self.options.stackItemsAnimation.options(pos, subItemsTotal));
                });
            };

            IsoGrid.prototype._collapseSubItems = function(item) {
                var itemLink = item.querySelector('a');
                [].slice.call(itemLink.querySelectorAll('.layer')).forEach(function(subitem, pos) {
                    dynamics.stop(subitem);
                    dynamics.animate(subitem, {
                        translateZ: 0 // enough to reset any transform value previously set
                    }, {
                        duration: 100,
                        complete: function() {
                            itemLink.style.zIndex = item.style.zIndex = 1;
                        }
                    })
                });
            };

            IsoGrid.prototype._scrollPage = function() {
                this.gridEl.style.WebkitTransform = this.gridEl.style.transform = 'translate3d(0,-' + scrollY() + 'px,0)';
                this.didscroll = false;
            };

            window.IsoGrid = IsoGrid;
        },

        startIsoGrid: function() {
            function getRandomInt(min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }

            [].slice.call(document.querySelectorAll('.isolayer')).forEach(function(el) {
                new IsoGrid(el, {
                    type: 'scrollable',
                    transform: 'translateX(-50%) translateY(775px) rotateX(45deg) rotateZ(45deg)',
                    stackItemsAnimation: {
                        properties: function(pos) {
                            return {
                                translateZ: (pos + 1) * 50,
                                rotateZ: getRandomInt(-3, 3)
                            };
                        },
                        options: function(pos, itemstotal) {
                            return {
                                type: dynamics.bezier,
                                duration: 500,
                                points: [{
                                    "x": 0,
                                    "y": 0,
                                    "cp": [{
                                        "x": 0.2,
                                        "y": 1
                                    }]
                                }, {
                                    "x": 1,
                                    "y": 1,
                                    "cp": [{
                                        "x": 0.3,
                                        "y": 1
                                    }]
                                }],
                                //delay: (itemstotal-pos-1)*40
                            };
                        }
                    },
                    onGridLoaded: function() {
                        classie.add(document.body, 'grid-loaded');
                    }
                });
            });
        }
    }

});
