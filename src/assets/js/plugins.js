// Avoid `console` errors in browsers that lack a console.
(function () {
    
    // ⏰ TIMER HARCODED DE 1 SEGUNDO - Espera o DOM estar pronto
    setTimeout(function() {
        
        var method;
        var noop = function () {};
        var methods = [
            'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
            'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
            'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
            'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
        ];
        var length = methods.length;
        var console = (window.console = window.console || {});

        while (length--) {
            method = methods[length];

            // Only stub undefined methods.
            if (!console[method]) {
                console[method] = noop;
            }
        }

        // ✅ Código do video - Só executa após 1 segundo
        var vid = document.getElementById("cvideo"),
            pauseButton = document.getElementById("vbutton");
            
        if (vid && pauseButton) {
            vid.playbackRate = 0.8;

            function vidFade() {
                vid.classList.add("stopfade");
            }
            
            vid.addEventListener('ended', function () {
                vid.pause();
                vidFade();
            });
            
            pauseButton.addEventListener("click", function () {
                vid.classList.toggle("stopfade");
                if (vid.paused) {
                    vid.play();
                    pauseButton.innerHTML = '<span class="ti-control-pause" ></span>';
                    $('.section-video .section-bg,.section-video-text').addClass("fadeOut animated");
                    $('.section-video .section-bg').animate({
                        'top': '100%'
                    });
                    $('.section-video-text').animate({
                        'top': '100%'
                    });
                } else {
                    vid.pause();
                    pauseButton.innerHTML = '<span class="ti-control-play" ></span>';
                    $('.section-video .section-bg,.section-video-text').removeClass("fadeOut animated");
                    $('.section-video .section-bg').animate({
                        'top': '0%'
                    });
                    $('.section-video-text').animate({
                        'top': '50%'
                    });
                }
            });
            
            vid.addEventListener("click", function () {
                vid.classList.toggle("stopfade");
                if (vid.paused) {
                    vid.play();
                    pauseButton.innerHTML = '<span class="ti-control-pause" ></span>';
                    $('.section-video .section-bg,.section-video-text').addClass("fadeOut animated");
                    $('.section-video .section-bg').animate({
                        'top': '100%'
                    });
                    $('.section-video-text').animate({
                        'top': '100%'
                    });
                } else {
                    vid.pause();
                    pauseButton.innerHTML = '<span class="ti-control-play" ></span>';
                    $('.section-video .section-bg,.section-video-text').removeClass("fadeOut animated");
                    $('.section-video .section-bg').animate({
                        'top': '0%'
                    });
                    $('.section-video-text').animate({
                        'top': '50%'
                    });
                }
            });
        }

        // ✅ Código do parallax - Só executa após 1 segundo
        $(window).scroll(function(){
            // Add parallax scrolling to all images in .paralax-image container
            $('.parallax-image').each(function(){
                // only put top value if the window scroll has gone beyond the top of the image
                if ($(this).offset().top < $(window).scrollTop()) {
                    // Get ammount of pixels the image is above the top of the window
                    var difference = $(window).scrollTop() - $(this).offset().top;
                    // Top value of image is set to half the amount scrolled
                    // (this gives the illusion of the image scrolling slower than the rest of the page)
                    var half = (difference / 2) + 'px';

                    $(this).find('img').css('top', half);
                } else {
                    // if image is below the top of the window set top to 0
                    $(this).find('img').css('top', '0');
                }
            });
        });

        // ✅ Código do menu smooth scroll - Só executa após 1 segundo
        $(function () {
            $('#mainmenu a[href*="#"]:not([href="#"])').click(function () {
                if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                    var target = $(this.hash);
                    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                    if (target.length) {
                        $('html, body').animate({
                            scrollTop: target.offset().top
                        }, 1000);
                        return false;
                    }
                }
            });
        });

        $(".carousel-inner .item:first-child").addClass("active");
        /* Mobile menu click then remove
        ==========================*/
        $(".mainmenu ul.nav.navbar-nav li a").on("click", function () {
            $(".mainmenu .navbar-collapse").removeClass("in");
        });
        /* Scroll to top
        ===================*/
        $.scrollUp({
            scrollText: '<span class="fa-solid fa-up-long"></span>',
            easingType: 'linear',
            scrollSpeed: 900,
            animation: 'fade'
        });

        /*WoW js Active
        =================*/
        new WOW().init({
            mobile: true,
        });
        /* list_screen_slide Active
        =============================*/
        $('.bg-slide').owlCarousel({
            loop: true,
            nav: false,
            margin: 0,
            autoplay: true,
            autoplayTimeout: 4000,
            smartSpeed: 500,
            items: 1,
            animateIn: 'fadeIn',
            animateOut: 'fadeOut'
        });
        /* list_screen_slide Active
        =============================*/
        $('.list_screen_slide').owlCarousel({
            loop: true,
            responsiveClass: true,
            nav: true,
            margin: 5,
            autoplay: true,
            autoplayTimeout: 4000,
            smartSpeed: 500,
            center: true,
            navText: ['<span class="ti-angle-left"></span>', '<span class="ti-angle-right"></span>'],
            responsive: {
                0: {
                    items: 1,
                },
                600: {
                    items: 3
                },
                1200: {
                    items: 5
                }
            }
        });
        
        
        /* single_screen_slide Active
        =============================*/
        var single_screen_slide = $('.single_screen_slide');
        single_screen_slide.owlCarousel({
            loop: true,
            margin: 0,
            dots: true,
            autoplay: true,
            autoplayTimeout: 4000,
            smartSpeed: 1000,
            mouseDrag: true,
            touchDrag: false,
            center: true,
            items: 1,
        });
        //home_text_slide
        var home_text_slide = $('.home_text_slide');
        home_text_slide.owlCarousel({
            loop: true,
            margin: 0,
            dots: true,
            autoplay: true,
            autoplayTimeout: 4000,
            smartSpeed: 1000,
            mouseDrag: true,
            touchDrag: false,
            center: true,
            items: 1,
        });
        $('.home_screen_nav .testi_next').on('click', function () {
            single_screen_slide.trigger('next.owl.carousel');
        });
        $('.home_screen_nav .testi_prev').on('click', function () {
            single_screen_slide.trigger('prev.owl.carousel');
        });

        single_screen_slide.on('translate.owl.carousel', function (property) {
            $('.home_screen_slide_main .owl-dot:eq(' + property.page.index + ')').click();
        });
        home_text_slide.on('translate.owl.carousel', function (property) {
            $('.home_screen_slide .owl-dot:eq(' + property.page.index + ')').click();
        });


        var client_photo2 = $('.client_details');
        client_photo2.owlCarousel({
            loop: true,
            margin: 30,
            autoplay: false,
            dots: true,
            autoplayTimeout: 4000,
            smartSpeed: 600,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 1
                },
                992: {
                    items: 1
                }
            }
        });
        // Book List Slider
        var client_photo = $('.client_photo');
        client_photo.owlCarousel({
            loop: true,
            margin: 30,
            dots: true,
            autoplayTimeout: 4000,
            smartSpeed: 600,
            mouseDrag: true,
            touchDrag: false,
            center: true,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 3
                },
                992: {
                    items: 3
                }
            }
        });
        $('.client_nav .testi_next').on('click', function () {
            client_photo.trigger('next.owl.carousel');
        });
        $('.client_nav .testi_prev').on('click', function () {
            client_photo.trigger('prev.owl.carousel');
        });

        client_photo.on('translate.owl.carousel', function (property) {
            $('.client-details-content .owl-dot:eq(' + property.page.index + ')').click();
        });
        client_photo2.on('translate.owl.carousel', function (property) {
            $('.client-photo-list .owl-dot:eq(' + property.page.index + ')').click();
        });
        /*---------------------------
            MICHIMP INTEGRATION
        -----------------------------*/
        $('#mc-form').ajaxChimp({
            url: 'http://facebook.us14.list-manage.com/subscribe/post?u=b2a3f199e321346f8785d48fb&amp;id=6d023c55e5', //Set Your Mailchamp URL
            callback: function (resp) {
                if (resp.result === 'success') {
                    $('.subscrie-form input, .subscrie-form button').fadeOut();
                }
            }
        });
        $('.price-table').on('mouseenter', function () {
            $('.price-table').removeClass('active');
            $(this).addClass('active');
        });
        $('.price-table').on('mouseleave', function () {
            $('.price-table').removeClass('active');
            $('.price-table.center').addClass('active');
        });

        $('.video-popup').magnificPopup({
            type: 'iframe',
            iframe: {
                markup: '<style>.mfp-iframe-holder .mfp-content {max-width: 900px;height:500px}</style>' +
                    '<div class="mfp-iframe-scaler" >' +
                    '<div class="mfp-close"></div>' +
                    '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
                    '</div></div>'
            }
        });
        /*--------------------
        MAGNIFIC POPUP JS
        ----------------------*/
        $('.work-popup').magnificPopup({
            type: 'image',
            removalDelay: 300,
            mainClass: 'mfp-with-zoom',
            gallery: {
                enabled: true
            },
            zoom: {
                enabled: true, // By default it's false, so don't forget to enable it

                duration: 300, // duration of the effect, in milliseconds
                easing: 'ease-in-out', // CSS transition easing function

                // The "opener" function should return the element from which popup will be zoomed in
                // and to which popup will be scaled down
                // By defailt it looks for an image tag:
                opener: function (openerElement) {
                    // openerElement is the element on which popup was initialized, in this case its <a> tag
                    // you don't need to add "opener" option if this code matches your needs, it's defailt one.
                    return openerElement.is('img') ? openerElement : openerElement.find('img');
                }
            }
        });
        // jQuery Ripples
        if (typeof $.fn.ripples == 'function') {
            try {
                $('.ripple').ripples({
                    resolution: 500,
                    perturbance: 0.04
                });
            } catch (e) {
                $('.error').show().text(e);
            }
        }
        /* Instagram-jQuery */
        jQuery.fn.spectragram.accessData = {
            accessToken: '2136707.4dd19c1.d077b227b0474d80a5665236d2e90fcf',
            clientID: '4dd19c1f5c7745a2bca7b4b3524124d0'
        };

        $('.instagram').spectragram('getUserFeed', {
            query: 'f5sites', //this gets adrianengine's photo feed
            size: 'small',
            max: 9,
        });
        $('.feature-area a').on('mouseenter', function () {
            $(this).tab('show');
        });



        /* Preloader Js
        ===================*/
        $('.preloade').fadeOut(500);
        /* list_screen_slide Active
        =============================*/
        $('.instagram-slide').owlCarousel({
            loop: true,
            responsiveClass: true,
            nav: false,
            margin: 0,
            autoplay: true,
            autoplayTimeout: 4000,
            smartSpeed: 500,
            center: true,
            navText: ['<span class="ti-angle-left"></span>', '<span class="ti-angle-right"></span>'],
            responsive: {
                0: {
                    items: 1,
                },
                600: {
                    items: 3
                },
                1200: {
                    items: 5
                }
            }
        });

        // $(function() {
        //     var RSS_URL = "https://conteudo.franciscomatelli.com.br/cat/f5-sites/feed/";    
        //     fetch(RSS_URL)
        //     .then(response => response.text())
        //     .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
        //     .then(data => {
        //         console.log(data);
        //         const items = data.querySelectorAll("item");//.slice(0, 6);
        //         let html = ``;
        //         $("#products-container").html("");
        //         items.forEach((el, index) => {
        //             if(index>5)
        //                 return;
        //             $("#products-container").append(`

        //             <div class="col-xs-12 col-sm-6 col-md-4 wow fadeInUp" data-wow-delay="0.2s" style="min-height:400px">
        //             <div class="panel text-center single-blog">
        //                 <img src="${el.querySelector("link").innerHTML}/image/large.png" class="img-full" alt="">
        //                 <div class="padding-20">
        //                     <div class="space-10"></div>
        //                     <a href="${el.querySelector("link").innerHTML}"><h3>${el.querySelector("title").innerHTML}</h3></a>
        //                     <div class="space-15"></div>
        //                     <p>${el.querySelector("title").innerHTML}</p>
        //                     <div class="space-20"></div>
        //                 </div>
        //             </div>`);
        //          });

        //     })
        // })
        

    }, 500); // ⏰ 1000ms = 1 segundo

})();