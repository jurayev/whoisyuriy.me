!function(){"use strict";var e="undefined"==typeof global?self:global;if("function"!=typeof e.require){var r={},t={},n={},i={}.hasOwnProperty,a=/^\.\.?(\/|$)/,o=function(e,r){for(var t,n=[],i=(a.test(r)?e+"/"+r:r).split("/"),o=0,s=i.length;o<s;o++)t=i[o],".."===t?n.pop():"."!==t&&""!==t&&n.push(t);return n.join("/")},s=function(e){return e.split("/").slice(0,-1).join("/")},l=function(r){return function(t){var n=o(s(r),t);return e.require(n,r)}},c=function(e,r){var n=h&&h.createHot(e),i={id:e,exports:{},hot:n};return t[e]=i,r(i.exports,l(e),i),i.exports},u=function(e){return n[e]?u(n[e]):e},f=function(e,r){return u(o(s(e),r))},d=function(e,n){null==n&&(n="/");var a=u(e);if(i.call(t,a))return t[a].exports;if(i.call(r,a))return c(a,r[a]);throw new Error("Cannot find module '"+e+"' from '"+n+"'")};d.alias=function(e,r){n[r]=e};var v=/\.[^.\/]+$/,g=/\/index(\.[^\/]+)?$/,p=function(e){if(v.test(e)){var r=e.replace(v,"");i.call(n,r)&&n[r].replace(v,"")!==r+"/index"||(n[r]=e)}if(g.test(e)){var t=e.replace(g,"");i.call(n,t)||(n[t]=e)}};d.register=d.define=function(e,n){if(e&&"object"==typeof e)for(var a in e)i.call(e,a)&&d.register(a,e[a]);else r[e]=n,delete t[e],p(e)},d.list=function(){var e=[];for(var t in r)i.call(r,t)&&e.push(t);return e};var h=e._hmr&&new e._hmr(f,d,r,t);d._cache=t,d.hmr=h&&h.wrap,d.brunch=!0,e.require=d}}(),function(){var e;"undefined"==typeof window?this:window;require.register("index.js",function(e,r,t){"use strict";r("bootstrap"),r("jquery"),r("jquery.easing"),r("js/typewriter"),r("js/scrolling"),r("js/preloader"),r("js/progress-bar"),r("js/animation")}),require.register("js/animation.js",function(e,r,t){"use strict";!function(){sr.reveal(".anim-main-page",{distance:0,duration:1500,delay:2e3,scale:.9}),sr.reveal(".anim-main-content-js",{distance:"50vh",duration:1e3,viewFactor:.5}),sr.reveal(".anim-initial-content-js",{origin:"top",distance:"10vw",duration:700,scale:.9,viewFactor:.3}),sr.reveal(".anim-link-icons-js",{distance:0,duration:1e3,scale:2},500),sr.reveal(".anim-card-top-js",{origin:"top",distance:"15vw",duration:800,viewFactor:.7}),sr.reveal(".anim-card-right-js",{origin:"right",distance:"8vw",duration:800,delay:800,viewFactor:.7}),sr.reveal(".anim-card-left-js",{origin:"left",distance:"15vw",duration:800,viewFactor:.7}),sr.reveal(".anim-card-bottom-js",{origin:"bottom",distance:"15vw",duration:800,delay:800,viewFactor:.7}),sr.reveal(".anim-article-right-js",{origin:"right",distance:"6vw",duration:800,delay:500,viewFactor:.1}),sr.reveal(".anim-article-left-js",{origin:"left",distance:"15vw",duration:800,delay:500,viewFactor:.1}),sr.reveal(".anim-progressbar-js",{origin:"left",distance:"30vw",duration:800,delay:500,viewFactor:.9})}(jQuery)}),require.register("js/preloader.js",function(e,r,t){"use strict";anime({targets:[".circle-1"],translateY:-22,translateX:44,direction:"alternate",loop:!0,elasticity:400,easing:"easeInOutElastic",duration:500,delay:100}),anime({targets:[".circle-2"],translateY:22,direction:"alternate",loop:!0,elasticity:400,easing:"easeInOutElastic",duration:500,delay:100}),anime({targets:[".circle-3"],translateY:-22,direction:"alternate",loop:!0,elasticity:400,easing:"easeInOutElastic",duration:500,delay:100}),anime({targets:[".circle-4"],translateY:22,translateX:-44,direction:"alternate",loop:!0,elasticity:400,easing:"easeInOutElastic",duration:500,delay:100});!function(e){e(window).on("load",function(){function r(){document.body.style.overflow="hidden"}function t(){document.body.style.overflow="initial"}e("body").scrollspy("refresh"),r(),setTimeout(function(){t(),e("#preloader").fadeOut("fast",function(){}),e("#overlay").fadeOut("slow",function(){})},2e3)})}(jQuery)}),require.register("js/progress-bar.js",function(e,r,t){"use strict";var n=r("progressbar.js");!function(){function e(){var e=["#ff7e09","#ec5453","#4054b2","#f9bf3f","#2fa499"],r=Math.floor(5*Math.random());return e[r]}function r(r,t){var i=new n.Line(r,{strokeWidth:4,easing:"easeInOut",duration:3e3,color:e(),trailColor:"#ffffff",trailWidth:4,svgStyle:{width:"100%",height:"100%"},text:{style:{color:"#ffffff",position:"absolute",right:"0",top:"-25px",padding:0,margin:0,transform:null},autoStyleContainer:!1},from:{color:"#FFEA82"},to:{color:"#ED6A5A"},step:function(e,r){r.setText(Math.round(100*r.value())+" %")}});i.animate(t)}function t(e){e.setAttribute("id","progressbar-"+i);var t=e.getAttribute("data-score").valueOf();r("#progressbar-"+i,t),i++}sr.reveal(".progressbar",{afterReveal:t});var i=1}(jQuery)}),require.register("js/scrolling.js",function(e,r,t){"use strict";!function(e){e('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function(){if(location.pathname.replace(/^\//,"")==this.pathname.replace(/^\//,"")&&location.hostname==this.hostname){var r=e(this.hash);if(r=r.length?r:e("[name="+this.hash.slice(1)+"]"),r.length)return e("html, body").animate({scrollTop:r.offset().top-56},1e3,"easeInOutExpo"),!1}}),e(".js-scroll-trigger").click(function(){e(".navbar-collapse").collapse("hide")}),e("body").scrollspy({target:"#mainNav",offset:66}),e(window).on("load",function(){e("body").scrollspy("refresh")}),e(document).ready(function(){e(".navbar").hide(),e(function(){e(window).scroll(function(){e(this).scrollTop()>10?e(".navbar").fadeIn():e(".navbar").fadeOut()})})})}(jQuery)}),require.register("js/typewriter.js",function(e,r,t){"use strict";!function(){function e(){var e="occupation",t=["Software Developer In Test?","Test Automation Engineer?","QA Specialist?"];r(e,t)}function r(e,r){function t(e){a.classList.toggle("animateCursor"),setTimeout(function(){a.classList.toggle("animateCursor"),s=setInterval(e,c)},1e3)}function n(){var e=a.innerHTML.length;0===e?(c=100,clearInterval(s),a.innerHTML="",o=o>=l?0:o+1,t(i)):a.innerHTML=a.innerHTML.toString().substr(0,e-1)}function i(){var e=a.innerHTML.length,i=r[o].length-1;a.innerHTML+=r[o][e>0?e:0],i===e&&(c=40,clearInterval(s),t(n))}var a=document.getElementById(e),o=0,s=null,l=r.length-1,c=100;t(i)}sr.reveal(".anim-main-page",{afterReveal:e})}(jQuery)}),require.alias("process/browser.js","process"),e=require("process"),require.register("___globals___",function(e,r,t){window.$=r("jquery"),window.jQuery=r("jquery")})}(),require("___globals___");