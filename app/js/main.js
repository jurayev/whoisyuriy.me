$(document).ready(function(){

	$('a[href*=#]').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {

			var $target = $(this.hash);
			$target = $target.length && $target || $('[name=' + this.hash.slice(1) +']');

			if ($target.length) {
				var targetOffset = $target.offset().top;
				$('html,body').animate({scrollTop: targetOffset}, 1000);
				return false;
			}
		}
	});

	var elemID = "hello";
	var texts = ["YURIY JURAYEV", "TEST AUTOMATION ENGINEER", "SOFTWARE DEVELOPER IN TEST"];
	typewrite(elemID, texts);

	// Animated skill bars
	jQuery('.skillbar').each(function(){
		jQuery(this).find('.skillbar-bar').animate({
			width:jQuery(this).attr('data-percent')
		},6000);
	});


});




function typewrite(elemID, texts){
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
			i = (i >= size) ? 0 : i + 1;
			update(write);
		} else {
			elemRef.innerHTML = elemRef.innerHTML.toString().substr(0, count - 1);
		}
	}

	function write() {
		var count = elemRef.innerHTML.length;
		var countCharacter = texts[i].length - 1;
		elemRef.innerHTML += texts[i][(count > 0) ? count : 0];

		if (countCharacter === count) {
			clearInterval(interval);
			update(clear);
		}
	}

	update(write);
}
