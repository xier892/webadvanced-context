const renderBarGraph = (data, max) => {
  const bar = d3.select('.bar-container').selectAll('div')
    .data([data]);
  bar.enter().append('div')
    .attr('class', 'bar')
    .style('width', `${data / max * 100}%`);

  const scale = d3.select('.bar-graph-scale').selectAll('span')
    .data([0, max]);
  scale.enter().append('span')
    .merge(scale)
    .text((d) => d);
};
