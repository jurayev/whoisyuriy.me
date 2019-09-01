$(document).ready(function(){
	const occupationID = "occupation";
	const occupationText = ["Software Developer In Test?", "Test Automation Engineer?"];
	typewrite(occupationID, occupationText);

	const introID = "intro";
	const introText = ["Looking for an experienced"];
	typewrite(introID, introText);
});

function typewrite(elemID, texts){
	const elemRef = document.getElementById(elemID);
	let i = 0;
	let interval = null;
	const size = texts.length - 1;
	let timeout;
	let typeTimeout = 100;

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
