class Details extends Event {
  constructor(obj) {
    super(obj);
    this.date = this.obj.date_of_event;
    this.device = this.obj.device[0].openfda.device_name;
  }

  dateSection() {
    const block = document.createElement('div');
    block.className = 'event-details-block';

    const makeDate = (d) => {
      if (d !== undefined) {
        const year = Number(d.substring(0, 4));
        const month = Number(d.substring(4, 6)) - 1;
        const day = Number(d.substring(6, 8));

        const date = new Date(year, month, day).toDateString();
        return date.substring(4);
      }
      return 'Unknown';
    };

    const h2 = document.createElement('h2');
    h2.appendChild(document.createTextNode('Date'));

    const p = document.createElement('p');
    p.appendChild(document.createTextNode(makeDate(this.date)));

    block.appendChild(h2);
    block.appendChild(p);

    return block;
  }

  deviceSection() {
    const block = document.createElement('div');
    block.className = 'event-details-block';

    const h2 = document.createElement('h2');
    h2.appendChild(document.createTextNode('Device'));

    const p = document.createElement('p');
    p.appendChild(document.createTextNode(this.device));

    block.appendChild(h2);
    block.appendChild(p);

    return block;
  }

  appendTo(parent) {
    const el = document.createElement('section');
    el.className = 'event-details';

    const fragment = document.createDocumentFragment();
    fragment.appendChild(this.dateSection());
    fragment.appendChild(this.deviceSection());

    el.appendChild(fragment);

    parent.appendChild(el);
  }
}
