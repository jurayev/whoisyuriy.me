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

require('js/scrolling');

require('js/preloader');

require('js/progress-bar');

require('js/animation');
});

require.register("js/animation.js", function(exports, require, module) {
'use strict';

(function () {

    "use strict";

    // ScrollReveal animations

    sr.reveal('.anim-main-page', { distance: 0, duration: 1500, delay: 2000, scale: 0.9 });

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

    "use strict";

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

require.register("js/progress-bar.js", function(exports, require, module) {
'use strict';

var ProgressBar = require('progressbar.js');

(function () {

    "use strict";

    sr.reveal('.progressbar', { afterReveal: addDynamicProgressBar });

    function getRandomColor() {
        var colors = ['#ff7e09', '#ec5453', '#4054b2', '#f9bf3f', '#2fa499'];
        var colorIndex = Math.floor(Math.random() * 5);
        return colors[colorIndex];
    }

    function createBar(container, score) {
        var bar = new ProgressBar.Line(container, {
            strokeWidth: 4,
            easing: 'easeInOut',
            duration: 3000,
            color: getRandomColor(),
            trailColor: '#ffffff',
            trailWidth: 4,
            svgStyle: { width: '100%', height: '100%' },
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
            from: { color: '#FFEA82' },
            to: { color: '#ED6A5A' },
            step: function step(state, bar) {
                bar.setText(Math.round(bar.value() * 100) + ' %');
            }
        });

        bar.animate(score);
    }

    var progressBarId = 1;

    function addDynamicProgressBar(el) {
        el.setAttribute('id', 'progressbar-' + progressBarId);
        var score = el.getAttribute('data-score').valueOf();
        createBar('#progressbar-' + progressBarId, score);
        progressBarId++;
    }
})(jQuery);
});

require.register("js/scrolling.js", function(exports, require, module) {
'use strict';

(function ($) {
    "use strict";

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
})(jQuery);
});

require.register("js/typewriter.js", function(exports, require, module) {
"use strict";

(function () {

	"use strict";

	sr.reveal('.anim-main-page', { afterReveal: runTypewriter });

	function runTypewriter() {
		var occupationID = "occupation";
		var occupationText = ["Software Developer In Test?", "Test Automation Engineer?", "QA Specialist?"];
		typewrite(occupationID, occupationText);
	}

	function typewrite(elemID, texts) {

		var elemRef = document.getElementById(elemID);
		var i = 0;
		var interval = null;
		var size = texts.length - 1;
		var typeTimeout = 100;

		function update(func) {
			elemRef.classList.toggle('animateCursor');
			setTimeout(function () {
				elemRef.classList.toggle('animateCursor');
				interval = setInterval(func, typeTimeout);
			}, 1000);
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

			if (countCharacter === count) {
				// clear interval between chars
				typeTimeout = 40;
				clearInterval(interval);

				update(clear);
			}
		}

		update(write);
	}
})(jQuery);
});

require.alias("process/browser.js", "process");process = require('process');require.register("___globals___", function(exports, require, module) {
  

// Auto-loaded modules from config.npm.globals.
window["$"] = require("jquery");
window.jQuery = require("jquery");


});})();require('___globals___');


//# sourceMappingURL=app.js.map