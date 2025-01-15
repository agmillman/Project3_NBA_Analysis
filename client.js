window.onload = async function () {
    const playerSelect = document.getElementById('playerSelect');

    // Fetch player data from the server (via the '/players' route)
    const response = await fetch('/players');
    const players = await response.json();

    // Populate dropdown with player names
    players.forEach(player => {
        const option = document.createElement('option');
        option.value = player.id;
        option.textContent = `${player.first_name} ${player.last_name}`;
        playerSelect.appendChild(option);
    });

    // Event listener for dropdown change
    playerSelect.onchange = async function () {
        const playerId = playerSelect.value;
        const statsResponse = await fetch(`/player-stats?playerId=${playerId}`);
        const stats = await statsResponse.json();

        // Render chart using D3.js
        const svg = d3.select('svg');
        svg.selectAll('*').remove(); // Clear previous chart

        const data = stats.map(d => ({
            season: parseInt(d.season),
            ppg: d.pts
        }));

        const x = d3.scaleLinear().domain([2013, 2023]).range([50, 750]);
        const y = d3.scaleLinear().domain([0, d3.max(data, d => d.ppg)]).range([350, 50]);

        svg.append('g').attr('transform', 'translate(0,350)').call(d3.axisBottom(x).tickFormat(d3.format('d')));
        svg.append('g').attr('transform', 'translate(50,0)').call(d3.axisLeft(y));

        const line = d3.line().x(d => x(d.season)).y(d => y(d.ppg));

        svg.append('path').datum(data).attr('fill', 'none').attr('stroke', 'blue').attr('stroke-width', 2).attr('d', line);
    };
};
