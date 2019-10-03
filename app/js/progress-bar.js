const ProgressBar = require('progressbar.js');

(function () {

    "use strict";

    sr.reveal('.progressbar', { afterReveal: addDynamicProgressBar});

    function getRandomColor() {
        const colors = ['#ff7e09', '#ec5453', '#4054b2', '#f9bf3f', '#2fa499'];
        const colorIndex = Math.floor(Math.random() * 5);
        return colors[colorIndex];
    }

    function createBar(container, score) {
        const bar = new ProgressBar.Line(container, {
            strokeWidth: 4,
            easing: 'easeInOut',
            duration: 3000,
            color: getRandomColor(),
            trailColor: '#ffffff',
            trailWidth: 4,
            svgStyle: {width: '100%', height: '100%'},
            text: {
                style: {
                    color: '#ffffff',
                    position: 'absolute',
                    right: '0',
                    top: '-25px',
                    padding: 0,
                    margin: 0,
                    transform: null
                },
                autoStyleContainer: false
            },
            from: {color: '#FFEA82'},
            to: {color: '#ED6A5A'},
            step: (state, bar) => {
                bar.setText(Math.round(bar.value() * 100) + ' %');
            }
        });

        bar.animate(score);
    }

    let progressBarId = 1;

    function addDynamicProgressBar(el) {
        el.setAttribute('id', `progressbar-${progressBarId}`);
        const score = el.getAttribute('data-score').valueOf();
        createBar(`#progressbar-${progressBarId}`, score);
        progressBarId++;
    }

})(jQuery);