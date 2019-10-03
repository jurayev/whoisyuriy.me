const circleOne = anime ({
    targets: ['.circle-1'],
    translateY: -22,
    translateX: 44,
    direction: 'alternate',
    loop: true,
    elasticity: 400,
    easing: 'easeInOutElastic',
    duration: 500,
    delay: 100,
});

const circleTwo = anime ({
    targets: ['.circle-2'],
    translateY: 22,
    direction: 'alternate',
    loop: true,
    elasticity: 400,
    easing: 'easeInOutElastic',
    duration: 500,
    delay: 100,
});

const circleThree = anime ({
    targets: ['.circle-3'],
    translateY: -22,
    direction: 'alternate',
    loop: true,
    elasticity: 400,
    easing: 'easeInOutElastic',
    duration: 500,
    delay: 100,
});

const circleFour = anime ({
    targets: ['.circle-4'],
    translateY: 22,
    translateX: -44,
    direction: 'alternate',
    loop: true,
    elasticity: 400,
    easing: 'easeInOutElastic',
    duration: 500,
    delay: 100,
});

(function($) {

    "use strict";

    // activates preloader
    $(window).on('load', function () {

        $('body').scrollspy('refresh');

        // disable scrolling while preloader is active
        disable_scroll();

        setTimeout(function() {
            //enable scrolling back
            enable_scroll();
            $('#preloader').fadeOut('fast', function () {});
            $('#overlay').fadeOut('slow', function () {});
        }, 2000);

        function disable_scroll() {
            document.body.style.overflow="hidden";
        }

        function enable_scroll() {
            document.body.style.overflow="initial";
        }
    });

})(jQuery);