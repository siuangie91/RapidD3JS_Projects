var data = [4, 8, 15, 16, 23, 42];

// Produce a linear scale to map appropriate bar width.
// scales specify a mapping from data space (domain) to display space (range)
// x is also a function here!
var x = d3.scaleLinear()
    .domain([0, d3.max(data)])
    .range([0, d3.max(data) * 10]);

d3.select('.chart')
    .selectAll('div')
        .data(data)
    .enter().append('div')
        .style("width", function(d) { return x(d) + "px"; })
        .text(function(d) { return d; });

