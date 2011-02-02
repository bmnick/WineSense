var canvasWidth = 600;
var canvasHeight = 600;
var orginX = 300;
var orginY = 300;
var L1Radius = 100;

var radPerSmell = 0;
var paper;

function prepareForDrawing() {
	//Count how many Level 3s there are
	var l3Count = 0;
	
	//iterate level one
	for(l1key in aromaViewData) {
		//iterate level two
		for(l2key in aromaViewData[l1key].L2) {
			//count number of level threes
			l3Count += aromaViewData[l1key].L2[l2key].L3.length;
		}
	}
	
	radPerSmell = (2 * Math.PI) / l3Count;
	
	//iterate level one
	for(l1key in aromaViewData) {
		var l1RadCount = 0;
		//iterate level two
		for(l2key in aromaViewData[l1key].L2) {
			aromaViewData[l1key].L2[l2key].rads = aromaViewData[l1key].L2[l2key].L3.length * radPerSmell;
			l1RadCount += aromaViewData[l1key].L2[l2key].rads;
			console.log("    " + aromaViewData[l1key].L2[l2key].L2Name + " : " + aromaViewData[l1key].L2[l2key].rads);
		}
		aromaViewData[l1key].rads = l1RadCount;
		console.log(aromaViewData[l1key].L1Name + " : " + l1RadCount);
	}
	
}


function drawLevel1() {
	aromaViewData.length;
	var radFromOrgin = 0;
	for(l1key in aromaViewData) {
		var rads = aromaViewData[l1key].rads;
		var startx = orginX + (L1Radius * Math.cos(radFromOrgin));
		var starty = orginY + (L1Radius * Math.sin(radFromOrgin));
		var endx = orginX + (L1Radius * Math.cos(rads + radFromOrgin));
		var endy = orginY + (L1Radius * Math.sin(rads + radFromOrgin));
		paper.path("M" + orginX + "," + orginY + 
			"L" + startx + "," + starty + 
			"A" + L1Radius + ", " + L1Radius + " 0 " + ((rads < Math.PI) ? 1 : 0) + ",0 " + endx + "," + endy);
		radFromOrgin += aromaViewData[l1key].rads;
	} 
}

function drawLevel2() {
	
}



$(document).ready(function ready() {
	paper = Raphael("graph", canvasWidth, canvasHeight);

	
	prepareForDrawing();
	drawLevel1();

	var lolRect = paper.rect(10, 10, 50 ,50);
});
