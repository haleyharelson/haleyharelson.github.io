// define global variables
let genderData;
let lollipopSvg;
let margin;
let svg;
let xScake;
let yScale;
let xAxis;
let yAxis;

// This function is called once the HTML page is fully loaded by the browser
document.addEventListener('DOMContentLoaded', function () {
    console.log("page loaded");
    drawLollipopCanvas();
    drawLollipopChart('AvgUCLAScore');
    drawBarChart();
});

function drawLollipopCanvas() {
    // set the dimensions and margins of the graph
    margin = {top: 40, bottom: 90, right: 20, left: 190},
    width = 1000 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    svg = d3.select("#lollipopSvg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    // Initialize the X axis
    xScale = d3.scaleBand()
    .range([ 0, width ])
    .padding(1);
    xAxis = svg.append("g")
    .attr("transform", "translate(0," + height + ")")

    // Initialize the Y axis
    yScale = d3.scaleLinear()
    .range([ height, 0]);
    yAxis = svg.append("g")
    .attr("class", "myYaxis")
}

    
function drawLollipopChart(selectedScore) {

    console.log("lollipop function call");

    d3.csv('GenderScores.csv').then(data => {
        data.forEach(d => {
            d.AvgUCLAScore = +d["AvgUCLAScore"];
            d.AvgPROMISScore = +d["AvgPROMISScore"];
            d.Gender = d["Gender"];
        });
    genderData = data;

    // X axis
    xScale.domain(data.map(function(d) { return d.Gender; }))
    xAxis.transition().duration(1000).call(d3.axisBottom(xScale));

    // Add Y axis
    yScale.domain([45, 50]);
    yAxis.transition().duration(1000).call(d3.axisLeft(yScale).ticks(10));

    // variable u: map data to existing circle
    var j = svg.selectAll(".myLine")
        .data(genderData)
      // update lines
      j
        .enter()
        .append("line")
        .attr("class", "myLine")
        .merge(j)
        .transition()
        .duration(1000)
          .attr("x1", function(d) { console.log(xScale(d.Gender)) ; return xScale(d.Gender); })
          .attr("x2", function(d) { return xScale(d.Gender); })
          .attr("y1", yScale(45))
          .attr("y2", function(d) { return yScale(d[selectedScore]); })
          .attr("stroke", "#69b3a2")
    
    // variable u: map data to existing circle
    var u = svg.selectAll("circle")
        .data(genderData)
      // update bars
      u
        .enter()
        .append("circle")
        .merge(u)
        .transition()
        .duration(1000)
          .attr("cx", function(d) { return xScale(d.Gender); })
          .attr("cy", function(d) { return yScale(d[selectedScore]); })
          .attr("r", 8)
          .attr("fill", "#69b3a2");
        
        svg.append('text')
          .attr('class', 'axis-label')
          .attr('transform', 'rotate(-90)')
          .attr('y', '-120px')
          .attr('x', -height / 2)
          .attr('text-anchor', 'middle')
          .text('Average Score');
        svg.append('text')
          .attr('class', 'axis-label')
          .attr('text-anchor', 'middle')
          .attr('x', width / 2)
          .attr('y', height + 70)
          .text('Gender');
        svg.append("text")
          .attr("x", (width / 2) - 100)             
          .attr("y", 10 - (margin.top / 2))
          .attr("text-anchor", "middle")  
          .style("font-size", "24px") 
          .style("text-decoration", "underline")  
          .text("Average UCLA or PROMIS Score vs. Gender");

    });
}

function drawBarChart() {
    const svg = d3.select('#barchartSvg');
    const width = +svg.style('width').replace('px', '');
    const height = +svg.style('height').replace('px', '');

    const margin = { top: 40, bottom: 90, right: 20, left: 190 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    d3.csv('Code Frequencies.csv').then(data => {

        data.sort(function (a, b) {
            return +b["Frequency"] - +a["Frequency"];
        });

        data.forEach(d => {
            d.Frequency = +d["Frequency"];
            d.Codes = d["Codes"];
        });

        const xScale = d3.scaleLinear()
            .domain([0, d3.max(data, function (d) { return d.Frequency; })]) // data space
            .range([0, innerWidth]); // pixel space
        const yScale = d3.scaleBand()
            .domain(data.map(function (d) { return d.Codes; }))
            .range([0, innerHeight])
            .padding(0.1);

        const g = svg.append('g')
            .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

        var barchart = g.selectAll('rect')
            .data(data)
            .enter()
            .append('rect')
            .attr('y', d => yScale(d.Codes))
            .attr('height', yScale.bandwidth())
            .attr('width', function (d) {
                return xScale(d.Frequency);
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