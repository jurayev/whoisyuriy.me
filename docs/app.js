(function() {
  'use strict';

  var globals = typeof global === 'undefined' ? self : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = {}.hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (bundle && typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = typeof window === 'undefined' ? this : window;
var process;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("index.js", function(exports, require, module) {
'use strict';

require('bootstrap');

require('jquery');

require('jquery.easing');

require('js/typewriter');

require('js/particles');

require('js/scrolling');

require('js/animation');

require('js/preloader');
});

;require.register("js/animation.js", function(exports, require, module) {
'use strict';

(function ($) {

    // Star icons magic
    $('td[data-score]').html(function () {
        var score = Number($(this).attr('data-score'));
        var maxScore = Number($(this).attr('data-max-score'));
        var fullStars = Math.floor(score);
        var halfStar = score !== fullStars;
        var emptyStars = maxScore - Math.ceil(score);

        return new Array(fullStars + 1).join('<i class="fas fa-star anim-stars-js"></i>') + (halfStar ? '<i class="fas fa-star-half-alt anim-stars-js"></i>' : '') + new Array(emptyStars + 1).join('<i class="far fa-star anim-stars-js"></i>');
    });

    // ScrollReveal animations

    sr.reveal('.anim-main-page', { distance: 0, duration: 1500, delay: 2000, scale: 0.9 });

    sr.reveal('.anim-main-content-js', { distance: '50vh', duration: 1000, viewFactor: 0.5 });
    sr.reveal('.anim-initial-content-js', { origin: 'top', distance: '10vw', duration: 700, scale: 0.9, viewFactor: 0.3 });

    sr.reveal('.anim-stars-js', { origin: 'top', distance: '5vw', duration: 700, delay: 1500, scale: 0.9 }, 70);
    sr.reveal('.anim-link-icons-js', { distance: 0, duration: 1000, scale: 2 }, 500);

    sr.reveal('.anim-card-top-js', { origin: 'top', distance: '15vw', duration: 800, viewFactor: 0.7 });
    sr.reveal('.anim-card-right-js', { origin: 'right', distance: '8vw', duration: 800, delay: 800, viewFactor: 0.7 });
    sr.reveal('.anim-card-left-js', { origin: 'left', distance: '15vw', duration: 800, viewFactor: 0.7 });
    sr.reveal('.anim-card-bottom-js', { origin: 'bottom', distance: '15vw', duration: 800, delay: 800, viewFactor: 0.7 });

    sr.reveal('.anim-article-right-js', { origin: 'right', distance: '6vw', duration: 800, delay: 500, viewFactor: 0.1 });
    sr.reveal('.anim-article-left-js', { origin: 'left', distance: '15vw', duration: 800, delay: 500, viewFactor: 0.1 });
})(jQuery);
});

require.register("js/particles.js", function(exports, require, module) {
"use strict";

/* ---- particles.js config ---- */
particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 60,
      "density": {
        "enable": true,
        "value_area": 700
      }
    },
    "color": {
      "value": "#390b48"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#390b48"
      },
      "polygon": {
        "nb_sides": 5
      }
    },
    "opacity": {
      "value": 0.8,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#390b48",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 6,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "grab"
      },
      "onclick": {
        "enable": false,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 140,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
});
});

require.register("js/preloader.js", function(exports, require, module) {
'use strict';

var circleOne = anime({
    targets: ['.circle-1'],
    translateY: -22,
    translateX: 44,
    direction: 'alternate',
    loop: true,
    elasticity: 400,
    easing: 'easeInOutElastic',
    duration: 500,
    delay: 100
});

var circleTwo = anime({
    targets: ['.circle-2'],
    translateY: 22,
    direction: 'alternate',
    loop: true,
    elasticity: 400,
    easing: 'easeInOutElastic',
    duration: 500,
    delay: 100
});

var circleThree = anime({
    targets: ['.circle-3'],
    translateY: -22,
    direction: 'alternate',
    loop: true,
    elasticity: 400,
    easing: 'easeInOutElastic',
    duration: 500,
    delay: 100
});

var circleFour = anime({
    targets: ['.circle-4'],
    translateY: 22,
    translateX: -44,
    direction: 'alternate',
    loop: true,
    elasticity: 400,
    easing: 'easeInOutElastic',
    duration: 500,
    delay: 100
});

(function ($) {

    // activates preloader
    $(window).on('load', function () {

        $('body').scrollspy('refresh');

        // disable scrolling while preloader is active
        disable_scroll();

        setTimeout(function () {
            //enable scrolling back
            enable_scroll();
            $('#preloader').fadeOut('fast', function () {});
            $('#overlay').fadeOut('slow', function () {});
        }, 2000);

        function disable_scroll() {
            document.body.style.overflow = "hidden";
        }

        function enable_scroll() {
            document.body.style.overflow = "initial";
        }
    });
})(jQuery);
});

require.register("js/scrolling.js", function(exports, require, module) {
'use strict';

(function ($) {
    "use strict"; // Start of use strict

    // Smooth scrolling using jQuery easing

    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top - 56
                }, 1000, "easeInOutExpo");
                return false;
            }
        }
    });

    // Closes responsive menu when a scroll trigger link is clicked
    $('.js-scroll-trigger').click(function () {
        $('.navbar-collapse').collapse('hide');
    });

    // Activate scrollspy to add active class to navbar items on scroll
    $('body').scrollspy({
        target: '#mainNav',
        offset: 66
    });

    $(window).on('load', function () {
        $('body').scrollspy('refresh');
    });

    // navbar reveal
    $(document).ready(function () {

        // hide .navbar first
        $(".navbar").hide();

        // fade in .navbar
        $(function () {
            $(window).scroll(function () {

                // set distance user needs to scroll before we start fadeIn
                if ($(this).scrollTop() > 10) {
                    $('.navbar').fadeIn();
                } else {
                    $('.navbar').fadeOut();
                }
            });
        });
    });
})(jQuery); // End of use strict
});

;require.register("js/typewriter.js", function(exports, require, module) {
"use strict";

$(document).ready(function () {
	var occupationID = "occupation";
	var occupationText = ["Software Developer In Test?", "Test Automation Engineer?"];
	typewrite(occupationID, occupationText);

	var introID = "intro";
	var introText = ["Looking for an experienced"];
	typewrite(introID, introText);
});

function typewrite(elemID, texts) {
	var elemRef = document.getElementById(elemID);
	var i = 0;
	var interval = null;
	var size = texts.length - 1;
	var timeout = void 0;
	var typeTimeout = 100;

	function update(func) {
		if (elemID === "occupation" && $("#occupation").hasClass("hidden")) {
			timeout = 6000;
		} else if (elemID === "intro") {
			timeout = 3500;
		} else {
			timeout = 1000;
		}
		// TODO: needs to be refactored
		// set smart waiter condition -> once reveal animation is done
		// this should be triggered
		elemRef.classList.toggle('animateCursor');
		setTimeout(function () {
			elemRef.classList.toggle('animateCursor');
			interval = setInterval(func, typeTimeout);
		}, timeout);
	}

	function clear() {
		var count = elemRef.innerHTML.length;
		if (count === 0) {
			// type interval between chars
			typeTimeout = 100;
			clearInterval(interval);
			elemRef.innerHTML = '';
			i = i >= size ? 0 : i + 1;
			update(write);
		} else {
			elemRef.innerHTML = elemRef.innerHTML.toString().substr(0, count - 1);
		}
	}

	function write() {
		var count = elemRef.innerHTML.length;
		var countCharacter = texts[i].length - 1;
		elemRef.innerHTML += texts[i][count > 0 ? count : 0];
		if (elemID === "occupation" && $("#occupation").hasClass("hidden")) {
			$("#occupation").removeClass("hidden");
		}
		if (countCharacter === count) {
			// clear interval between chars
			typeTimeout = 40;
			clearInterval(interval);
			if (elemID === "intro") {
				$(".intro").addClass("hidden");
			} else {
				update(clear);
			}
		}
	}

	update(write);
}
});

;require.alias("process/browser.js", "process");process = require('process');require.register("___globals___", function(exports, require, module) {
  

// Auto-loaded modules from config.npm.globals.
window["$"] = require("jquery");
window.jQuery = require("jquery");


});})();require('___globals___');


//# sourceMappingURL=app.js.map