(function ($) {

    // Star icons magic
    $('td[data-score]').html(function () {
        const score = Number($(this).attr('data-score'));
        const maxScore = Number($(this).attr('data-max-score'));
        const fullStars = Math.floor(score);
        const halfStar = score !== fullStars;
        const emptyStars = maxScore - Math.ceil(score);

        return (
            new Array(fullStars + 1).join('<i class="fas fa-star anim-stars-js"></i>') +
            (halfStar ? '<i class="fas fa-star-half-alt anim-stars-js"></i>' : '') +
            new Array(emptyStars + 1).join('<i class="far fa-star anim-stars-js"></i>')
        );
    });

    // ScrollReveal animations

    sr.reveal('.anim-main-page', { distance: 0, duration: 1500, delay: 2000, scale: 0.9});

    sr.reveal('.anim-main-content-js', { distance: '50vh', duration: 1000, viewFactor: 0.5 });
    sr.reveal('.anim-initial-content-js', { origin: 'top', distance: '10vw', duration: 700, scale: 0.9, viewFactor: 0.3 });

    sr.reveal('.anim-stars-js', { origin: 'top', distance: '5vw', duration: 700, delay: 1500, scale: 0.9 }, 70);
    sr.reveal('.anim-link-icons-js', { distance: 0, duration: 1000, scale: 2 }, 500);

    sr.reveal('.anim-card-top-js', { origin: 'top', distance: '15vw', duration: 800, viewFactor: 0.7 });
    sr.reveal('.anim-card-right-js', { origin: 'right', distance: '8vw', duration: 800, delay: 800, viewFactor: 0.7 });
    sr.reveal('.anim-card-left-js', { origin: 'left', distance: '15vw', duration: 800, viewFactor: 0.7 });
    sr.reveal('.anim-card-bottom-js', { origin: 'bottom', distance: '15vw', duration: 800, delay: 800, viewFactor: 0.7 });

    sr.reveal('.anim-article-right-js', { origin: 'right', distance: '7vw', duration: 800, delay: 500, viewFactor: 0.1 });
    sr.reveal('.anim-article-left-js', { origin: 'left', distance: '15vw', duration: 800, delay: 500, viewFactor: 0.1 });

})(jQuery);
