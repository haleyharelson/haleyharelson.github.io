// define global variables
// for gender chart
let genderData;
let marginGenderChart;
let widthGenderChart;
let heightGenderChart;
let svgGenderChart;
let xScaleGenderChart;
let yScaleGenderChart;
let xAxisGenderChart;
let yAxisGenderChart;

// for race chart
let raceData;
let marginRaceChart;
let widthRaceChart;
let heightRaceChart;
let svgRaceChart;
let xScaleRaceChart;
let yScaleRaceChart;
let xAxisRaceChart;
let yAxisRaceChart;

// This function is called once the HTML page is fully loaded by the browser
document.addEventListener('DOMContentLoaded', function () {
    drawGenderPercentageBarChart();
    drawRacePercentageBarChart();
    drawGenderLollipopCanvas();
    drawGenderLollipopChart('AvgUCLAScore');
    drawRaceLollipopCanvas();
    drawRaceLollipopChart('AvgUCLAScore');
    drawUCLAMap();
    drawPROMISMap();
    drawBarChart();
});

function drawGenderPercentageBarChart() {
    const svg = d3.select('#genderPercentageSvg');
    const width = +svg.style('width').replace('px', '');
    const height = +svg.style('height').replace('px', '');

    const margin = { top: 40, bottom: 90, right: 20, left: 190 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    d3.csv('/data/Gender Percentages.csv').then(data => {

        data.sort(function (a, b) {
            return +b["Percentage of Sample"] - +a["Percentage of Sample"];
        });

        data.forEach(d => {
            d["Percentage of Sample"]= +d["Percentage of Sample"];
            d.Gender = d["Gender"];
        });

        const xScale = d3.scaleLinear()
            .domain([0, d3.max(data, function (d) { return d["Percentage of Sample"]; })]) // data space
            .range([0, innerWidth]); // pixel space
        const yScale = d3.scaleBand()
            .domain(data.map(function (d) { return d.Gender; }))
            .range([0, innerHeight])
            .padding(0.1);

        const g = svg.append('g')
            .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

        var barchart = g.selectAll('rect')
            .data(data)
            .enter()
            .append('rect')
            .attr('y', d => yScale(d.Gender))
            .attr('height', yScale.bandwidth())
            .attr('width', function (d) {
                return xScale(d["Percentage of Sample"]);
            });

        const yAxis = d3.axisLeft(yScale);
        g.append('g').call(yAxis)
            .style("font-size", "12px");

        const xAxis = d3.axisBottom(xScale);
        g.append('g').call(xAxis)
            .attr('transform', `translate(0,${innerHeight})`)
            .selectAll("text")
            .style("text-anchor", "end")
            .style("font-size", "12px")
            .attr("dx", "-10px")
            .attr("dy", "0px")
            .attr("transform", "rotate(-45)");

        g.append('text')
            .attr('class', 'axis-label')
            .attr('transform', 'rotate(-90)')
            .attr('y', '-170px')
            .attr('x', -innerHeight / 2)
            .attr('text-anchor', 'middle')
            .text('Gender');
        g.append('text')
            .attr('class', 'axis-label')
            .attr('text-anchor', 'middle')
            .attr('x', innerWidth / 2)
            .attr('y', innerHeight + 70)
            .text('Percentage of Sample');

        g.append("text")
            .attr("x", (width / 2) - 100)             
            .attr("y", 10 - (margin.top / 2))
            .attr("text-anchor", "middle")  
            .style("font-size", "24px") 
            .style("text-decoration", "underline")  
            .text("Comparison of Gender in Data Sample");
    });
}

function drawRacePercentageBarChart() {
    const svg = d3.select('#racePercentageSvg');
    const width = +svg.style('width').replace('px', '');
    const height = +svg.style('height').replace('px', '');

    const margin = { top: 40, bottom: 90, right: 20, left: 190 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    d3.csv('/data/Race Percentages.csv').then(data => {

        data.sort(function (a, b) {
            return +b["Percentage of Sample"] - +a["Percentage of Sample"];
        });

        data.forEach(d => {
            d["Percentage of Sample"] = +d["Percentage of Sample"];
            d.Race = d["Race"];
        });

        const xScale = d3.scaleLinear()
            .domain([0, d3.max(data, function (d) { return d["Percentage of Sample"]; })]) // data space
            .range([0, innerWidth]); // pixel space
        const yScale = d3.scaleBand()
            .domain(data.map(function (d) { return d.Race; }))
            .range([0, innerHeight])
            .padding(0.1);

        const g = svg.append('g')
            .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

        var barchart = g.selectAll('rect')
            .data(data)
            .enter()
            .append('rect')
            .attr('y', d => yScale(d.Race))
            .attr('height', yScale.bandwidth())
            .attr('width', function (d) {
                return xScale(d["Percentage of Sample"]);
            });

        const yAxis = d3.axisLeft(yScale);
        g.append('g').call(yAxis)
            .style("font-size", "12px");

        const xAxis = d3.axisBottom(xScale).ticks(18);
        g.append('g').call(xAxis)
            .attr('transform', `translate(0,${innerHeight})`)
            .selectAll("text")
            .style("text-anchor", "end")
            .style("font-size", "12px")
            .attr("dx", "-10px")
            .attr("dy", "0px")
            .attr("transform", "rotate(-45)");

        g.append('text')
            .attr('class', 'axis-label')
            .attr('transform', 'rotate(-90)')
            .attr('y', '-170px')
            .attr('x', -innerHeight / 2)
            .attr('text-anchor', 'middle')
            .text('Race');
        g.append('text')
            .attr('class', 'axis-label')
            .attr('text-anchor', 'middle')
            .attr('x', innerWidth / 2)
            .attr('y', innerHeight + 70)
            .text('Percentage of Sample');

        g.append("text")
            .attr("x", (width / 2) - 100)             
            .attr("y", 10 - (margin.top / 2))
            .attr("text-anchor", "middle")  
            .style("font-size", "24px") 
            .style("text-decoration", "underline")  
            .text("Comparison of Race in Data Sample");
    });
}

function drawGenderLollipopCanvas() {
    // set the dimensions and margins of the graph
    marginGenderChart = {top: 40, bottom: 90, right: 20, left: 190},
    widthGenderChart = 1000 - marginGenderChart.left - marginGenderChart.right,
    heightGenderChart = 600 - marginGenderChart.top - marginGenderChart.bottom;

    // append the svg object to the body of the page
    svgGenderChart = d3.select("#genderLollipopSvg")
    .attr("width", widthGenderChart + marginGenderChart.left + marginGenderChart.right)
    .attr("height", heightGenderChart + marginGenderChart.top + marginGenderChart.bottom)
    .append("g")
    .attr("transform",
        "translate(" + marginGenderChart.left + "," + marginGenderChart.top + ")");

    // Initialize the X axis
    xScaleGenderChart = d3.scaleBand()
    .range([ 0, widthGenderChart ])
    .padding(1);
    xAxisGenderChart = svgGenderChart.append("g")
    .attr("transform", "translate(0," + heightGenderChart + ")")

    // Initialize the Y axis
    yScaleGenderChart = d3.scaleLinear()
    .range([ heightGenderChart, 0]);
    yAxisGenderChart = svgGenderChart.append("g")
    .attr("class", "myYaxisGenderChart")
}

function drawRaceLollipopCanvas() {
    // set the dimensions and margins of the graph
    marginRaceChart = {top: 40, bottom: 90, right: 20, left: 190},
    widthRaceChart = 1000 - marginRaceChart.left - marginRaceChart.right,
    heightRaceChart = 600 - marginRaceChart.top - marginRaceChart.bottom;

    // append the svg object to the body of the page
    svgRaceChart = d3.select("#raceLollipopSvg")
    .attr("width", widthRaceChart + marginRaceChart.left + marginRaceChart.right)
    .attr("height", heightRaceChart + marginRaceChart.top + marginRaceChart.bottom)
    .append("g")
    .attr("transform",
        "translate(" + marginRaceChart.left + "," + marginRaceChart.top + ")");

    // Initialize the X axis
    xScaleRaceChart = d3.scaleBand()
    .range([ 0, widthRaceChart ])
    .padding(1);
    xAxisRaceChart = svgRaceChart.append("g")
    .attr("transform", "translate(0," + heightRaceChart + ")")

    // Initialize the Y axis
    yScaleRaceChart = d3.scaleLinear()
    .range([ heightRaceChart, 0]);
    yAxisRaceChart = svgRaceChart.append("g")
    .attr("class", "myYaxisRaceChart")
}

    
function drawGenderLollipopChart(selectedScore) {
    d3.csv('/data/GenderScores.csv').then(data => {
        data.forEach(d => {
            d.AvgUCLAScore = +d["AvgUCLAScore"];
            d.AvgPROMISScore = +d["AvgPROMISScore"];
            d.Gender = d["Gender"];
        });
    genderData = data;

    // X axis
    xScaleGenderChart.domain(data.map(function(d) { return d.Gender; }))
    xAxisGenderChart.transition().duration(1000).call(d3.axisBottom(xScaleGenderChart));

    // Add Y axis
    yScaleGenderChart.domain([45, 50]);
    yAxisGenderChart.transition().duration(1000).call(d3.axisLeft(yScaleGenderChart).ticks(10));

    // variable u: map data to existing circle
    var j = svgGenderChart.selectAll(".myLineGenderChart")
        .data(genderData)
      // update lines
      j
        .enter()
        .append("line")
        .attr("class", "myLineGenderChart")
        .merge(j)
        .transition()
        .duration(1000)
          .attr("x1", function(d) { console.log(xScaleGenderChart(d.Gender)) ; return xScaleGenderChart(d.Gender); })
          .attr("x2", function(d) { return xScaleGenderChart(d.Gender); })
          .attr("y1", yScaleGenderChart(45))
          .attr("y2", function(d) { return yScaleGenderChart(d[selectedScore]); })
          .attr("stroke", "rgb(211, 139, 139)")
    
    // variable u: map data to existing circle
    var u = svgGenderChart.selectAll("circle")
        .data(genderData)
      // update bars
      u
        .enter()
        .append("circle")
        .merge(u)
        .transition()
        .duration(1000)
          .attr("cx", function(d) { return xScaleGenderChart(d.Gender); })
          .attr("cy", function(d) { return yScaleGenderChart(d[selectedScore]); })
          .attr("r", 8)
          .attr("fill", "rgb(211, 139, 139)");
        
        svgGenderChart.append('text')
          .attr('class', 'axis-label')
          .attr('transform', 'rotate(-90)')
          .attr('y', '-120px')
          .attr('x', -heightGenderChart / 2)
          .attr('text-anchor', 'middle')
          .text('Average Score');
        svgGenderChart.append('text')
          .attr('class', 'axis-label')
          .attr('text-anchor', 'middle')
          .attr('x', widthGenderChart / 2)
          .attr('y', heightGenderChart + 70)
          .text('Gender');
        svgGenderChart.append("text")
          .attr("x", (widthGenderChart / 2) - 100)             
          .attr("y", 10 - (marginGenderChart.top / 2))
          .attr("text-anchor", "middle")  
          .style("font-size", "24px") 
          .style("text-decoration", "underline")  
          .text("Average UCLA or PROMIS Score vs. Gender");

    });
}

function drawRaceLollipopChart(selectedScore) {
    d3.csv('/data/Race Scores.csv').then(data => {
        data.forEach(d => {
            d.AvgUCLAScore = +d["AvgUCLAScore"];
            d.AvgPROMISScore = +d["AvgPROMISScore"];
            d.Race = d["Race"];
        });
    raceData = data;

    // X axis
    xScaleRaceChart.domain(data.map(function(d) { return d.Race; }))
    xAxisRaceChart.transition().duration(1000).call(d3.axisBottom(xScaleRaceChart));

    // Y axis
    yScaleRaceChart.domain([40, 60]);
    yAxisRaceChart.transition().duration(1000).call(d3.axisLeft(yScaleRaceChart).ticks(20));

    // variable u: map data to existing circle
    var j = svgRaceChart.selectAll(".myLineRaceChart")
        .data(raceData)
      // update lines
      j
        .enter()
        .append("line")
        .attr("class", "myLineRaceChart")
        .merge(j)
        .transition()
        .duration(1000)
          .attr("x1", function(d) { console.log(xScaleRaceChart(d.Race)) ; return xScaleRaceChart(d.Race); })
          .attr("x2", function(d) { return xScaleRaceChart(d.Race); })
          .attr("y1", yScaleRaceChart(40))
          .attr("y2", function(d) { return yScaleRaceChart(d[selectedScore]); })
          .attr("stroke", "rgb(209, 133, 83)")
    
    // variable u: map data to existing circle
    var u = svgRaceChart.selectAll("circle")
        .data(raceData)
      // update bars
      u
        .enter()
        .append("circle")
        .merge(u)
        .transition()
        .duration(1000)
          .attr("cx", function(d) { return xScaleRaceChart(d.Race); })
          .attr("cy", function(d) { return yScaleRaceChart(d[selectedScore]); })
          .attr("r", 8)
          .attr("fill", "rgb(209, 133, 83)");
        
        svgRaceChart.append('text')
          .attr('class', 'axis-label')
          .attr('transform', 'rotate(-90)')
          .attr('y', '-120px')
          .attr('x', -heightRaceChart / 2)
          .attr('text-anchor', 'middle')
          .text('Average Score');
        svgRaceChart.append('text')
          .attr('class', 'axis-label')
          .attr('text-anchor', 'middle')
          .attr('x', widthRaceChart / 2)
          .attr('y', heightRaceChart + 70)
          .text('Race');
        svgRaceChart.append("text")
          .attr("x", (widthRaceChart / 2) - 100)             
          .attr("y", 10 - (marginRaceChart.top / 2))
          .attr("text-anchor", "middle")  
          .style("font-size", "24px") 
          .style("text-decoration", "underline")  
          .text("Average UCLA or PROMIS Score vs. Race");

    });
}

function drawUCLAMap() {
    //Width and height of map
    var margin = {top: 40, bottom: 90, right: 20, left: 190};
    var width = 1300 - margin.left - margin.right;
    var height = 700 - margin.top - margin.bottom;

    var lowColor = '#f9f9f9'
    var highColor = 'rgb(91, 158, 167)'

    // D3 Projection
    var projection = d3.geoAlbersUsa()
    .translate([width / 2, height / 2]) // translate to center of screen
    .scale([1000]); // scale things down so see entire US

    // Define path generator
    var path = d3.geoPath() // path generator that will convert GeoJSON to SVG paths
    .projection(projection); // tell path generator to use albersUsa projection

    //Create SVG element and append map to the SVG
    var svg = d3.select('#uclaMapSvg')
    .attr("width", width)
    .attr("height", height);

    d3.csv('/data/States UCLA Score.csv')
    .then(function(data) {
        var dataArray = [];
        for (var d = 0; d < data.length; d++) {
            dataArray.push(parseFloat(data[d].value))
        }
        console.log("length:", dataArray.length)
        var minVal = d3.min(dataArray)
        var maxVal = d3.max(dataArray)
        var ramp = d3.scaleLinear().domain([minVal,maxVal]).range([lowColor,highColor])
	
    // Load GeoJSON data and merge with states data
    d3.json("/data/us-states.json")
    .then(function(json) {
        // Loop through each state data value in the .csv file
        for (var i = 0; i < data.length; i++) {
        // Grab State Name
        var dataState = data[i].state;
        // Grab data value 
        var dataValue = data[i].value;
        // Find the corresponding state inside the GeoJSON
        for (var j = 0; j < json.features.length; j++) {
            var jsonState = json.features[j].properties.name;
            if (dataState == jsonState) {
            // Copy the data value into the JSON
            json.features[j].properties.value = dataValue;
            // Stop looking through the JSON
            break;
            }
        }
        }

    // Bind the data to the SVG and create one path per GeoJSON feature
    svg.selectAll("path")
      .data(json.features)
      .enter()
      .append("path")
      .attr("d", path)
      .style("stroke", "#fff")
      .style("stroke-width", "1")
      .style("fill", function(d) { return ramp(d.properties.value) });
    
    svg.append("text")
      .attr("x", (width / 2) - 20)             
      .attr("y", 60 - (margin.top / 2))
      .attr("text-anchor", "middle")  
      .style("font-size", "24px") 
      .style("text-decoration", "underline")  
      .text("Average UCLA Score by US State");
    
		// add a legend
		var w = 140, h = 300;

		var key = d3.select('#uclaMapSvg')
			.attr("width", w)
			.attr("height", h)
			.attr("class", "legend");

		var legend = key.append("defs")
			.append("svg:linearGradient")
			.attr("id", "gradient")
			.attr("x1", "100%")
			.attr("y1", "0%")
			.attr("x2", "100%")
			.attr("y2", "100%")
			.attr("spreadMethod", "pad");

		legend.append("stop")
			.attr("offset", "0%")
			.attr("stop-color", highColor)
			.attr("stop-opacity", 1);
			
		legend.append("stop")
			.attr("offset", "100%")
			.attr("stop-color", lowColor)
			.attr("stop-opacity", 1);

		key.append("rect")
			.attr("width", w - 100)
			.attr("height", h)
			.style("fill", "url(#gradient)")
			.attr("transform", "translate(0,10)");

		var y = d3.scaleLinear()
			.range([h, 0])
			.domain([minVal, maxVal]);

		var yAxis = d3.axisRight(y);

		key.append("g")
			.attr("class", "y axis")
			.attr("transform", "translate(41,10)")
			.call(yAxis)	
        });
    });
}

function drawPROMISMap() {
    //Width and height of map
    var margin = {top: 40, bottom: 90, right: 20, left: 190};
    var width = 1300 - margin.left - margin.right;
    var height = 700 - margin.top - margin.bottom;

    var lowColor = '#f9f9f9'
    var highColor = 'rgb(91, 158, 167)'

    // D3 Projection
    var projection = d3.geoAlbersUsa()
    .translate([width / 2, height / 2]) // translate to center of screen
    .scale([1000]); // scale things down so see entire US

    // Define path generator
    var path = d3.geoPath() // path generator that will convert GeoJSON to SVG paths
    .projection(projection); // tell path generator to use albersUsa projection

    //Create SVG element and append map to the SVG
    var svg = d3.select('#promisMapSvg')
    .attr("width", width)
    .attr("height", height);

    d3.csv('/data/States PROMIS Score.csv')
    .then(function(data) {
        var dataArray = [];
        for (var d = 0; d < data.length; d++) {
            dataArray.push(parseFloat(data[d].value))
        }
        console.log("length:", dataArray.length)
        var minVal = d3.min(dataArray)
        var maxVal = d3.max(dataArray)
        var ramp = d3.scaleLinear().domain([minVal,maxVal]).range([lowColor,highColor])
	
    // Load GeoJSON data and merge with states data
    d3.json("/data/us-states.json")
    .then(function(json) {
        // Loop through each state data value in the .csv file
        for (var i = 0; i < data.length; i++) {
        // Grab State Name
        var dataState = data[i].state;
        // Grab data value 
        var dataValue = data[i].value;
        // Find the corresponding state inside the GeoJSON
        for (var j = 0; j < json.features.length; j++) {
            var jsonState = json.features[j].properties.name;
            if (dataState == jsonState) {
            // Copy the data value into the JSON
            json.features[j].properties.value = dataValue;
            // Stop looking through the JSON
            break;
            }
        }
        }

    // Bind the data to the SVG and create one path per GeoJSON feature
    svg.selectAll("path")
      .data(json.features)
      .enter()
      .append("path")
      .attr("d", path)
      .style("stroke", "#fff")
      .style("stroke-width", "1")
      .style("fill", function(d) { return ramp(d.properties.value) });
    
    svg.append("text")
      .attr("x", (width / 2) - 20)             
      .attr("y", 60 - (margin.top / 2))
      .attr("text-anchor", "middle")  
      .style("font-size", "24px") 
      .style("text-decoration", "underline")  
      .text("Average PROMIS Score by US State");
    
		// add a legend
		var w = 140, h = 300;

		var key = d3.select('#promisMapSvg')
			.attr("width", w)
			.attr("height", h)
			.attr("class", "legend");

		var legend = key.append("defs")
			.append("svg:linearGradient")
			.attr("id", "gradient")
			.attr("x1", "100%")
			.attr("y1", "0%")
			.attr("x2", "100%")
			.attr("y2", "100%")
			.attr("spreadMethod", "pad");

		legend.append("stop")
			.attr("offset", "0%")
			.attr("stop-color", highColor)
			.attr("stop-opacity", 1);
			
		legend.append("stop")
			.attr("offset", "100%")
			.attr("stop-color", lowColor)
			.attr("stop-opacity", 1);

		key.append("rect")
			.attr("width", w - 100)
			.attr("height", h)
			.style("fill", "url(#gradient)")
			.attr("transform", "translate(0,10)");

		var y = d3.scaleLinear()
			.range([h, 0])
			.domain([minVal, maxVal]);

		var yAxis = d3.axisRight(y);

		key.append("g")
			.attr("class", "y axis")
			.attr("transform", "translate(41,10)")
			.call(yAxis)	
        });
    });
}

function drawBarChart() {
    // Draw canvas for barchart 
    const svg = d3.select('#barchartSvg');
    const width = +svg.style('width').replace('px', '');
    const height = +svg.style('height').replace('px', '');

    const margin = { top: 40, bottom: 90, right: 20, left: 190 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Data import and wrangling
    d3.csv('/data/Code Frequencies.csv').then(data => {
        // Sort the data from highest frequency value to lowest
        data.sort(function (a, b) {
            return +b["Frequency"] - +a["Frequency"];
        });
        // Convert "Frequency" attribute to a number
        data.forEach(d => {
            d.Frequency = +d["Frequency"];
            d.Codes = d["Codes"];
        });

        // Create X and Y Scales
        const xScale = d3.scaleLinear()
            .domain([0, d3.max(data, function (d) { return d.Frequency; })]) // data space
            .range([0, innerWidth]); // pixel space
        const yScale = d3.scaleBand()
            .domain(data.map(function (d) { return d.Codes; }))
            .range([0, innerHeight])
            .padding(0.1);

        const g = svg.append('g')
            .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

        // Create barchart 
        var barchart = g.selectAll('rect')
            .data(data)
            .enter()
            .append('rect')
            .attr('y', d => yScale(d.Codes))
            .attr('height', yScale.bandwidth())
            .attr('width', function (d) {
                return xScale(d.Frequency);
            });

        // Create X and Y Axes
        const yAxis = d3.axisLeft(yScale);
        g.append('g').call(yAxis)
            .style("font-size", "12px");
        const xAxis = d3.axisBottom(xScale);

        g.append('g').call(xAxis)
            .attr('transform', `translate(0,${innerHeight})`)
            .selectAll("text")
            .style("text-anchor", "end")
            .style("font-size", "12px")
            .attr("dx", "-10px")
            .attr("dy", "0px")
            .attr("transform", "rotate(-45)");
        g.append('text')
            .attr('class', 'axis-label')
            .attr('transform', 'rotate(-90)')
            .attr('y', '-170px')
            .attr('x', -innerHeight / 2)
            .attr('text-anchor', 'middle')
            .text('Code');
        g.append('text')
            .attr('class', 'axis-label')
            .attr('text-anchor', 'middle')
            .attr('x', innerWidth / 2)
            .attr('y', innerHeight + 70)
            .text('Frequency');
        g.append("text")
            .attr("x", (width / 2) - 100)             
            .attr("y", 10 - (margin.top / 2))
            .attr("text-anchor", "middle")  
            .style("font-size", "24px") 
            .style("text-decoration", "underline")  
            .text("Code Frequency Across Participant Interviews");
    });
}