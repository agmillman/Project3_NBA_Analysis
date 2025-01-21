document.addEventListener('DOMContentLoaded', () => {
  const player1Dropdown = document.getElementById('player1');
  const lineChartContainer = document.getElementById('lineChart');
  const scatterChartContainer = document.getElementById('scatterChart');
  const stackedBarChartContainer = document.getElementById('stackedBarChart');

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

   // Fetch shot zone data
   const fetchShotZoneData = (player) => {
    return fetch(`/api/shot-zones/${player}`)
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error fetching shot zone data:', error);
      });
  };

// Draw a multi-line chart with D3
const drawMultiLineChart = (data, container, metrics, colors) => {
  console.log('Raw Data:', data);

  // Filter invalid data
  const filteredData = data.filter((d) =>
    metrics.every((metric) => d.season_id && !isNaN(d[metric]))
  );
  console.log('Filtered Data:', filteredData);

  clearChart(container);

  // Dimensions
  const margin = { top: 40, right: 30, bottom: 50, left: 60 };
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
    .domain([
      0,
      d3.max(filteredData, (d) => Math.max(...metrics.map((metric) => d[metric]))),
    ])
    .nice()
    .range([height, 0]);

  // Add axes
  svg.append('g')
    .attr('transform', `translate(0,${height})`)
    .call(d3.axisBottom(x))
    .append('text') // X-axis label
    .attr('x', width / 2)
    .attr('y', 40)
    .attr('fill', 'black')
    .style('font-size', '12px')
    .style('font-weight', 'bold')
    .style('text-anchor', 'middle')
    .text('Season');

  svg.append('g')
    .call(d3.axisLeft(y))
    .append('text') // Y-axis label
    .attr('x', -height / 2)
    .attr('y', -50)
    .attr('transform', 'rotate(-90)')
    .attr('fill', 'black')
    .style('font-size', '12px')
    .style('text-anchor', 'middle')
    .style('font-weight', 'bold')
    .text('Attempts');

  // Add chart title
  svg.append('text')
    .attr('x', width / 2)
    .attr('y', -10)
    .attr('fill', 'black')
    .style('font-size', '16px')
    .style('text-anchor', 'middle')
    .style('font-weight', 'bold')
    .text('Field Goal Attempts by Type and Season');

  // Generate a line for each metric
  metrics.forEach((metric, index) => {
    const line = d3.line()
      .x((d) => x(d.season_id))
      .y((d) => y(d[metric]));

    // Add the path for the line
    svg.append('path')
      .datum(filteredData)
      .attr('fill', 'none')
      .attr('stroke', colors[index])
      .attr('stroke-width', 2)
      .attr('d', line);

    // Add a legend for each line
    svg.append('text')
      .attr('x', width - 1)
      .attr('y', margin.top + index * 20)
      .attr('fill', colors[index])
      .style('font-size', '12px')
      .style('font-weight', 'bold')
      .text(metric.toUpperCase());
  });
}; 

 // Draw a scatter plot with D3
const drawScatterPlot = (data, container) => {
  clearChart(container);

  const margin = { top: 40, right: 30, bottom: 50, left: 60 };
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
    .domain([0, d3.max(data, (d) => d.fg3_pct)])
    .range([height, 0]);

  svg.append('g')
    .attr('transform', `translate(0,${height})`)
    .call(d3.axisBottom(x))
    .append('text') // X-axis label
    .attr('x', width / 2)
    .attr('y', 40)
    .attr('fill', 'black')
    .style('font-size', '12px')
    .style('font-weight', 'bold')
    .style('text-anchor', 'middle')
    .text('Points Per Game');
  
  svg.append('g')
    .call(d3.axisLeft(y))
    .append('text') // Y-axis label
    .attr('x', -height / 2)
    .attr('y', -50)
    .attr('transform', 'rotate(-90)')
    .attr('fill', 'black')
    .style('font-size', '12px')
    .style('font-weight', 'bold')
    .style('text-anchor', 'middle')
    .text('3-Point Field Goal Percentage');

  svg.append('text')
    .attr('x', width / 2)
    .attr('y', -10)
    .attr('fill', 'black')
    .style('font-size', '16px')
    .style('text-anchor', 'middle')
    .style('font-weight', 'bold')
    .text('Points Per Game vs 3-Point Field Goal % by Season');
  
  svg.append('g')
    .attr('transform', `translate(0,${height})`)
    .call(d3.axisBottom(x));

  svg.append('g').call(d3.axisLeft(y));

  // Add tooltip element
  const tooltip = d3.select(container)
    .append('div')
    .style('position', 'absolute')
    .style('background', '#fff')
    .style('border', '1px solid #ccc')
    .style('padding', '5px')
    .style('border-radius', '5px')
    .style('pointer-events', 'none')
    .style('visibility', 'hidden');

  // Draw circles and add interactivity
  svg.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', (d) => x(d.ppg))
    .attr('cy', (d) => y(d.fg3_pct))
    .attr('r', 5)
    .attr('fill', 'blue')
    .on('mouseover', (event, d) => {
      tooltip
        .html(`Year: ${d.season_id}`)
        .style('left', `${event.pageX + 10}px`)
        .style('top', `${event.pageY - 20}px`)
        .style('visibility', 'visible');
    })
    .on('mouseout', () => {
      tooltip.style('visibility', 'hidden');
    });
};

  // Define drawStackedBarChart at the top level
  const drawStackedBarChart = (data, container) => {
    clearChart(container);

    const margin = { top: 40, right: 30, bottom: 50, left: 60 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select(container)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Process the data
    const groupedData = d3.group(data, (d) => d.season_id);
    const shotZones = Array.from(new Set(data.map((d) => d.shot_zone)));
    const seasons = Array.from(groupedData.keys());

    const stackedData = seasons.map((season) => {
      const seasonData = groupedData.get(season);
      const zoneData = Object.fromEntries(
        shotZones.map((zone) => [
          zone,
          (seasonData.find((d) => d.shot_zone === zone)?.shots) || 0,
        ])
      );
      return { season_id: season, ...zoneData };
    });

    // Scales
    const x = d3.scaleBand()
      .domain(seasons)
      .range([0, width])
      .padding(0.2);

    const y = d3.scaleLinear()
      .domain([0, d3.max(stackedData, (d) => d3.sum(shotZones, (zone) => d[zone]))])
      .nice()
      .range([height, 0]);

    const color = d3.scaleOrdinal()
      .domain(shotZones)
      .range(d3.schemeCategory10);

    // Add axes
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    svg.append('g').call(d3.axisLeft(y));

    // Add stacks
    const stackGenerator = d3.stack()
      .keys(shotZones)
      .order(d3.stackOrderNone)
      .offset(d3.stackOffsetNone);

    const stacks = stackGenerator(stackedData);

    svg.selectAll('g.layer')
      .data(stacks)
      .enter()
      .append('g')
      .attr('class', 'layer')
      .attr('fill', (d) => color(d.key))
      .selectAll('rect')
      .data((d) => d)
      .enter()
      .append('rect')
      .attr('x', (d) => x(d.data.season_id))
      .attr('y', (d) => y(d[1]))
      .attr('height', (d) => y(d[0]) - y(d[1]))
      .attr('width', x.bandwidth());

    // Add legend
    const legend = svg.append('g').attr('transform', `translate(${width - 100}, 0)`);

    shotZones.forEach((zone, i) => {
      legend
        .append('rect')
        .attr('x', 0)
        .attr('y', i * 20)
        .attr('width', 15)
        .attr('height', 15)
        .attr('fill', color(zone));

      legend
        .append('text')
        .attr('x', 20)
        .attr('y', i * 20 + 12)
        .style('font-size', '12px')
        .text(zone);
    });

    // Add chart title
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', -10)
      .attr('text-anchor', 'middle')
      .style('font-size', '16px')
      .style('font-weight', 'bold')
      .text('Shot Zones by Season');
  };

  // Event listener to update charts when a player is selected
  player1Dropdown.addEventListener('change', () => {
    const player = player1Dropdown.value;
    if (!player) return;

    fetch(`/api/stats/${player}`)
      .then((response) => response.json())
      .then((data) => {
        drawMultiLineChart(data, lineChartContainer, ['fga', 'fg3a'], ['steelblue', 'orange']);
        drawScatterPlot(data, scatterChartContainer);
      })
      .catch((error) => {
        console.error('Error fetching stats:', error);
      });
  });

  // Event listener to update charts when a player is selected
  player1Dropdown.addEventListener('change', () => {
    const player = player1Dropdown.value;
    if (!player) return;

    fetchShotZoneData(player).then((data) => {
      drawStackedBarChart(data, stackedBarChartContainer);
    });
  });
  
});
