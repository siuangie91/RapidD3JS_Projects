var getRandomInt = function() {
    return Math.floor(Math.random() * 255);
};

var svg = d3.select("svg");

d3.json("data.json", function(error, data) {
    svg.selectAll("circle")
        .data(data)
        .enter().append("circle")
            .attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; })
            .style("fill", function() { return "rgb(" + getRandomInt() + "," + getRandomInt() + "," + getRandomInt() + ")"; })
            .attr("r", 25);
});
