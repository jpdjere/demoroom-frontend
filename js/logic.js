function activateChart(url){

	var svg = d3.select("svg"),
		width = +svg.attr("width"),
		height = +svg.attr("height");

	svg.selectAll("*").remove();    
		
	var format = d3.format(",d");
	var color = d3.scaleOrdinal(d3.schemeCategory20);
	var pack = d3.pack()
			.size([width, height])
			.padding(1.5);

	d3.csv(url, function(d) {
		d.value = +d.value;
		if (d.value) return d;
	}, function(error, classes) {
		if (error) throw error;

		var root = d3.hierarchy({children: classes})
			.sum(function(d) { return d.value; })
			.each(function(d) {
				if (id = d.data.id) {
					var id, i = id.lastIndexOf(".");
					d.id = id;
					d.package = id.slice(0, i);
					d.class = id.slice(i + 1);
				}
			});
			

		var colors = Array("rojo","azul","amarillo","celeste","celesteb","naranjo");
		var rojo = svg.append("linearGradient")
			.attr('id', "rojo")
			.attr('x1', '0%') 
			.attr('y1', '100%') 
			.attr('x2', '100%') 
			.attr('y2', '100%') 
			.attr('spreadMethod', 'pad');

		rojo.append("stop")
			.attr("offset", "0%")
			.attr("stop-color", "#cd1e68");
		rojo.append("stop")
			.attr("offset", "100%")
			.attr("stop-color", "#f2827a");

		var azul = svg.append("linearGradient")
			.attr('id', "azul")
			.attr('x1', '0%') 
			.attr('y1', '100%') 
			.attr('x2', '100%') 
			.attr('y2', '100%') 
			.attr('spreadMethod', 'pad');

		azul.append("stop")
			.attr("offset", "0%")
			.attr("stop-color", "#007aac");
		azul.append("stop")
			.attr("offset", "100%")
			.attr("stop-color", "#00b7be");

		var amarillo = svg.append("linearGradient")
			.attr('id', "amarillo")
			.attr('x1', '0%') 
			.attr('y1', '100%') 
			.attr('x2', '100%') 
			.attr('y2', '100%') 
			.attr('spreadMethod', 'pad');

		amarillo.append("stop")
			.attr("offset", "0%")
			.attr("stop-color", "#fac987");
		amarillo.append("stop")
			.attr("offset", "100%")
			.attr("stop-color", "#ee6e97");

		var celeste = svg.append("linearGradient")
			.attr('id', "celeste")
			.attr('x1', '0%') 
			.attr('y1', '100%') 
			.attr('x2', '100%') 
			.attr('y2', '100%') 
			.attr('spreadMethod', 'pad');

		celeste.append("stop")
			.attr("offset", "0%")
			.attr("stop-color", "#55d3e9");
		celeste.append("stop")
			.attr("offset", "100%")
			.attr("stop-color", "#06bfc1");

		var celesteb = svg.append("linearGradient")
			.attr('id', "celesteb")
			.attr('x1', '0%') 
			.attr('y1', '100%') 
			.attr('x2', '100%') 
			.attr('y2', '100%') 
			.attr('spreadMethod', 'pad');

		celesteb.append("stop")
			.attr("offset", "0%")
			.attr("stop-color", "#007aac");
		celesteb.append("stop")
			.attr("offset", "100%")
			.attr("stop-color", "#00b7be");

		var naranjo = svg.append("linearGradient")
			.attr('id', "naranjo")
			.attr('x1', '0%') 
			.attr('y1', '100%') 
			.attr('x2', '100%') 
			.attr('y2', '100%') 
			.attr('spreadMethod', 'pad');

		naranjo.append("stop")
			.attr("offset", "0%")
			.attr("stop-color", "#ed7f68");
		naranjo.append("stop")
			.attr("offset", "100%")
			.attr("stop-color", "#a3243d");

		function circleTransition() { 
			var node = svg.selectAll(".node")
				.data(pack(root).leaves())
				.enter().append("g")
				.attr("transform",function(d){ return "translate(" + d.x + "," + d.y + ")"})
					.attr("class", "node");


			var timeCircle = node.append("circle")
				.attr("id", function(d) { return d.id; })
				.attr('fill', '#233646')
				.attr('opacity-fill', '0.4')
				.attr('stroke', function() { return 'url(#'+ colors[Math.floor( ( Math.random() * 5) + 1)] +')'})
				.attr('stroke-width', function(d){
					return 3/58 * d.r + 130/29;
				})
				.attr("r", function(d) { return d.r - 20; });

			node.append("clipPath")
				.attr("id", function(d) { return "clip-" + d.id; })
				.append("use")
				.attr("xlink:href", function(d) { return "#" + d.id; });

			node.append("text")
				.attr("clip-path", function(d) { return "url(#clip-" + d.id + ")"; })
				.attr("font-size", function(d) {
					return 9/58 * d.r + 100/29;
				})
				.selectAll("tspan")
				.data(function(d) { 
					var word = d.class.split(/(?=[A-Z][^A-Z])/g);
					var array = new Array();
					word.forEach(  function(item, index){
						array.push({ "name":item, "value": d.value });
					});
					return array; 
				})
				.enter().append("tspan")
				.attr("x", 0)
				.attr("y", function(d, i, nodes) { return d.value * 15 + 3 + (i - nodes.length / 2 - 0.5) * d.value * 15; })
				.text(function(d) { return d.name; })
				.attr('fill', "white")
				
				.style({
					"font-family":"Helvetica Neue, Helvetica, Arial, san-serif",
					"font-size": "20px"
				});

			node.append("title")
				.text(function(d) { return d.id + "\n" + format(d.value); })
				.style({
					"fill":"white", 
					"font-family":"Helvetica Neue, Helvetica, Arial, san-serif",
					"font-size": "20px"
				});

			svg.transition()
				.duration(1000)
				.attr("style","opacity:1;");
		}
		circleTransition();
	});
}

function progressChart(id, variable, text) {
	
	var bar = new ProgressBar.Circle(id, {
		color: '#fff',
		strokeWidth: 6,
		trailWidth: 0.5,
		trailColor: '#007aac',
		easing: 'easeInOut',
		duration: 1400,
		text: {
			autoStyleContainer: false
		},
		from: { color: '#007aac', width: 0.5 },
		to: { color: '#007aac', width: 6 },

		step: function(state, circle) {
			circle.path.setAttribute('stroke', 'url(#azul)');
			circle.path.setAttribute('stroke-width', '5');
			circle.path.setAttribute('stroke-linecap', 'round');

			var value = Math.round(circle.value() * 100);
			if (value === 0) {
				circle.setText('');
			} else {
				circle.setText(value+"% <p style='font-size: 13px; text-align: center;'>" + text + "</p>");
			}
		}
	});

	let linearGradient = `
		<defs>
			<linearGradient id="azul" x1="0%" y1="100%" x2="100%" y2="100%" gradientUnits="userSpaceOnUse">
				<stop offset="0%" stop-color="#007aac"/>
				<stop offset="100%" stop-color="#5fa0fa"/>
			</linearGradient>
		</defs>
	`

	bar.svg.insertAdjacentHTML('afterbegin', linearGradient);
	bar.text.style.fontFamily = '"Roboto", Helvetica, sans-serif';
	bar.text.style.fontSize = '38px';
	bar.text.style.textAlign = 'center';

	bar.animate(variable);  // Numero variable
}

function barChart(id, data) {

	var chart, merge = Highcharts.merge;
	var perShapeGradient = {
		x1: 0,
		y1: 1,
		x2: 1,
		y2: 1
	};

	var color = Array("rojo","azul","amarillo","celeste","celesteb","naranjo");
	var colors = Highcharts.getOptions().colors;
	colors = { rojo : {
		linearGradient: perShapeGradient,
			stops: [
				[0, '#cd1e68'],
				[1, '#f2827a']
			]
		}, azul : {
		linearGradient: merge(perShapeGradient),
			stops: [
				[0, '#007aac'],
				[1, '#00b7be']
			]
		}, amarillo: {
		linearGradient: merge(perShapeGradient),
			stops: [
				[0, '#fac987'],
				[1, '#ee6e97']
			]
		}, celeste : {
		linearGradient: merge(perShapeGradient),
			stops: [
				[0, '#55d3e9'],
				[1, '#06bfc1']
			]
		}, celesteb : {
		linearGradient: merge(perShapeGradient),
			stops: [
				[0, '#007aac'],
				[1, '#00b7be']
			]
		}, naranjo : {
		linearGradient: merge(perShapeGradient),
			stops: [
				[0, '#ed7f68'],
				[1, '#a3243d']
			]
		},
	};

	for (var i = 0; i < data.length; i++) {
		data[i]["color"] = colors[color[ i % 5 ]];
	}

	Highcharts.chart(id, {
		chart: {
			type: 'column',
			backgroundColor: 'transparent',
			style: {"fontFamily":"\"Roboto\", sans-serif"}
		},
		title: {
			text: 'Grafico de prueba',
			align: 'left',
			style: { "color": "#fff", "font-size": "21px"}
		},
		subtitle: {
			text: '',
			align: 'left',
			style: { "color": "#fff", "font-size": "18px"}
		},
		plotOptions: {
			series: {
				borderWidth: 0,
				dataLabels: {
					enabled: true,
					format: '{point.y}',
					style: {"color": "#ffffff", "fontSize": "11px", "fontWeight": "light", "textOutline": "none" }
				},
					
			}
		},
		credits: {
			enabled: false
		},
		xAxis: {
			type: 'category',
			lineColor: "#5fa0fa",
			labels: {
				style: { "color": "#ffffff", "cursor": "default", "fontSize": "13px" }
			},
			tickWidth: 0
		},
		yAxis: {
			title: {
				text: '',
				style: { "color": "#ffffff", "cursor": "default", "fontSize": "13px" }
			},
			lineColor: "#007aac",
			gridLineColor: "#007aac",
			lineWidth: 1,
			style: { "color": "#fff", "font-size": "11px"},
			labels: {
				style: { "color": "#ffffff", "cursor": "default", "fontSize": "13px" }
			}
		},
		legend: {
			enabled: false
		},
		series: [{
			name: "valor",
			colorByPoint: true,
			data: data
		}]
	});
}

function pieChart(id, data, title) {

	var chart, merge = Highcharts.merge;
	var perShapeGradient = {
		x1: 0,
		y1: 1,
		x2: 1,
		y2: 1
	};
			
	var color = Array("rojo","azul","amarillo","celeste","celesteb","naranjo");
	var colors = Highcharts.getOptions().colors;
	colors = { rojo : {
		linearGradient: perShapeGradient,
			stops: [
				[0, '#cd1e68'],
				[1, '#f2827a']
			]
		}, azul : {
		linearGradient: merge(perShapeGradient),
			stops: [
				[0, '#007aac'],
				[1, '#00b7be']
			]
		}, amarillo: {
		linearGradient: merge(perShapeGradient),
			stops: [
				[0, '#fac987'],
				[1, '#ee6e97']
			]
		}, celeste : {
		linearGradient: merge(perShapeGradient),
			stops: [
				[0, '#55d3e9'],
				[1, '#06bfc1']
			]
		}, celesteb : {
		linearGradient: merge(perShapeGradient),
			stops: [
				[0, '#007aac'],
				[1, '#00b7be']
			]
		}, naranjo : {
		linearGradient: merge(perShapeGradient),
			stops: [
				[0, '#ed7f68'],
				[1, '#a3243d']
			]
		},
	};

	for (var i = 0; i < data.length; i++) {
		data[i]["color"] = colors[color[ i % 5 ]];
	}
			
	Highcharts.chart(id, {
		chart: {
			plotBackgroundColor: null,
			plotBorderWidth: null,
			plotShadow: false,
			type: 'pie',
			backgroundColor: 'transparent',
			style: {"fontFamily":"\"Roboto\", sans-serif"}
		},
		/*colors: ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9', 
		'#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1'],*/
		title: {
			text: title,
			style: { "color": "#fff", "font-size": "21px"}
		},
		tooltip: {
			pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
		},
		plotOptions: {
			pie: {
				allowPointSelect: true,
				borderColor: "transparent",
				cursor: 'pointer',
				dataLabels: {
					enabled: true,
					format: '<b>{point.name}</b>: {point.percentage:.1f} %',
					style: {"color": "#ffffff", "fontSize": "11px", "fontWeight": "light", "textOutline": "none" },
					softConnector: false,
					connectorColor: "#ffffff"
				},
				showInLegend: true
			}
		},
		legend: {
			enabled: false,
			align: 'right',
			layout: 'vertical',
			x: 0,
			y: 0,
			itemStyle:{'color':'#ffffff'}
		},
		credits: {
			enabled: false
		},
		series: [{
			name: "valor",
			colorByPoint: true,
			data: data
		}]
	});
}