var w = 500, h = 500;

// svg
var svg = d3.select('body').append('svg')
      .attr({ width: w, height: h });
// circle
var circle;

var making = function (x, y, count) {
	var x2 = x * 20 + 10;
	var y2 = y * 20 + 10;	

	circle = svg.append('circle')
	.attr({ cx: x2, cy: y2, r: count / 2, fill: "ff0000" });

};

