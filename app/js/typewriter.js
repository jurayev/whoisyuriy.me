(function () {

	"use strict";

	sr.reveal('.anim-main-page', { afterReveal: runTypewriter});

	function runTypewriter() {
		const occupationID = "occupation";
		const occupationText = ["Software Developer In Test?", "Test Automation Engineer?", "QA Specialist?"];
		typewrite(occupationID, occupationText);
	}

	function typewrite(elemID, texts) {

		const elemRef = document.getElementById(elemID);
		let i = 0;
		let interval = null;
		const size = texts.length - 1;
		let typeTimeout = 100;

		function update(func) {
			elemRef.classList.toggle('animateCursor');
			setTimeout(function () {
				elemRef.classList.toggle('animateCursor');
				interval = setInterval(func, typeTimeout);
			}, 1000);
		}

		function clear() {
			const count = elemRef.innerHTML.length;
			if (count === 0) {
				// type interval between chars
				typeTimeout = 100;
				clearInterval(interval);
				elemRef.innerHTML = '';
				i = (i >= size) ? 0 : i + 1;
				update(write);
			} else {
				elemRef.innerHTML = elemRef.innerHTML.toString().substr(0, count - 1);
			}
		}

		function write() {
			const count = elemRef.innerHTML.length;
			const countCharacter = texts[i].length - 1;
			elemRef.innerHTML += texts[i][(count > 0) ? count : 0];

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
