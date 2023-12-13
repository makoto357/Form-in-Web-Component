const template = document.createElement('template');
template.innerHTML = `
  <style>
    label {
      color: red
    }
    .description {
      font-size: 0.5rem
    }

  </style>
  <label>
    <input type="checkbox">
      <slot></slot>
      <span class="description"><slot name="description"></slot></span>
    </input>
  </label>
`;

class ToDoItem extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({mode: 'open'});
    this.getAttribute('checked');
    shadow.appendChild(template.content.cloneNode(true));
    this.checkbox = shadow.querySelector('input');
  }
  static get observedAttributes() {
    return ['checked'];
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'checked') this.updateChecked(newValue);
    console.log(name, oldValue, newValue);
  }
  connectedCallback() {
    console.log('connected');
  }
  disconnectedCallback() {
    console.log('disconnected');
  }
  updateChecked(value) {
    this.checkbox.checked = value !== null && value !== false;
  }
}

customElements.define('todo-item', ToDoItem);
