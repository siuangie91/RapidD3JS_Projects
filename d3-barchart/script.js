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

// By convention, margins in D3 are specified as an object with top, right, bottom and left properties.
// Then, the outer size of the chart area, which includes the margins, is used to compute the inner size available for graphical marks by subtracting the margins.
// (Need the _entire_ chart area to be 960x500, but area for the bars is smaller because of margins. These corrected dimensions are needed for accurately mapping the data across the axes.)
var margin = {top: 20, right: 30, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right, // = 890
    height = 500 - margin.top - margin.bottom; // = 450

// ORDINAL SCALING
// Example 1
// var x = d3.scale.ordinal()
//     .domain(["A", "B", "C", "D", "E", "F"]) // ordinal scale = mapping from a discrete set of data values (names) to a corresponding discrete set of display values (pixel positions)
//     .range([0, 1, 2, 3, 4, 5]); // mapping "A" to 0, "B" to 1, ... (domain[i] --> range[i])

// Example 2 -- Using rangeBands() to map values evenly across chart area
//var x = d3.scale.ordinal()
//    .domain(["A", "B", "C", "D", "E", "F"]) // rangeBands() computes range values so as to divide the chart area into evenly-spaced, evenly-sized bands, as in a bar chart.
//    .rangeBands([0, width], .1); // If width = 960, x("A") = 0 and x("B") = 160, and so on. Optionally add .1 px of padding

// Example 3 -- Using rangeRoundBands() to map values evenly, but also compute positions that snap to exact pixel boundaries
//var x = d3.scale.ordinal()
//    .domain(["A", "B", "C", "D", "E", "F"])
//    .rangeRoundBands([0, width], .1);

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

// ELEMS ARE POSITIONED FROM TOP DOWN! (THINK OF <rect> AS <div>)
// GIST IS TO PUSH THE <div>s DOWN ACCORDING TO d.value,
// THEN MAKE <div> HEIGHTS SO THAT THEY END AT THE SAME PLACE ON THE Y-AXIS.

var y = d3.scale.linear()
    .range([height, 0]); //range is changed from [0, width]; SVG origin = top left. Zero-value should be positioned at the bottom of the chart, not top.

var xAxis = d3.svg.axis() // create an xAxis obj that can be rendered anywhere using call()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10, "%");

var chart = d3.select("svg.chart")
        .attr("width", width + margin.left + margin.right) // set the width and height of the SVG element to the outer dimensions
        .attr("height", height + margin.top + margin.bottom)
    .append("g") // add a <g> to offset the origin of the chart area by the top-left margin. This <g> will contain the data <g>s.
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.tsv("letter-frequency.tsv", type, function(error, data) {
    x.domain(data.map(function(d) { return d.name; })); // map d.name along the x-axis to space them evenly
//    y.domain([0, d3.max(data, function(d) { return d.value; })]);
    y.domain([0, 1]); // change domain max val to 1 so that max val on y-axis = 100% (since frequencies are in decimals)

    chart.append("g") // append a <g> to contain the xAxis
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")") // axis elements are positioned relative to a local origin, so transform the containing <g> to translate along y-axis
        .call(xAxis);

    chart.append("g")
            .attr("class", "y axis")
            .call(yAxis)
        .append("text") // append label to y-axis
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dx", function() { return height / -2; })
            .attr("dy", "-3.95em")
            .style("text-anchor", "end")
            .text("Frequency");

    // <svg> origin is top left --> "y" is essentially = "top". y(d.value) scales the "top" position of the <rect> elem.
    // If d.value = max value in dataset --> <rect> height = chart (<svg>) height --> "top" position = 0.
    // y(d.value) thus increases the "top" position of the <rect> elem according to d.value.
    // <rect> elem height = chart (<svg>) height - <rect> "top" position, to make all the <rect> elems "end" at the same location

    chart.selectAll(".bar")
            .data(data)
        .enter().append("rect") // append <rect class="bar">s directly to parent <g>
            .attr("class", "bar")
            .attr("x", function(d) { return x(d.name); })
            .attr("y", function(d) { return y(d.value); })
            .attr("height", function(d) { return height - y(d.value); })
            .attr("width", x.rangeBand());

// SINCE WE NOW HAVE AXES, NO LONGER NEED THE FOLLOWING:
//    var barWidth = width / data.length;
//
//    var bar = chart.selectAll("g")
//            .data(data)
//        .enter().append("g")
//            .attr("transform", function(d,i) { return "translate(" + x(d.name) + ",0)" ;});
//
//    bar.append("rect")
//        .attr("y", function(d) { return y(d.value); })
//        .attr("width", barWidth - 1)
//        .attr("height", function(d) { return height - y(d.value); });
//
//
//    bar.append("text")
//        .attr("x", barWidth / 2)
//        .attr("y", function(d) { return y(d.value) + 3; })
//        .attr("dy", ".75em")
//        .text(function(d) { return d.value; });
});

















