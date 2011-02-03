$(document).ready(function ready() {
	paper = Raphael("graph", canvasWidth, canvasHeight);

	
	prepareForDrawing();
	drawLevel1();
	drawLevel2(false);
	drawLevel3(false);
	
	prepareResultLine();
	drawResultLine();
});