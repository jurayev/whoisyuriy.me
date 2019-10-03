(function () {

    "use strict";

    // ScrollReveal animations

    sr.reveal('.anim-main-page', { distance: 0, duration: 1500, delay: 2000, scale: 0.9});

    sr.reveal('.anim-main-content-js', { distance: '50vh', duration: 1000, viewFactor: 0.5 });
    sr.reveal('.anim-initial-content-js', { origin: 'top', distance: '10vw', duration: 700, scale: 0.9, viewFactor: 0.3 });

    sr.reveal('.anim-link-icons-js', { distance: 0, duration: 1000, scale: 2 }, 500);

    sr.reveal('.anim-card-top-js', { origin: 'top', distance: '15vw', duration: 800, viewFactor: 0.7 });
    sr.reveal('.anim-card-right-js', { origin: 'right', distance: '8vw', duration: 800, delay: 800, viewFactor: 0.7 });
    sr.reveal('.anim-card-left-js', { origin: 'left', distance: '15vw', duration: 800, viewFactor: 0.7 });
    sr.reveal('.anim-card-bottom-js', { origin: 'bottom', distance: '15vw', duration: 800, delay: 800, viewFactor: 0.7 });

    sr.reveal('.anim-article-right-js', { origin: 'right', distance: '6vw', duration: 800, delay: 500, viewFactor: 0.1 });
    sr.reveal('.anim-article-left-js', { origin: 'left', distance: '15vw', duration: 800, delay: 500, viewFactor: 0.1 });

    sr.reveal('.anim-progressbar-js', { origin: 'left', distance: '30vw', duration: 800, delay: 500, viewFactor: 0.9 });

})(jQuery);

