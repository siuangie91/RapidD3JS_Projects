var data = [];
var teams = [];

var table = d3.select('#roster')
	.append('table')
	.classed('table', true);

var thead = table.append('thead').append('tr');

var tbody = table.append('tbody');

var teamSelector = d3.select('#page-title')
	.append('select')
	.on('change', function() {
		selectTeam(this.value);
	})
	.attr('id', 'team-selector');

var positions = {
	G: "Goalkeeper",
	D: "Defender",
	M: "Midfielder",
	F: "Forward"
};

var columns = ["No", "Name", "Pos"];

function reload() {
	d3.tsv('eng2-rosters.tsv', function (rows) {
		data = rows;
		data.forEach(function(d) {
			d.Pos = positions[d.Pos];
			if(teams.indexOf(d.TeamID) < 0) {
				teams.push(d.TeamID);
				teams[d.TeamID] = d.Team;
			};
		});

		teamSelector.selectAll("option")
			.data(teams)
			.enter()
			.append("option")
			.attr("value", function (d) { return d;	})
			.text(function(d) { return teams[d]; })
			.sort(function(a,b) { return d3.ascending(a,b); });

		selectTeam("afc-wimbledon");
	});
};

function redraw(roster) {
	thead.selectAll("th")
		.data(columns)
		.enter()
		.append("th")
		.on('click', function(d) {
			tbody.selectAll('tr')
				.sort(function(a,b) {
					return (d === "No") ? d3.ascending(Number(a[d]), Number(b[d])) : d3.ascending(a[d], b[d]);
				})
				.style('background-color', function (d,i) {
					return (i % 2) ? 'white' : '#dedede';
				});
		})
		.text(function(d) { return d; });

	var rows = tbody.selectAll("tr")
		.data(roster);
	rows.enter().append("tr")
		.style('background-color', function (d,i) {
			return (i % 2) ? 'white' : '#dedede';
		});
	rows.exit().remove();

	var cells = rows.selectAll("td")
		.data(function(row) {
			var values = [];
			columns.forEach(function (d) {
				values.push(row[d]);
			});
			return values;
		});
	cells.enter().append("td");
	cells.text(function(d) { return d; });
};

function selectTeam (teamId) {
	var roster = data.filter(function(d) {
		return d['TeamID'] == teamId;
	});
	d3.select('#team-name').text(teams[teamId] + " Roster");
	document.getElementById('team-selector').value = teamId;
	redraw(roster);
}

reload();
