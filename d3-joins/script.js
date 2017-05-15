var getRandomInt = function() {
    return Math.floor(Math.random() * 255);
};

var arr = [
    {x: 54, y: 78},
    {x: 154, y: 178},
    {x: 254, y: 278},
    {x: 654, y: 378},
    {x: 454, y: 478},
    {x: 24, y: 38},
    {x: 724, y: 108},
    {x: 204, y: 218},
    {x: 904, y: 328},
    {x: 834, y: 418},
    {x: 36, y: 98}
];

var svg = d3.select("svg");

function update(data, fill) {
    fill = fill || "steelblue";
    // DATA JOIN
    var circle = svg.selectAll("circle")
        .data(data);

    // Manually UPDATE old elems as needed
    /*
    circle.transition().duration(800)
        .attr("fill", "blue")
        .attr("cx", function(d) { return +d.x; }) // reposition the existing <circle>
        .attr("cy", function(d) { return +d.y; }) // reposition the existing <circle>
    */

    // Automatically UPDATE existin elems when creating new ones
    // ENTER to create new elems as needed + automatically UPDATE existing elements
    circle.enter().append("circle")
        .merge(circle) // merge() merges arrays into a single array. In this case, it merges selections (our circle data) together.
            .attr("r", 0)
        .transition().duration(800).delay(function(d,i) { return i * 400; })
            .attr("r", 10)
            .attr("cx", function(d) { return +d.x; })
            .attr("cy", function(d) { return +d.y; })
            .style("fill", fill);

    // EXIT to remove old elements.
    circle.exit().transition().duration(800)
        .attr("r", 0)
        .remove();
}

function updateWithJson(data, fill) {
    d3.json(data, function(error, data) {
        update(data, fill);
    });
}

setTimeout(function() {
    console.log("Update using array");
    update(arr, "red");
}, 1000);

setTimeout(function() {
    console.log("Update using json");
    updateWithJson("data.json", "green");
}, 8000);


