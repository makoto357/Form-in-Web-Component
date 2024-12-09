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
    super(); // to call HTMLElement constructor
    // shouldn't use .innerHTML inside custom component, to prevent interoperatability
    // attach a shadow DOM (with open mode to make DOM modifications from outside the custom element)
    const shadow = this.attachShadow({mode: 'open'});
    this.getAttribute('checked');
    //  shadow is equal to this.shadowRoot (is null if attachShadow is in closed mode)
    shadow.appendChild(template.content.cloneNode(true));
    // this.title = shadow.querySelector('[data-title]');
    // this.title.innerText = this.innerText;

    // declare the following line, so this.checkbox can be used in updateChecked()
    this.checkbox = shadow.querySelector('input');
  }
  // observe an attribute, before calling the attributeChangedCallback() method
  static get observedAttributes() {
    return ['checked'];
  }
  attributeChangedCallback(name, oldValue, newValue) {
    // attribute set on DOM element and manipulated inside the shadow DOM
    // name is equal to the attribute name whose value has changed
    if (name === 'checked') this.updateChecked(newValue);
    console.log(name, oldValue, newValue);
  }
  connectedCallback() {
    console.log('connected');
  }
  disconnectedCallback() {
    console.log('disconnected');
  }
  // create a function to update checked property
  updateChecked(value) {
    this.checkbox.checked = value !== null && value !== false;
  }
}

// register custom element with the DOM
// The first argument is the name of the custom element, and the second argument is the defined class.
// element name needs to conform to normal HTML attribute property, and with at least 1 hyphen to differentiate itself from html tags
customElements.define('todo-item', ToDoItem);
const item = document.querySelector('todo-item');
item.remove();
