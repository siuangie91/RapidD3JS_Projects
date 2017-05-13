//var data = [4, 8, 15, 16, 23, 42];

//*********** HTML BAR CHART *********
/*

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

*/

//*********** SVG BAR CHART *********
var width = 420,
    barHeight = 20;

var x = d3.scaleLinear() //.domain([0, d3.max[data]]) // data now pulled from tsv
    .range([0, /*d3.max[data] * 10*/ width])

var chart = d3.select("svg.chart")
    .attr("width", width);
    // move the setting of height to tsv() function
    // .attr("height", barHeight * data.length); // set <svg> height based on size of dataset; size is based on the height of each bar rather than the overall height of the chart

d3.tsv("data.tsv", type, function(error,data) {
    x.domain([0, d3.max(data, function(d) { return d.Value; })]);

    chart.attr("height", barHeight * data.length);

    var bar = d3.selectAll("g")
        .data(data)
    .enter().append("g") // append <g>s (svg groups) using data join
        .attr("transform", function(d,i) { return "translate(0, " + i * barHeight + ")"}); // translate <g> elem along y-axis, creating a local origin for positioning the bar and its label

/*
Since there is exactly one <rect> and one <text> per <g>, we can append these elements directly to the <g>, without needing additional data joins. Data joins are only needed when creating a variable number of children based on data; here we are appending just one child per parent. The appended <rect>s and <text>s inherit data from their parent g element, and thus we can use data to compute the bar width and label position.
*/

    bar.append("rect") // append <rect> to each <g>
        .attr("width", x)
        .attr("height", barHeight - 1)

    bar.append("text") // append <text> to each <g>
        .attr("x", function(d) { return x(d) - 3; })
        .attr("y", barHeight / 2)
        .attr("dy", ".35em")
        .text(function(d) { return d; });
});

function type(d) {
    d.Value = +d.Value; // coerce to number
    return d;
}















