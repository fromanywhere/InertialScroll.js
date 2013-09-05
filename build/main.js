(function(w) {

	var scrollTop = 0;
	var wheelSpeed = 0;
	var currentSpeed = 0;

	function tan(x) {
		return 480 * Math.atan(0.002 * x);
	}

	function makeInertialScroll() {
		currentSpeed = tan((wheelSpeed + currentSpeed));
		wheelSpeed = 0;

		scrollTop = 0 - Math.round(currentSpeed - w.pageYOffset);

		if ((document.body.scrollHeight > scrollTop) && (scrollTop > 0) ) {
			w.scrollTo(0, scrollTop);
		}
	}

	function wheel(event){
		var delta = 0;
		if (!event)
			event = w.event;
		if (event.wheelDelta) {
			delta = event.wheelDelta/120;
		} else if (event.detail) {
			delta = -event.detail/3;
		}
		if (delta)
			handle(delta);
		if (event.preventDefault)
			event.preventDefault();

		event.returnValue = false;
	}

	function handle(delta) {
		wheelSpeed = delta*7;
		return false;
	}

	w.requestAnimFrame = (function(){
	  return  w.requestAnimationFrame       ||
			  w.webkitRequestAnimationFrame ||
			  w.mozRequestAnimationFrame    ||
			  w.oRequestAnimationFrame      ||
			  w.msRequestAnimationFrame     ||
			  function(callback){
				w.setTimeout(callback, 1000 / 60);
			  };
	})();

	document.addEventListener('DOMContentLoaded', function() {
		w.addEventListener('DOMMouseScroll', wheel, false);
		w.onmousewheel = document.onmousewheel = wheel;

		(function animloop(){
			makeInertialScroll();
			requestAnimFrame(animloop);
		})();

		document.querySelector('body').addEventListener('click', function() {
			currentSpeed = 0;
		})
	})

})(window);