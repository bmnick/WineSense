var canvasWidth = 600;
var canvasHeight = 600;
var orginX = canvasWidth/2;
var orginY = canvasHeight/2;
var L1Radius = canvasWidth/6;
var L2Radius = L1Radius * 2;
var L3Radius = L1Radius * 3;

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
		
		
		//WORRRRDSSSS
		var wordsx = orginX + (L1Radius/2 * Math.cos(rads/2 + radFromOrgin));
		var wordsy = orginY + (L1Radius/2 * Math.sin(rads/2 + radFromOrgin));
		var textRot = rads/2 + radFromOrgin;
		textRot = (textRot > (Math.PI / 2) && textRot < (3 * Math.PI /2)) ? (textRot + Math.PI) : textRot;
		paper.text(wordsx,wordsy,aromaViewData[l1key].L1Name).rotate(Raphael.deg(textRot));
		
			
			
		radFromOrgin += rads;
	} 
}

function drawLevel2() {
	var radFromOrgin = 0;
	for(l1key in aromaViewData) {
		for(l2key in aromaViewData[l1key].L2) {
			var rads = aromaViewData[l1key].L2[l2key].rads;
			var startx = orginX + (L2Radius * Math.cos(radFromOrgin));
			var starty = orginY + (L2Radius * Math.sin(radFromOrgin));
			var endx = orginX + (L2Radius * Math.cos(rads + radFromOrgin));
			var endy = orginY + (L2Radius * Math.sin(rads + radFromOrgin));
			
			var innerStartx = orginX + (L1Radius * Math.cos(radFromOrgin));
			var innerStarty = orginY + (L1Radius * Math.sin(radFromOrgin));
			
			var outerEndx = orginX + (L3Radius * Math.cos(radFromOrgin));
			var outerEndy = orginY + (L3Radius * Math.sin(radFromOrgin));
			paper.path("M" + innerStartx + "," + innerStarty + 
				"L" + startx + "," + starty + 
				"A" + L2Radius + ", " + L2Radius + " 0 " + ((rads < Math.PI) ? 1 : 0) + ",0 " + endx + "," + endy);
			
			paper.path("M" + startx + "," + starty + 
				"L" + outerEndx + "," + outerEndy);
			
			
			//WORRRRDSSSS
			var wordsx = orginX + ((L1Radius +(L2Radius-L1Radius)/2) * Math.cos(rads/2 + radFromOrgin));
			var wordsy = orginY + ((L1Radius +(L2Radius-L1Radius)/2) * Math.sin(rads/2 + radFromOrgin));
			var textRot = rads/2 + radFromOrgin;
			textRot = (textRot > (Math.PI / 2) && textRot < (3 * Math.PI /2)) ? (textRot + Math.PI) : textRot;
			paper.text(wordsx,wordsy,aromaViewData[l1key].L2[l2key].L2Name).rotate(Raphael.deg(textRot));
			radFromOrgin += rads;
		}
	}
}


function drawLevel3() {
	aromaViewData.length;
	var radFromOrgin = 0;
	for(l1key in aromaViewData) {
		for(l2key in aromaViewData[l1key].L2) {
			for(l3key in aromaViewData[l1key].L2[l2key].L3) {
				var rads = radPerSmell;



				//WORRRRDSSSS
				var wordsx = orginX + ((L2Radius +(L3Radius-L2Radius)/2) * Math.cos(rads/2 + radFromOrgin));
				var wordsy = orginY + ((L2Radius +(L3Radius-L2Radius)/2) * Math.sin(rads/2 + radFromOrgin));
				var textRot = rads/2 + radFromOrgin;
				textRot = (textRot > (Math.PI / 2) && textRot < (3 * Math.PI /2)) ? (textRot + Math.PI) : textRot;
				paper.text(wordsx,wordsy,aromaViewData[l1key].L2[l2key].L3[l3key].L3Name).rotate(Raphael.deg(textRot));
				radFromOrgin += rads;
			}
		}
	}
}



$(document).ready(function ready() {
	paper = Raphael("graph", canvasWidth, canvasHeight);

	
	prepareForDrawing();
	drawLevel1();
	drawLevel2();
	drawLevel3();
});
