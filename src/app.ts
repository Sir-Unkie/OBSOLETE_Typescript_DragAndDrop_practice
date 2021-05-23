class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  button: HTMLButtonElement;
  titleInput: HTMLInputElement;
  descriptionInput: HTMLInputElement;
  peopleInput: HTMLInputElement;

  constructor() {
    this.templateElement = document.getElementById(
      'project-input'
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById('app')! as HTMLDivElement;
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    // console.log(importedNode);
    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.element.id = 'user-input';
    this.button = this.element.querySelector('#submit')! as HTMLButtonElement;
    this.titleInput = this.element.querySelector('#title')! as HTMLInputElement;
    this.descriptionInput = this.element.querySelector(
      '#description'
    )! as HTMLInputElement;
    this.peopleInput = this.element.querySelector(
      '#people'
    )! as HTMLInputElement;
    this.attach();

    this.configure();
  }

  private gatherUserInput(): [string, string, number] {
    const enteredTitle = this.titleInput.value;
    const enteredDescription = this.descriptionInput.value;
    const enteredPeople = this.peopleInput.value;

    if (
      enteredPeople.trim().length === 0 ||
      enteredTitle.trim().length === 0 ||
      enteredDescription.trim().length === 0
    ) {
      alert('Please enter all the fields');
    }
    return [enteredTitle, enteredDescription, +enteredPeople];
  }

  private submitHandler(e: Event) {
    e.preventDefault();
    console.log(this.titleInput.value);
  }

  private configure() {
    this.element.addEventListener('submit', this.submitHandler.bind(this));
  }

  private attach() {
    this.hostElement.insertAdjacentElement('afterbegin', this.element);
  }
}

const project1 = new ProjectInput();
