// This function is called once the HTML page is fully loaded by the browser
document.addEventListener('DOMContentLoaded', function () {
    console.log("page loaded");

    drawBarChart();
});

function drawBarChart() {
    const svg = d3.select('#barchartSvg');
    const width = +svg.style('width').replace('px', '');
    const height = +svg.style('height').replace('px', '');

    const margin = { top: 40, bottom: 90, right: 20, left: 190 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    d3.csv('Code Frequencies.csv').then(data => {
        console.log(data);

        data.sort(function (a, b) {
            return +b["Frequency"] - +a["Frequency"];
        });

        data.forEach(d => {
            d.Frequency = +d["Frequency"];
            d.Codes = d["Codes"];
        });
        console.log(data);

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
