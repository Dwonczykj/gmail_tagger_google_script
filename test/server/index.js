import d3 from 'd3';

const dataSet = async function getData() {
  return await fetch('/api/data');
};
async function drawChart() {
  const data = await dataSet();
  const svgWidth = 500;
  const svgHeight = 500;
  const barPadding = 5;
  const barWidth = svgWidth / data.data.length;

  const svg = d3.select('svg');
  const width = svg.attr('width', svgWidth).attr('height', svgHeight);

  svg
    .selectAll('rect')
    .data(data.data)
    .enter()
    .append('rect')
    .attr('y', (d) => svgHeight - d)
    .attr('height', (d) => d)
    .attr('width', () => barWidth - barPadding)
    .attr('transform', (d, i) => {
      const translate = [barWidth * i, 0];
      return `translate(${translate})`;
    })
    .style('fill', 'steelblue');
}
drawChart();
