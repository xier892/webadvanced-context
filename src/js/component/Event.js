class Event {
  constructor(obj) {
    this.obj = obj;
  }

  appendTo(parent) {
    const el = document.createElement('article');
    el.className = 'event';

    const details = new Details(this.obj);
    const description = new Description(this.obj);
    const statistics = new Statistics(this.obj);

    details.appendTo(el);
    description.appendTo(el);
    statistics.appendTo(el);

    parent.appendChild(el);
  }
}
