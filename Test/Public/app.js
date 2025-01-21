document.addEventListener('DOMContentLoaded', () => {
  const player1Dropdown = document.getElementById('player1');
  const lineChartContainer = document.getElementById('lineChart');
  const scatterChartContainer = document.getElementById('scatterChart');

  // Fetch players and populate the dropdown
  fetch('/api/players')
    .then((response) => response.json())
    .then((players) => {
      if (!players || players.length === 0) {
        console.error('No players found in the response');
        return;
      }

      // Populate the dropdown
      players.forEach((player) => {
        const playerName = player.PLAYER_NAME || player.player_name; 

        if (!playerName || playerName.trim() === '') {
          console.error('Invalid player name:', player);
          return;
        }

        const option = document.createElement('option');
        option.value = playerName;
        option.textContent = playerName;

        player1Dropdown.appendChild(option);
      });
    })
    .catch((error) => {
      console.error('Error fetching players:', error);
    });

  // Helper to clear the chart container
  const clearChart = (container) => {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  };

  // Draw a line chart with D3
  const drawLineChart = (data, container, color) => {
    console.log('Raw Data:', data);
  
    // Filter invalid data
    const filteredData = data.filter(
      (d) => d.season_id && !isNaN(d.ppg)
    );
    console.log('Filtered Data:', filteredData);
  
    clearChart(container);
  
    // Dimensions
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;
  
    // Create SVG
    const svg = d3.select(container)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
  
    // Scales
    const x = d3.scalePoint()
      .domain(filteredData.map((d) => String(d.season_id))) 
      .range([0, width]);
  
    const y = d3.scaleLinear()
      .domain([0, d3.max(filteredData, (d) => d.ppg)])
      .nice()
      .range([height, 0]);
  
    console.log('X Domain:', x.domain());
    console.log('Y Domain:', y.domain());
  
    // Axes
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));
  
    svg.append('g').call(d3.axisLeft(y));
  
    // Line generator
    const line = d3.line()
      .x((d) => {
        const xValue = x(d.season_id);
        console.log('Mapping season_id:', d.season_id, 'to x:', xValue);
        return xValue;
      })
      .y((d) => {
        const yValue = y(d.ppg);
        console.log('Mapping points_per_game:', d.ppg, 'to y:', yValue);
        return yValue;
      });
  
    // Add path
    svg.append('path')
      .datum(filteredData)
      .attr('fill', 'none')
      .attr('stroke', color)
      .attr('stroke-width', 2)
      .attr('d', line);
  };
  

  // Draw a scatter plot with D3
  const drawScatterPlot = (data, container) => {
    clearChart(container);

    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select(container)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear()
      .domain([0, d3.max(data, (d) => d.ppg)])
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, (d) => d.fg_pct)])
      .range([height, 0]);

    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    svg.append('g').call(d3.axisLeft(y));

    svg.selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', (d) => x(d.ppg))
      .attr('cy', (d) => y(d.fg_pct))
      .attr('r', 5)
      .attr('fill', 'blue');
  };

  // Event listener to update charts when a player is selected
  player1Dropdown.addEventListener('change', () => {
    const player = player1Dropdown.value;
    if (!player) return;

    fetch(`/api/stats/${player}`)
      .then((response) => response.json())
      .then((data) => {
        drawLineChart(data, lineChartContainer, 'steelblue');
        drawScatterPlot(data, scatterChartContainer);
      })
      .catch((error) => {
        console.error('Error fetching stats:', error);
      });
  });
});
