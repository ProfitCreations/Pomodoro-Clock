$(document).ready(function() {

	var seconds = 0;
	var breakSeconds = 0;
	var workMinuts = 25;
	var breakMinuts = 5;
	var timer, breakTimer;
	var interval = 1000;

	// Colors
	var sessionColor = "#d84315";
	var breakColor = "";
	var standardColor = "#263238";

	$("#breakMin").click(function() {
		var bm = Math.floor($(".breakMnts").text());
		bm--;
		if (bm < 2) {
			bm = 1;
		}
		$(".breakMnts").text(twoDigits(bm));
	});

	$("#breakPlus").click(function() {
		var bp = Math.floor($(".breakMnts").text());
		bp++;
		$(".breakMnts").text(twoDigits(bp));
	});

	$("#sessionMin").click(function() {
		var sm = Math.floor($(".sessionMnts").text());
		sm--;
		if (sm < 1) {
			sm = 1;
		}
		$(".sessionMnts").text(twoDigits(sm));
		workMinuts = $(".sessionMnts").text();
		$("#mnts").text(workMinuts);
	});

	$("#sessionPlus").click(function() {
		var sp = Math.floor($(".sessionMnts").text());
		sp++;
		$(".sessionMnts").text(twoDigits(sp));
		workMinuts = $(".sessionMnts").text();
		$("#mnts").text(workMinuts);
	});

	$("#startBtn").click(function() {
		if ($("#startBtn").text() === "Start") {
			timer = setInterval(countDwn, interval);
			$(".work").prop('hidden', false);
			$("#resetBtn").prop("hidden", true);
			$("#startBtn")
				.text("Pause")
				.removeClass("btn-success")
				.addClass("btn-warning");
			$(
				"#breakMin, #sessionMin, #breakMnts, #sessionMnts, #breakPlus, #sessionPlus"
			).prop("hidden", true);
		} else {
			if (seconds != 0) {
				$("#resetBtn").prop("hidden", false);
			}
			$("#startBtn")
				.text("Start")
				.removeClass("btn-warning")
				.addClass("btn-success");

			clearInterval(timer);
			clearInterval(breakTimer);
		}
	});

	$("#resetBtn").click(function() {
		$(".work").prop('hidden', true);
		$(".break").prop('hidden', true);
		$("#resetBtn").prop("hidden", true);
		clearInterval(timer);
		clearInterval(breakTimer);
		$(
			"#breakMin, #sessionMin, #breakMnts, #sessionMnts, #breakPlus, #sessionPlus"
		).prop("hidden", false);
		$("#startBtn")
			.text("Start")
			.removeClass("btn-warning")
			.addClass("btn-success");
		$("#sds").text("00");
		$("#mnts").text("25");
		seconds = 0;
		breakSeconds = 0;
		workMinuts = 25;
		breakMinuts = 5;
		$(".breakMnts").text("05");
		$(".sessionMnts").text(25);
	});

	// function that keeps 2 digits
	function twoDigits(val) {
		return ("00" + val).slice(-2);
	}

	function countDwn() {
		if (seconds === 0) {
			seconds = 59;

			workMinuts--;
			$("#mnts").text(twoDigits(workMinuts));

			if (workMinuts < 0) {
				$("#mnts").text("00");
				
				clearInterval(timer);
				$(".work").prop('hidden', true);
				$(".break").prop('hidden', false);
				breakMinuts = Math.floor($(".breakMnts").text());
				breakSeconds = 0;

				// Starts Break Timer
				breakTimer = setInterval(countDownBreakTime, interval);
			}
		}
		$("#sds").text(twoDigits(seconds));
		seconds--;
	}

	function countDownBreakTime() {
		$("#mnts").text(twoDigits(breakMinuts));
		console.log(
			"breakMinuts -> ",
			breakMinuts,
			"breakSeconds -> ",
			breakSeconds
		);

		// twoDigits();
		if (breakSeconds < 10) {
			$("#sds").text("0" + breakSeconds);
		}

		if (breakSeconds === 0) {
			breakSeconds = 59;
			breakMinuts--;

			if (breakMinuts < 0) {
				$("#mnts").text(0);
				$(".work").prop('hidden', false);
				$(".break").prop('hidden', true);
				clearInterval(breakTimer);
				workMinuts = Math.floor($(".sessionMnts").text());
				$("#mnts").text(workMinuts);

				// Starts Break Timer
				timer = setInterval(countDwn, interval);
				seconds = 0;
			}
		}
		$("#sds").text(twoDigits(breakSeconds));
		breakSeconds--;
	}

});