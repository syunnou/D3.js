var svgWidth = 1000, svgHeight = 500, barWidth = 50, offsetX = 30, offsetY = 30, barMargin = 30;

// svg
var svg = d3.select('#myGraph')
	.append('svg')
	.attr({
		'width' : svgWidth, 
		'height' : svgHeight
	});

// 棒グラフ
var barGraph;

// 折れ線グラフ
var lineGraph;

d3.json("./data.json", function (data) {
	// X軸の描画位置表示	
	var xPos = function (i) { return i * (barWidth + barMargin) + offsetX;};

	// sizeの最大値
	var maxSize = d3.max(data, function(data) {return data.size;});
	
	// size(棒グラフ)用Y軸表示位置計算関数
	var yScaleSize = d3.scale.linear()
		.domain([0, maxSize])
		.range([svgHeight - offsetY, offsetY]);

	// cntの最大値
	var maxCnt = d3.max(data, function(data) {return data.cnt;});

	// cnt(折れ線グラフ)用Y軸表示位置計算関数
	var yScaleCnt = d3.scale.linear()
		.domain([0, maxCnt])
		.range([svgHeight - offsetY, offsetY]);

	// 棒グラフを初期化
	barGraph = svg
				.selectAll("rect")
				.data(data);


	// 棒グラフの描写
	barGraph
		.enter()
		.append("rect")
		.attr({
			'x' : function(d, i) { return xPos(d.week);},
			'y' : function(d, i) { return yScaleSize(d.size);},
			'width' : barWidth,
			'height' : function(d, i) { return svgHeight - yScaleSize(d.size) - offsetY;},
			'fill' : "#FF0000"
		});

	// 折れ線グラフの計算メソッド
	var drawLine = d3.svg.line()
					.x(function(d, i) { return xPos(d.week) + (barWidth / 2); })
					.y(function(d, i) { return yScaleCnt(d.cnt);});

	lineGraph = svg
			.append("path")
			.attr({
				"d" : drawLine(data),
				"fill" : "none",
				"stroke" : "#0000FF"
				
			});


	// X軸のライン
	barGraph
		.enter()
		.append("rect")
		.attr({
			'width' : svgWidth,
			'height' : 1,
			'transform' : "translate(" + 0 + ", "+ (svgHeight - offsetY) + ")"
		});


	// X軸のラベル
	barGraph
		.enter()
		.append("text")
		.attr({
			'x' : function (d, i) { return xPos(d.week); },
			'y' : function (d, i) { return svgHeight - offsetY + 15 }
		})
		.text(function(d, i) {return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][d.week - 1];});


	// Y軸のライン
	barGraph
		.enter()
		.append("rect")
		.attr({
			'width' : 1,
			'height' : svgHeight,
			'transform' : "translate(" + offsetX + ", " + offsetY + ")"

		});

	


});
