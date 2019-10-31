class Description extends Event {
  constructor(obj) {
    super(obj);
    this.description = this.obj.mdr_text.filter((arr) => arr.text_type_code === 'Description of Event or Problem')[0].text;
  }

  descriptionSection() {
    const fragment = document.createDocumentFragment();

    const h2 = document.createElement('h2');
    h2.appendChild(document.createTextNode('Description of event or problem'));

    const p = document.createElement('p');
    p.appendChild(document.createTextNode(convertToSentenceCase(this.description)));

    fragment.appendChild(h2);
    fragment.appendChild(p);

    return fragment;
  }

  appendTo(parent) {
    const el = document.createElement('section');
    el.className = 'event-description';

    el.appendChild(this.descriptionSection());

    parent.appendChild(el);
  }
}
