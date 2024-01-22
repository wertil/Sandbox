const template = document.createElement("template");
template.innerHTML = `
<h3><slot /></h3>
`;


class ToDoItem extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open"});
    shadow.append(template.content.cloneNode(true));
  }
}

customElements.define("todo-item", ToDoItem);