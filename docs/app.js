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

require('js/main');

require('js/app');

// adds all custom Bootstrap jQuery plugins
// see all plugins here: http://getbootstrap.com/javascript/

document.addEventListener('DOMContentLoaded', function () {
  // do your setup here
  console.log('Initialized app');
  if ($('btn')) {
    console.log('jQuery works');
  }
}); //globals: $, jQuery and Tether, see config
});

require.register("js/app.js", function(exports, require, module) {
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

require.register("js/main.js", function(exports, require, module) {
'use strict';

$(document).ready(function () {

	$('a[href*=#]').click(function () {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {

			var $target = $(this.hash);
			$target = $target.length && $target || $('[name=' + this.hash.slice(1) + ']');

			if ($target.length) {
				var targetOffset = $target.offset().top;
				$('html,body').animate({ scrollTop: targetOffset }, 1000);
				return false;
			}
		}
	});

	var elemID = "hello";
	var texts = ["YURIY JURAYEV", "TEST AUTOMATION ENGINEER", "SOFTWARE DEVELOPER IN TEST"];
	typewrite(elemID, texts);

	// Animated skill bars
	jQuery('.skillbar').each(function () {
		jQuery(this).find('.skillbar-bar').animate({
			width: jQuery(this).attr('data-percent')
		}, 6000);
	});
});

function typewrite(elemID, texts) {
	var elemRef = document.getElementById(elemID);
	var i = 0;
	var interval = null;
	var size = texts.length - 1;

	function update(func) {
		elemRef.classList.toggle('animateCursor');
		setTimeout(function () {
			elemRef.classList.toggle('animateCursor');
			interval = setInterval(func, 100);
		}, 2000);
	}

	function clear() {
		var count = elemRef.innerHTML.length;
		if (count === 0) {
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
			clearInterval(interval);
			update(clear);
		}
	}

	update(write);
}
});

;require.register("js/particles.min.js", function(exports, require, module) {
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * A lightweight, dependency-free and responsive javascript plugin for particle backgrounds.
 *
 * @author Marc Bruederlin <hello@marcbruederlin.com>
 * @version 2.2.3
 * @license MIT
 * @see https://github.com/marcbruederlin/particles.js
 */
var Particles = function (e, t) {
  "use strict";
  var n,
      i = {};function o(e, t) {
    return e.x < t.x ? -1 : e.x > t.x ? 1 : e.y < t.y ? -1 : e.y > t.y ? 1 : 0;
  }return (n = function () {
    return function () {
      var e = this;e.defaults = { responsive: null, selector: null, maxParticles: 100, sizeVariations: 3, showParticles: !0, speed: .5, color: "#000000", minDistance: 120, connectParticles: !1 }, e.element = null, e.context = null, e.ratio = null, e.breakpoints = [], e.activeBreakpoint = null, e.breakpointSettings = [], e.originalSettings = null, e.storage = [], e.usingPolyfill = !1;
    };
  }()).prototype.init = function (e) {
    var t = this;return t.options = t._extend(t.defaults, e), t.originalSettings = JSON.parse(JSON.stringify(t.options)), t._animate = t._animate.bind(t), t._initializeCanvas(), t._initializeEvents(), t._registerBreakpoints(), t._checkResponsive(), t._initializeStorage(), t._animate(), t;
  }, n.prototype.destroy = function () {
    var t = this;t.storage = [], t.element.remove(), e.removeEventListener("resize", t.listener, !1), e.clearTimeout(t._animation), cancelAnimationFrame(t._animation);
  }, n.prototype._initializeCanvas = function () {
    var n,
        i,
        o = this;if (!o.options.selector) return console.warn("particles.js: No selector specified! Check https://github.com/marcbruederlin/particles.js#options"), !1;o.element = t.querySelector(o.options.selector), o.context = o.element.getContext("2d"), n = e.devicePixelRatio || 1, i = o.context.webkitBackingStorePixelRatio || o.context.mozBackingStorePixelRatio || o.context.msBackingStorePixelRatio || o.context.oBackingStorePixelRatio || o.context.backingStorePixelRatio || 1, o.ratio = n / i, o.element.width = o.element.offsetParent ? o.element.offsetParent.clientWidth * o.ratio : o.element.clientWidth * o.ratio, o.element.offsetParent && "BODY" === o.element.offsetParent.nodeName ? o.element.height = e.innerHeight * o.ratio : o.element.height = o.element.offsetParent ? o.element.offsetParent.clientHeight * o.ratio : o.element.clientHeight * o.ratio, o.element.style.width = "100%", o.element.style.height = "100%", o.context.scale(o.ratio, o.ratio);
  }, n.prototype._initializeEvents = function () {
    var t = this;t.listener = function () {
      t._resize();
    }.bind(this), e.addEventListener("resize", t.listener, !1);
  }, n.prototype._initializeStorage = function () {
    var e = this;e.storage = [];for (var t = e.options.maxParticles; t--;) {
      e.storage.push(new i(e.context, e.options));
    }
  }, n.prototype._registerBreakpoints = function () {
    var e,
        t,
        n,
        i = this,
        o = i.options.responsive || null;if ("object" == (typeof o === "undefined" ? "undefined" : _typeof(o)) && null !== o && o.length) {
      for (e in o) {
        if (n = i.breakpoints.length - 1, t = o[e].breakpoint, o.hasOwnProperty(e)) {
          for (; n >= 0;) {
            i.breakpoints[n] && i.breakpoints[n] === t && i.breakpoints.splice(n, 1), n--;
          }i.breakpoints.push(t), i.breakpointSettings[t] = o[e].options;
        }
      }i.breakpoints.sort(function (e, t) {
        return t - e;
      });
    }
  }, n.prototype._checkResponsive = function () {
    var t,
        n = this,
        i = !1,
        o = e.innerWidth;if (n.options.responsive && n.options.responsive.length && null !== n.options.responsive) {
      for (t in i = null, n.breakpoints) {
        n.breakpoints.hasOwnProperty(t) && o <= n.breakpoints[t] && (i = n.breakpoints[t]);
      }null !== i ? (n.activeBreakpoint = i, n.options = n._extend(n.options, n.breakpointSettings[i])) : null !== n.activeBreakpoint && (n.activeBreakpoint = null, i = null, n.options = n._extend(n.options, n.originalSettings));
    }
  }, n.prototype._refresh = function () {
    this._initializeStorage(), this._draw();
  }, n.prototype._resize = function () {
    var t = this;t.element.width = t.element.offsetParent ? t.element.offsetParent.clientWidth * t.ratio : t.element.clientWidth * t.ratio, t.element.offsetParent && "BODY" === t.element.offsetParent.nodeName ? t.element.height = e.innerHeight * t.ratio : t.element.height = t.element.offsetParent ? t.element.offsetParent.clientHeight * t.ratio : t.element.clientHeight * t.ratio, t.context.scale(t.ratio, t.ratio), clearTimeout(t.windowDelay), t.windowDelay = e.setTimeout(function () {
      t._checkResponsive(), t._refresh();
    }, 50);
  }, n.prototype._animate = function () {
    var t = this;t._draw(), t._animation = e.requestAnimFrame(t._animate);
  }, n.prototype.resumeAnimation = function () {
    this._animation || this._animate();
  }, n.prototype.pauseAnimation = function () {
    var t = this;if (t._animation) {
      if (t.usingPolyfill) e.clearTimeout(t._animation);else (e.cancelAnimationFrame || e.webkitCancelAnimationFrame || e.mozCancelAnimationFrame)(t._animation);t._animation = null;
    }
  }, n.prototype._draw = function () {
    var t = this,
        n = t.element,
        i = n.offsetParent ? n.offsetParent.clientWidth : n.clientWidth,
        r = n.offsetParent ? n.offsetParent.clientHeight : n.clientHeight,
        a = t.options.showParticles,
        s = t.storage;n.offsetParent && "BODY" === n.offsetParent.nodeName && (r = e.innerHeight), t.context.clearRect(0, 0, n.width, n.height), t.context.beginPath();for (var l = s.length; l--;) {
      var c = s[l];a && c._draw(), c._updateCoordinates(i, r);
    }t.options.connectParticles && (s.sort(o), t._updateEdges());
  }, n.prototype._updateEdges = function () {
    for (var e = this, t = e.options.minDistance, n = Math.sqrt, i = Math.abs, o = e.storage, r = o.length, a = 0; a < r; a++) {
      for (var s = o[a], l = a + 1; l < r; l++) {
        var c,
            f = o[l],
            p = s.x - f.x,
            h = s.y - f.y;if (c = n(p * p + h * h), i(p) > t) break;c <= t && e._drawEdge(s, f, 1.2 - c / t);
      }
    }
  }, n.prototype._drawEdge = function (e, t, n) {
    var i = this,
        o = i.context.createLinearGradient(e.x, e.y, t.x, t.y),
        r = this._hex2rgb(e.color),
        a = this._hex2rgb(t.color);o.addColorStop(0, "rgba(" + r.r + "," + r.g + "," + r.b + "," + n + ")"), o.addColorStop(1, "rgba(" + a.r + "," + a.g + "," + a.b + "," + n + ")"), i.context.beginPath(), i.context.strokeStyle = o, i.context.moveTo(e.x, e.y), i.context.lineTo(t.x, t.y), i.context.stroke(), i.context.fill(), i.context.closePath();
  }, n.prototype._extend = function (e, t) {
    return Object.keys(t).forEach(function (n) {
      e[n] = t[n];
    }), e;
  }, n.prototype._hex2rgb = function (e) {
    var t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return t ? { r: parseInt(t[1], 16), g: parseInt(t[2], 16), b: parseInt(t[3], 16) } : null;
  }, (i = function i(n, _i) {
    var o = this,
        r = Math.random,
        a = _i.speed,
        s = _i.color instanceof Array ? _i.color[Math.floor(Math.random() * _i.color.length)] : _i.color;o.context = n, o.options = _i;var l = t.querySelector(_i.selector);o.x = l.offsetParent ? r() * l.offsetParent.clientWidth : r() * l.clientWidth, l.offsetParent && "BODY" === l.offsetParent.nodeName ? o.y = r() * e.innerHeight : o.y = l.offsetParent ? r() * l.offsetParent.clientHeight : r() * l.clientHeight, o.vx = r() * a * 2 - a, o.vy = r() * a * 2 - a, o.radius = r() * r() * _i.sizeVariations, o.color = s, o._draw();
  }).prototype._draw = function () {
    var e = this;e.context.save(), e.context.translate(e.x, e.y), e.context.moveTo(0, 0), e.context.beginPath(), e.context.arc(0, 0, e.radius, 0, 2 * Math.PI, !1), e.context.fillStyle = e.color, e.context.fill(), e.context.restore();
  }, i.prototype._updateCoordinates = function (e, t) {
    var n = this,
        i = n.x + this.vx,
        o = n.y + this.vy,
        r = n.radius;i + r > e ? i = r : i - r < 0 && (i = e - r), o + r > t ? o = r : o - r < 0 && (o = t - r), n.x = i, n.y = o;
  }, e.requestAnimFrame = function () {
    var t = e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame;return t || (this._usingPolyfill = !0, function (t) {
      return e.setTimeout(t, 1e3 / 60);
    });
  }(), new n();
}(window, document);!function () {
  "use strict";
  "function" == typeof define && define.amd ? define("Particles", function () {
    return Particles;
  }) : "undefined" != typeof module && module.exports ? module.exports = Particles : window.Particles = Particles;
}();
});

require.alias("process/browser.js", "process");process = require('process');require.register("___globals___", function(exports, require, module) {
  

// Auto-loaded modules from config.npm.globals.
window["$"] = require("jquery");
window.jQuery = require("jquery");


});})();require('___globals___');


//# sourceMappingURL=app.js.map