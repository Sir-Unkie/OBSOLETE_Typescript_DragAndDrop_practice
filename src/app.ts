interface Validatable {
  value?: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

// Drag and Drop interfaces
interface Draggable {
  dragStartHandler(event: DragEvent): void;
  dragEndHandler(event: DragEvent): void;
}

interface DragTarget {
  dragOverHandler(event: DragEvent): void;
  dropHandler(event: DragEvent): void;
  dragLeaveHandler(event: DragEvent): void;
}

enum ProjectStatus {
  Active,
  Finished,
}

class Project {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public people: number,
    public projectStatus: ProjectStatus
  ) {}
}

type Listener<T> = (items: T[]) => void;

class State<T> {
  protected listeners: Listener<T>[] = [];

  addListener(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn);
  }
}

class ProjectState extends State<Project> {
  private projects: Project[] = [];
  //   private listeners: Listener[] = [];
  private static instane: ProjectState;

  private constructor() {
    super();
  }

  static getInstance() {
    if (this.instane) {
      return this.instane;
    } else {
      this.instane = new ProjectState();
      return this.instane;
    }
  }

  addListener(listenerFn: Listener<Project>) {
    this.listeners.push(listenerFn);
  }

  addProject(title: string, description: string, numberOfPeople: number) {
    const newproject = new Project(
      Math.random.toString(),
      title,
      description,
      numberOfPeople,
      ProjectStatus.Active
    );
    this.projects.push(newproject);
    console.log(this.listeners);
    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice());
    }
  }
}

const projectState = ProjectState.getInstance();

const validate = (validatableInput: Validatable): boolean => {
  let isValid = true;
  if (validatableInput.required) {
    isValid = isValid && validatableInput.value?.toString().trim().length !== 0;
  }
  if (
    validatableInput.minLength &&
    typeof validatableInput.value === 'string'
  ) {
    isValid =
      isValid &&
      validatableInput.value.trim().length >= validatableInput.minLength;
  }
  if (
    validatableInput.maxLength &&
    typeof validatableInput.value === 'string'
  ) {
    isValid =
      isValid &&
      validatableInput.value.trim().length <= validatableInput.maxLength;
  }
  if (validatableInput.max && typeof validatableInput.value === 'number') {
    isValid = isValid && validatableInput.value <= validatableInput.max;
  }
  if (validatableInput.min && typeof validatableInput.value === 'number') {
    isValid = isValid && validatableInput.value >= validatableInput.min;
  }
  return isValid;
};

// Component base class
abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateElement: HTMLTemplateElement;
  hostElement: T;
  element: U;

  constructor(
    templateId: string,
    hostElementId: string,
    insertAtStart: boolean,
    newElementId?: string
  ) {
    this.templateElement = document.getElementById(
      templateId
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById(hostElementId)! as T;
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    // console.log(importedNode);
    this.element = importedNode.firstElementChild as U;
    if (newElementId) {
      this.element.id = newElementId;
    }
    this.attach(insertAtStart);
  }
  private attach(insertAtBeginning: boolean) {
    if (insertAtBeginning) {
      this.hostElement.insertAdjacentElement('afterbegin', this.element);
    } else {
      this.hostElement.insertAdjacentElement('beforeend', this.element);
    }
  }
  abstract configure(): void;
  abstract renderContent(): void;
}

// Project item component

class ProjectItem
  extends Component<HTMLUListElement, HTMLLIElement>
  implements Draggable
{
  private project: Project;

  get persons() {
    if (this.project.people === 1) {
      return '1 person is assigned';
    } else {
      return `${this.project.people} persons are assigned`;
    }
  }

  constructor(hostId: string, project: Project) {
    super('single-project', hostId, false, project.id);
    this.project = project;

    this.configure();
    this.renderContent();
  }

  dragStartHandler(event: DragEvent) {
    console.log(event);
  }
  dragEndHandler(event: DragEvent) {
    console.log(event);
  }
  configure() {
    this.element.addEventListener(
      'dragstart',
      this.dragStartHandler.bind(this)
    );
    this.element.addEventListener('dragend', this.dragEndHandler.bind(this));
  }

  renderContent() {
    this.element.querySelector('h2')!.textContent = this.project.title;
    this.element.querySelector('h3')!.textContent = this.persons;
    this.element.querySelector('p')!.textContent = this.project.description;
  }
}

class ProjectList extends Component<HTMLDivElement, HTMLElement> {
  assignedProjects: Project[];
  constructor(private type: 'active' | 'finished') {
    super('project-list', 'app', false, `${type}-projects`);
    this.assignedProjects = [];
    this.configure();
    this.renderContent();
  }

  private renderProjects() {
    const listEl = document.getElementById(`${this.type}-projects-list`);
    listEl!.innerHTML = '';
    for (const prjItem of this.assignedProjects) {
      new ProjectItem(this.element.querySelector('ul')!.id, prjItem);
    }
  }

  configure() {
    projectState.addListener((projects: Project[]) => {
      const relevantProjects = projects.filter(elem => {
        if (this.type === 'active') {
          return elem.projectStatus === ProjectStatus.Active;
        } else {
          return elem.projectStatus === ProjectStatus.Finished;
        }
      });
      this.assignedProjects = relevantProjects;
      this.renderProjects();
    });
  }

  renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector('ul')!.id = listId;
    this.element.querySelector('h2')!.textContent =
      this.type.toUpperCase() + ' PROJECTS';
  }
}

class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  button: HTMLButtonElement;
  titleInput: HTMLInputElement;
  descriptionInput: HTMLInputElement;
  peopleInput: HTMLInputElement;

  constructor() {
    super('project-input', 'app', true, 'user-input');
    this.button = this.element.querySelector('#submit')! as HTMLButtonElement;
    this.titleInput = this.element.querySelector('#title')! as HTMLInputElement;
    this.descriptionInput = this.element.querySelector(
      '#description'
    )! as HTMLInputElement;
    this.peopleInput = this.element.querySelector(
      '#people'
    )! as HTMLInputElement;
    this.configure();
  }

  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInput.value;
    const enteredDescription = this.descriptionInput.value;
    const enteredPeople = this.peopleInput.value;

    const titleValidatable: Validatable = {
      value: enteredTitle,
      required: true,
      minLength: 3,
      maxLength: 30,
    };

    const descriptionValidatable: Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 1,
    };

    const peopleValidatable: Validatable = {
      value: +enteredPeople,
      required: true,
      min: 1,
      max: 10,
    };

    if (
      //validate
      !validate(titleValidatable) ||
      !validate(descriptionValidatable) ||
      !validate(peopleValidatable)
    ) {
      alert('incorrect input');
      return;
    }
    return [enteredTitle, enteredDescription, +enteredPeople];
  }

  private clearInputs() {
    this.titleInput.value = '';
    this.descriptionInput.value = '';
    this.peopleInput.value = '';
  }

  private submitHandler(e: Event) {
    e.preventDefault();
    console.log(this.titleInput.value);
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      const [title, description, people] = userInput;
      console.log(description);
      projectState.addProject(title, description, people);
      this.clearInputs();
    }
  }
  renderContent() {}
  configure() {
    this.element.addEventListener('submit', this.submitHandler.bind(this));
  }
}

const project1 = new ProjectInput();
const activeProjectList = new ProjectList('active');
const finishedProjectList = new ProjectList('finished');
