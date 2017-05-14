var getRandomInt = function() {
    return Math.floor(Math.random() * 255);
};

var svg = d3.select("svg");

d3.json("data.json", function(error, data) {
    svg.selectAll("circle") // 1. Returns a new empty selection, since the SVG container was empty
        .data(data) // 2. DATA JOIN: Selection is then joined to an array of data, resulting in three new selections that represent the three possible states: enter, update, and exit. Since the selection was empty, the update and exit selections are empty, while the enter selection contains a placeholder for each new datum.
        .enter() // 3. The update selection is returned by selection.data, while the enter and exit selections hang off the update selection; selection.enter thus returns the enter selection.
        .append("circle") // 4. The missing elements are added to the SVG container by calling selection.append on the enter selection. This appends a new circle for each data point to the SVG container.
            .attr("cx", function(d) { return +d.x; })
            .attr("cy", function(d) { return +d.y; })
            .style("fill", function() { return "rgb(" + getRandomInt() + "," + getRandomInt() + "," + getRandomInt() + ")"; })
            .attr("r", 25);
});
