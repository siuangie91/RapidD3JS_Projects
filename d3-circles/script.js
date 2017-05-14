var circle = d3.selectAll("circle");

var getRandomInt = function() {
    return Math.floor(Math.random() * 255);
};

circle.style("fill", function() { return "rgb("+ getRandomInt() + "," + getRandomInt() + "," + getRandomInt() + ")"; })
    .attr("r", 30)
    .style("stroke", "black");

var reposition = function() {
    circle.attr("cx", function() { return Math.random() * 360; });
};

var repeatReposition = setInterval(function() {
    reposition();
}, 1000);
