var svg = d3.select("svg");

var circle = svg.selectAll("circle")
    .data([32, 57, 112, 293]);

circle.attr("r", function(d) { return Math.sqrt(d); })
    .attr("cx", function(d, i) { return i * 100 + 30; })
    .style("fill", "steelblue");

// ENTER

circle.enter().append("circle") // will append a 4th circle
    .attr("cy", 60)
    .attr("cx", function(d, i) { return i * 100 + 30; })
    .attr("r", function(d) { return Math.sqrt(d); });

// EXIT

svg.selectAll("circle")
    .data([32,57]) // only 2 items in dataset --> remove remaining <circle>s
    .exit().remove();
