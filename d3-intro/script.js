/*d3.selectAll("p")
    .style("color", function() {
        return "hsl(" + Math.random() * 360 + ",100%, 50%)";
    });*/

/*d3.selectAll("p")
    .style("color", function(d, i) {
        return (i % 2) ? "#ff0000" : "#0000ff";
    })
    .data([4,8,15,16,23,42,18])
        .style("font-size", function(d, i) {
            return d/2 + "px";
        });

d3.select("#other")
    .selectAll("p.other")
    .data([4,8,15,16,23,42])
    .enter().append("p")
        .text(function(d) { return "I'm number " + d + "!"; });*/

//****** UPDATE ********//
// there are only 3 <p> in <div #other>
// so only the first 3 <p> will get data

var p = d3.select("#other")
    .selectAll("p")
    .data([4, 8, 15, 16, 23, 42])
        .text(function(d) { return d; });

//****** ENTER ********//
// append the remaining pieces of data from the data array
// using the enter() function

p.enter()
    .append("p")
        .text(function(d) { return d + " (I'm appended)"; });

//****** EXIT *******//
// exit() out of the data array
// and remove() the old stuff

p.exit().remove();

d3.selectAll("p").transition()
    .duration(800)
    .delay(function(d,i) { return i * 400})
    .style("color", "#fff")
    .style("background", "#000");
