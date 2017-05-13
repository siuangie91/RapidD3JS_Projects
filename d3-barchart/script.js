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

//*********** ASYNC STRUCTURE OF d3 FILE DOWNLOAD ***********
/*
// 1. Code here runs first, before the download starts.

d3.tsv("data.tsv", function(error, data) {
  // 3. Code here runs last, after the download finishes.
});

// 2. Code here runs second, while the file is downloading.
*/

// Specify a type function that is passed as 2nd argument to tsv()
// to convert between types like strings and numbers.
function type(d) {
    d.value = +d.value; // coerce to number
    return d;
}

//*********** SVG HORIZONTAL BAR CHART *********
/*var width = 420,
    barHeight = 20;

var x = d3.scale.linear() //.domain([0, d3.max[data]]) // data now pulled from tsv; undefined until pulled
    //.range([0, d3.max[data] * 10]);
    .range([0, width]);

var chart = d3.select("svg.chart")
    .attr("width", width);
    // move the setting of height to tsv() function
    // .attr("height", barHeight * data.length); // set <svg> height based on size of dataset; size is based on the height of each bar rather than the overall height of the chart

d3.tsv("data.tsv", type, function(error,data) {
    //x domain defined when pulled from tsv
    x.domain([0, d3.max(data, function(d) { return d.value; })]);

    // height of chart depends on num bars --> must be set inside callback
    chart.attr("height", barHeight * data.length);

    var bar = chart.selectAll("g")
            .data(data)
        .enter().append("g") // append <g>s (svg groups) using data join
            .attr("transform", function(d,i) { return "translate(0, " + i * barHeight + ")"}); // translate <g> elem along y-axis, creating a local origin for positioning the bar and its label

// Since there is exactly one <rect> and one <text> per <g>, we can append these elements directly to the <g>,
// without needing additional data joins. Data joins are only needed when creating a variable number of children
// based on data; here we are appending just one child per parent. The appended <rect>s and <text>s inherit data
// from their parent g element, and thus we can use data to compute the bar width and label position.

    bar.append("rect") // append <rect> to each <g>
        .attr("width", function(d) { return x(d.value); })
        .attr("height", barHeight - 1);

    bar.append("text") // append <text> to each <g>
        .attr("x", function(d) { return x(d.value) - 3; })
        .attr("y", barHeight / 2)
        .attr("dy", ".35em")
        .text(function(d) { return d.value; });
});*/

//*********** SVG VERTICAL BAR CHART *********

var width = 960,
    height = 500;

// ELEMS ARE POSITIONED FROM TOP DOWN! (THINK OF <rect> AS <div>)
// GIST IS TO PUSH THE <div>s DOWN ACCORDING TO d.value,
// THEN MAKE <div> HEIGHTS SO THAT THEY END AT THE SAME PLACE ON THE Y-AXIS.

var y = d3.scale.linear()
    .range([height, 0]); //range is changed from [0, width]; SVG origin = top left. Zero-value should be positioned at the bottom of the chart, not top.

var chart = d3.select("svg.chart")
    .attr("width", width)
    .attr("height", height);

d3.tsv("letter-frequency.tsv", type, function(error, data) {
    y.domain([0, d3.max(data, function(d) { return d.value; })]);

    var barWidth = width / data.length;

    var bar = chart.selectAll("g")
            .data(data)
        .enter().append("g")
            .attr("transform", function(d,i) { return "translate(" + i * barWidth + ",0)" ;});

    // <svg> origin is top left --> "y" is essentially = "top". y(d.value) scales the "top" position of the <rect> elem.
    // If d.value = max value in dataset --> <rect> height = chart (<svg>) height --> "top" position = 0.
    // y(d.value) thus increases the "top" position of the <rect> elem according to d.value.
    // <rect> elem height = chart (<svg>) height - <rect> "top" position, to make all the <rect> elems "end" at the same location

    bar.append("rect")
        .attr("y", function(d) { return y(d.value); })
        .attr("width", barWidth - 1)
        .attr("height", function(d) { return height - y(d.value); });


    bar.append("text")
        .attr("x", barWidth / 2)
        .attr("y", function(d) { return y(d.value) + 3; })
        .attr("dy", ".75em")
        .text(function(d) { return d.value; });
});






