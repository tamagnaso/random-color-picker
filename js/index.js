var canvas;
var context;
var palettesSelect;

var rectsByRow;
var rectsByColumn;
var rectWidth;
var rectHeight;

var focusedRectX;
var focusedRectY;
var overlayPixels;
var focusedColor;
var mouseOnCanvas;

var flatColors = ["#1abc9c", "#e8f8f5", "#d1f2eb", "#a3e4d7",
		"#76d7c4", "#48c9b0", "#1abc9c", "#17a589", "#148f77", "#117864",
		"#0e6251", "#16a085", "#e8f6f3", "#d0ece7", "#a2d9ce", "#73c6b6",
		"#45b39d", "#16a085", "#138d75", "#117a65", "#0e6655", "#0b5345",
		"#2ecc71", "#eafaf1", "#d5f5e3", "#abebc6", "#82e0aa", "#58d68d",
		"#2ecc71", "#28b463", "#239b56", "#1d8348", "#186a3b", "#27ae60",
		"#e9f7ef", "#d4efdf", "#a9dfbf", "#7dcea0", "#52be80", "#27ae60",
		"#229954", "#1e8449", "#196f3d", "#145a32", "#3498db", "#ebf5fb",
		"#d6eaf8", "#aed6f1", "#85c1e9", "#5dade2", "#3498db", "#2e86c1",
		"#2874a6", "#21618c", "#1b4f72", "#2980b9", "#eaf2f8", "#d4e6f1",
		"#a9cce3", "#7fb3d5", "#5499c7", "#2980b9", "#2471a3", "#1f618d",
		"#1a5276", "#154360", "#9b59b6", "#f5eef8", "#ebdef0", "#d7bde2",
		"#c39bd3", "#af7ac5", "#9b59b6", "#884ea0", "#76448a", "#633974",
		"#512e5f", "#8e44ad", "#f4ecf7", "#e8daef", "#d2b4de", "#bb8fce",
		"#a569bd", "#8e44ad", "#7d3c98", "#6c3483", "#5b2c6f", "#4a235a",
		"#34495e", "#ebedef", "#d6dbdf", "#aeb6bf", "#85929e", "#5d6d7e",
		"#34495e", "#2e4053", "#283747", "#212f3c", "#1b2631", "#2c3e50",
		"#eaecee", "#d5d8dc", "#abb2b9", "#808b96", "#566573", "#2c3e50",
		"#273746", "#212f3d", "#1c2833", "#17202a", "#f1c40f", "#fef9e7",
		"#fcf3cf", "#f9e79f", "#f7dc6f", "#f4d03f", "#f1c40f", "#d4ac0d",
		"#b7950b", "#9a7d0a", "#7d6608", "#f39c12", "#fef5e7", "#fdebd0",
		"#fad7a0", "#f8c471", "#f5b041", "#f39c12", "#d68910", "#b9770e",
		"#9c640c", "#7e5109", "#e67e22", "#fdf2e9", "#fae5d3", "#f5cba7",
		"#f0b27a", "#eb984e", "#e67e22", "#ca6f1e", "#af601a", "#935116",
		"#784212", "#d35400", "#fbeee6", "#f6ddcc", "#edbb99", "#e59866",
		"#dc7633", "#d35400", "#ba4a00", "#a04000", "#873600", "#6e2c00",
		"#e74c3c", "#fdedec", "#fadbd8", "#f5b7b1", "#f1948a", "#ec7063",
		"#e74c3c", "#cb4335", "#b03a2e", "#943126", "#78281f", "#c0392b",
		"#f9ebea", "#f2d7d5", "#e6b0aa", "#d98880", "#cd6155", "#c0392b",
		"#a93226", "#922b21", "#7b241c", "#641e16", "#ecf0f1", "#fdfefe",
		"#fbfcfc", "#f7f9f9", "#f4f6f7", "#f0f3f4", "#ecf0f1", "#d0d3d4",
		"#b3b6b7", "#979a9a", "#7b7d7d", "#bdc3c7", "#f8f9f9", "#f2f3f4",
		"#e5e7e9", "#d7dbdd", "#cacfd2", "#bdc3c7", "#a6acaf", "#909497",
		"#797d7f", "#626567", "#95a5a6", "#f4f6f6", "#eaeded", "#d5dbdb",
		"#bfc9ca", "#aab7b8", "#95a5a6", "#839192", "#717d7e", "#5f6a6a",
		"#4d5656", "#7f8c8d", "#f2f4f4", "#e5e8e8", "#ccd1d1", "#b2babb",
		"#99a3a4", "#7f8c8d", "#707b7c", "#616a6b", "#515a5a", "#424949"];
var materialColors = ["#f44336", "#ffebee", "#ffcdd2", "#ef9a9a",
		"#e57373", "#ef5350", "#f44336", "#e53935", "#d32f2f", "#c62828",
		"#b71c1c", "#ff8a80", "#ff5252", "#ff1744", "#d50000", "#e91e63",
		"#fce4ec", "#f8bbd0", "#f48fb1", "#f06292", "#ec407a", "#e91e63",
		"#d81b60", "#c2185b", "#ad1457", "#880e4f", "#ff80ab", "#ff4081",
		"#f50057", "#c51162", "#9c27b0", "#f3e5f5", "#e1bee7", "#ce93d8",
		"#ba68c8", "#ab47bc", "#9c27b0", "#8e24aa", "#7b1fa2", "#6a1b9a",
		"#4a148c", "#ea80fc", "#e040fb", "#d500f9", "#aa00ff", "#673ab7",
		"#ede7f6", "#d1c4e9", "#b39ddb", "#9575cd", "#7e57c2", "#673ab7",
		"#5e35b1", "#512da8", "#4527a0", "#311b92", "#b388ff", "#7c4dff",
		"#651fff", "#6200ea", "#3f51b5", "#e8eaf6", "#c5cae9", "#9fa8da",
		"#7986cb", "#5c6bc0", "#3f51b5", "#3949ab", "#303f9f", "#283593",
		"#1a237e", "#8c9eff", "#536dfe", "#3d5afe", "#304ffe", "#2196f3",
		"#e3f2fd", "#bbdefb", "#90caf9", "#64b5f6", "#42a5f5", "#2196f3",
		"#1e88e5", "#1976d2", "#1565c0", "#0d47a1", "#82b1ff", "#448aff",
		"#2979ff", "#2962ff", "#03a9f4", "#e1f5fe", "#b3e5fc", "#81d4fa",
		"#4fc3f7", "#29b6f6", "#03a9f4", "#039be5", "#0288d1", "#0277bd",
		"#01579b", "#80d8ff", "#40c4ff", "#00b0ff", "#0091ea", "#00bcd4",
		"#e0f7fa", "#b2ebf2", "#80deea", "#4dd0e1", "#26c6da", "#00bcd4",
		"#00acc1", "#0097a7", "#00838f", "#006064", "#84ffff", "#18ffff",
		"#00e5ff", "#00b8d4", "#009688", "#e0f2f1", "#b2dfdb", "#80cbc4",
		"#4db6ac", "#26a69a", "#009688", "#00897b", "#00796b", "#00695c",
		"#004d40", "#a7ffeb", "#64ffda", "#1de9b6", "#00bfa5", "#4caf50",
		"#e8f5e9", "#c8e6c9", "#a5d6a7", "#81c784", "#66bb6a", "#4caf50",
		"#43a047", "#388e3c", "#2e7d32", "#1b5e20", "#b9f6ca", "#69f0ae",
		"#00e676", "#00c853", "#8bc34a", "#f1f8e9", "#dcedc8", "#c5e1a5",
		"#aed581", "#9ccc65", "#8bc34a", "#7cb342", "#689f38", "#558b2f",
		"#33691e", "#ccff90", "#b2ff59", "#76ff03", "#64dd17", "#cddc39",
		"#f9fbe7", "#f0f4c3", "#e6ee9c", "#dce775", "#d4e157", "#cddc39",
		"#c0ca33", "#afb42b", "#9e9d24", "#827717", "#f4ff81", "#eeff41",
		"#c6ff00", "#aeea00", "#ffeb3b", "#fffde7", "#fff9c4", "#fff59d",
		"#fff176", "#ffee58", "#ffeb3b", "#fdd835", "#fbc02d", "#f9a825",
		"#f57f17", "#ffff8d", "#ffff00", "#ffea00", "#ffd600", "#ffc107",
		"#fff8e1", "#ffecb3", "#ffe082", "#ffd54f", "#ffca28", "#ffc107",
		"#ffb300", "#ffa000", "#ff8f00", "#ff6f00", "#ffe57f", "#ffd740",
		"#ffc400", "#ffab00", "#ff9800", "#fff3e0", "#ffe0b2", "#ffcc80",
		"#ffb74d", "#ffa726", "#ff9800", "#fb8c00", "#f57c00", "#ef6c00",
		"#e65100", "#ffd180", "#ffab40", "#ff9100", "#ff6d00", "#ff5722",
		"#fbe9e7", "#ffccbc", "#ffab91", "#ff8a65", "#ff7043", "#ff5722",
		"#f4511e", "#e64a19", "#d84315", "#bf360c", "#ff9e80", "#ff6e40",
		"#ff3d00", "#dd2c00", "#795548", "#efebe9", "#d7ccc8", "#bcaaa4",
		"#a1887f", "#8d6e63", "#795548", "#6d4c41", "#5d4037", "#4e342e",
		"#3e2723", "#9e9e9e", "#fafafa", "#f5f5f5", "#eeeeee", "#e0e0e0",
		"#bdbdbd", "#9e9e9e", "#757575", "#616161", "#424242", "#212121",
		"#607d8b", "#eceff1", "#cfd8dc", "#b0bec5", "#90a4ae", "#78909c",
		"#607d8b", "#546e7a", "#455a64", "#37474f", "#263238", "#ffffff",
        "#000000"];

"use strict";

function drawRects() {
	canvas.width = Math.max(
			document.documentElement.clientWidth,
			window.innerWidth || 0);
	canvas.height = Math.max(
			document.documentElement.clientHeight,
			window.innerHeight || 0);

	rectWidth = canvas.width / rectsByRow;
	rectHeight = canvas.height / rectsByColumn;

	overlayPixels = Math.min((rectWidth / 4), (rectHeight / 4));

	for (var i = 0; i < rectsByRow * rectsByColumn; i++) {
		switch (palettesSelect.value) {
		case 'random':
			context.fillStyle = '#' + 
				Math.floor(Math.random() * 16777215).toString(16);
			break;
		case 'flat':
			context.fillStyle = flatColors[
				Math.floor(Math.random() * flatColors.length)];
			break;
		case 'material':
			context.fillStyle = materialColors[
				Math.floor(Math.random() * flatColors.length)];
			break;
		}
		context.fillRect(
				(i % rectsByRow) * rectWidth, 
				Math.floor(i / rectsByColumn) * rectHeight, 
				rectWidth, 
				rectHeight);
	}

	if (mouseOnCanvas) {
		context.fillStyle = focusedColor;
		context.fillRect(
				focusedRectX - overlayPixels, 
				focusedRectY - overlayPixels,
				rectWidth + 2 * overlayPixels, 
				rectHeight + 2 * overlayPixels);
	}
}

function decimalToHexString(number) {
	if (number < 0) {
		number = (0xFFFFFFFF + number + 1).toString(16).toUpperCase();
	} else {
		number = number.toString(16).toUpperCase();
		
		while (number.length < 2) {
			number = '0' + number;
		}
	}
	
	return number;
}

function focusColor(e) {
	var x = e.clientX;
	var y = e.clientY;

	focusedRectX = Math.floor(x / rectWidth) * rectWidth;
	focusedRectY = Math.floor(y / rectHeight) * rectHeight;

	var pixel = context.getImageData(focusedRectX + (rectWidth / 2), focusedRectY + (rectHeight / 2), 1, 1);

	focusedColor = '#' + 
	decimalToHexString(pixel.data[0]) + 
	decimalToHexString(pixel.data[1]) + 
	decimalToHexString(pixel.data[2]);

	mouseOnCanvas = true;
}

function init() {
	canvas = document.getElementById('canvas');
	context = canvas.getContext('2d');
	palettesSelect = document.getElementById('palettes');

	rectsByRow = 10;
	rectsByColumn = 10;

	setInterval(function() {
		drawRects();
	}, 50);

	window.addEventListener('mousemove', function(e) {
		focusColor(e);
	});
	window.addEventListener('mouseout', function(e) {
		if (e.toElement == null && e.relatedTarget == null) {
			mouseOnCanvas = false;
		}
	});
	window.addEventListener('resize', function(e) {
		drawRects();
	});
	palettesSelect.addEventListener('change', function(e) {
		drawRects();
	});

	drawRects();
}