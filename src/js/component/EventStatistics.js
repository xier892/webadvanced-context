class Statistics extends Event {
  constructor(obj) {
    super(obj);
    this.device = this.obj.device[0].openfda.device_name;
    this.fatalitiesCount = '';
    this.maxFatalitiesCount = '';
  }

  set fatalities(n) {
    this.fatalitiesCount = n;
  }

  set maxFatalities(n) {
    this.maxFatalitiesCount = n;
  }

  get fatalities() {
    return this.fatalitiesCount;
  }

  get maxFatalities() {
    return this.maxFatalitiesCount;
  }

  stringSection() {
    const block = document.createElement('div');
    block.className = 'event-statistics-block';

    const h2 = document.createElement('h2');
    h2.appendChild(document.createTextNode('Statistics'));

    const p = document.createElement('p');
    if (this.fatalities !== undefined) {
      const fatalitiesCount = document.createElement('strong');
      fatalitiesCount.appendChild(document.createTextNode(this.fatalitiesCount));
      p.appendChild(fatalitiesCount);
      p.appendChild(document.createTextNode(' reported fatalities have been caused by this kind of device'));
    } else {
      p.appendChild(document.createTextNode('No statistics are availble for this device.'));
    }

    block.appendChild(h2);
    block.appendChild(p);

    return block;
  }

  graphSection() {
    const block = document.createElement('div');
    block.className = 'event-statistics-block';

    if (this.fatalities !== undefined) {
      const figure = document.createElement('figure');
      figure.className = 'bar-graph';

      const container = document.createElement('div');
      container.className = 'bar-container';

      const scale = document.createElement('div');
      scale.className = 'bar-graph-scale';

      figure.appendChild(container);
      figure.appendChild(scale);

      block.appendChild(figure);

      const bar = d3.select(container).selectAll('div')
        .data([this.fatalities]);
      bar.enter().append('div')
        .attr('class', 'bar')
        .style('width', `${this.fatalities / this.maxFatalities * 100}%`);

      const scl = d3.select(scale).selectAll('span')
        .data([0, this.maxFatalities]);
      scl.enter().append('span')
        .merge(scl)
        .text((d) => d);
    }

    return block;
  }

  appendTo(parent) {
    const el = document.createElement('section');
    el.className = 'event-statistics';

    sendHttpRequest(URL.DEVICENAMES, (response) => {
      if (response.results.filter((arr) => arr.term === this.device).length > 0) {
        this.fatalities = response.results.filter((arr) => arr.term === this.device)[0].count;
      } else {
        this.fatalities = undefined;
      }
      this.maxFatalities = response.results[0].count;

      el.appendChild(this.stringSection());
      el.appendChild(this.graphSection());

      parent.appendChild(el);
    });
  }
}
