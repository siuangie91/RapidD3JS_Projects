var getRandomInt = function() {
    return Math.floor(Math.random() * 255);
};

var oldData = [{x: 54, y: 78}, {x: 154, y: 178}, {x: 254, y: 278}, {x: 354, y: 378}, {x: 454, y: 478}];

var svg = d3.select("svg");

svg.selectAll("circle")
        .data(oldData)
    .enter().append("circle")
    .attr("cx", function(d) { return +d.x; })
    .attr("cy", function(d) { return +d.y; })
    .attr("r", 10)
    .style("fill", "steelblue");

var update = function() {
    d3.json("data.json", function(error, data) {
// Handle ENTER selection --> static visuals
/*
    svg.selectAll("circle") // 1. Returns a new empty selection, since the SVG container was empty
        .data(data) // 2. DATA JOIN: Selection is then joined to an array of data, resulting in three new selections that represent the three possible states: enter, update, and exit. Since the selection was empty, the update and exit selections are empty, while the enter selection contains a placeholder for each new datum.
        .enter() // 3. The update selection is returned by selection.data, while the enter and exit selections hang off the update selection; selection.enter thus returns the enter selection.
        .append("circle") // 4. The missing elements are added to the SVG container by calling selection.append on the enter selection. This appends a new circle for each data point to the SVG container.
            .attr("cx", function(d) { return +d.x; })
            .attr("cy", function(d) { return +d.y; })
            .style("fill", function() { return "rgb(" + getRandomInt() + "," + getRandomInt() + "," + getRandomInt() + ")"; })
            .attr("r", 25);
*/

// Handle UPDATE, ENTER, and EXIT states

        var circle = svg.selectAll("circle")
            .data(data);

        circle.exit().transition()
            .attr("r", 0)
            .remove(); // if new dataset is smaller than old one, surplus elems are removed.

        circle.enter().append("circle") // if new dataset is larger, surplus elems are appended. After call to append, ENTER selection is merged with UPDATE selection
                .attr("r", 0) // transStart state
            .transition().duration(800).delay(function(d,i) { return i * 400; }) // declare transition
                .attr("r", 25) // transEnd state
                .attr("cx", function(d) { return +d.x; })
                .attr("cy", function(d) { return +d.y; })
                .style("fill", function() { return "rgb(" + getRandomInt() + "," + getRandomInt() + "," + getRandomInt() + ")"; });


    });
};

setTimeout(update, 1000);
