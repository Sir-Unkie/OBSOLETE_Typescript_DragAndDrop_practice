"use strict";
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
    ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";
})(ProjectStatus || (ProjectStatus = {}));
class Project {
    constructor(id, title, description, people, projectStatus) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.people = people;
        this.projectStatus = projectStatus;
    }
}
class State {
    constructor() {
        this.listeners = [];
    }
    addListener(listenerFn) {
        this.listeners.push(listenerFn);
    }
}
class ProjectState extends State {
    constructor() {
        super();
        this.projects = [];
    }
    static getInstance() {
        if (this.instane) {
            return this.instane;
        }
        else {
            this.instane = new ProjectState();
            return this.instane;
        }
    }
    addListener(listenerFn) {
        this.listeners.push(listenerFn);
    }
    addProject(title, description, numberOfPeople) {
        const newproject = new Project(Math.random().toString(), title, description, numberOfPeople, ProjectStatus.Active);
        this.projects.push(newproject);
        console.log(this.listeners);
        this.updateListeners();
    }
    moveProject(projectId, newStatus) {
        const project = this.projects.find(el => {
            return el.id === projectId;
        });
        if (project && project.projectStatus !== newStatus) {
            console.log('yeeees');
            project.projectStatus = newStatus;
            this.updateListeners();
        }
    }
    updateListeners() {
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice());
        }
    }
}
const projectState = ProjectState.getInstance();
const validate = (validatableInput) => {
    var _a;
    let isValid = true;
    if (validatableInput.required) {
        isValid = isValid && ((_a = validatableInput.value) === null || _a === void 0 ? void 0 : _a.toString().trim().length) !== 0;
    }
    if (validatableInput.minLength &&
        typeof validatableInput.value === 'string') {
        isValid =
            isValid &&
                validatableInput.value.trim().length >= validatableInput.minLength;
    }
    if (validatableInput.maxLength &&
        typeof validatableInput.value === 'string') {
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
class Component {
    constructor(templateId, hostElementId, insertAtStart, newElementId) {
        this.templateElement = document.getElementById(templateId);
        this.hostElement = document.getElementById(hostElementId);
        const importedNode = document.importNode(this.templateElement.content, true);
        // console.log(importedNode);
        this.element = importedNode.firstElementChild;
        if (newElementId) {
            this.element.id = newElementId;
        }
        this.attach(insertAtStart);
    }
    attach(insertAtBeginning) {
        if (insertAtBeginning) {
            this.hostElement.insertAdjacentElement('afterbegin', this.element);
        }
        else {
            this.hostElement.insertAdjacentElement('beforeend', this.element);
        }
    }
}
// Project item component
class ProjectItem extends Component {
    constructor(hostId, project) {
        super('single-project', hostId, false, project.id);
        this.project = project;
        this.configure();
        this.renderContent();
    }
    get persons() {
        if (this.project.people === 1) {
            return '1 person is assigned';
        }
        else {
            return `${this.project.people} persons are assigned`;
        }
    }
    dragStartHandler(event) {
        // console.log(event);
        event.dataTransfer.setData('text/plain', this.project.id);
        event.dataTransfer.effectAllowed = 'move';
        console.log(this.project.id);
    }
    dragEndHandler(event) {
        // console.log(event);
    }
    configure() {
        this.element.addEventListener('dragstart', this.dragStartHandler.bind(this));
        this.element.addEventListener('dragend', this.dragEndHandler.bind(this));
    }
    renderContent() {
        this.element.querySelector('h2').textContent = this.project.title;
        this.element.querySelector('h3').textContent = this.persons;
        this.element.querySelector('p').textContent = this.project.description;
    }
}
class ProjectList extends Component {
    constructor(type) {
        super('project-list', 'app', false, `${type}-projects`);
        this.type = type;
        this.assignedProjects = [];
        this.configure();
        this.renderContent();
    }
    dragOverHandler(event) {
        if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
            event.preventDefault();
            const lisEl = this.element.querySelector('ul');
            lisEl.classList.add('droppable');
        }
    }
    dragLeaveHandler(event) {
        event.preventDefault();
        const lisEl = this.element.querySelector('ul');
        lisEl.classList.remove('droppable');
    }
    dropHandler(event) {
        console.log('dropped');
        const prjId = event.dataTransfer.getData('text/plain');
        projectState.moveProject(prjId, this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished);
    }
    renderProjects() {
        const listEl = document.getElementById(`${this.type}-projects-list`);
        listEl.innerHTML = '';
        for (const prjItem of this.assignedProjects) {
            new ProjectItem(this.element.querySelector('ul').id, prjItem);
        }
    }
    configure() {
        this.element.addEventListener('dragover', this.dragOverHandler.bind(this), false);
        this.element.addEventListener('dragleave', this.dragLeaveHandler.bind(this));
        this.element.addEventListener('drop', this.dropHandler.bind(this));
        projectState.addListener((projects) => {
            const relevantProjects = projects.filter(elem => {
                if (this.type === 'active') {
                    return elem.projectStatus === ProjectStatus.Active;
                }
                else {
                    return elem.projectStatus === ProjectStatus.Finished;
                }
            });
            this.assignedProjects = relevantProjects;
            this.renderProjects();
        });
    }
    renderContent() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector('ul').id = listId;
        this.element.querySelector('h2').textContent =
            this.type.toUpperCase() + ' PROJECTS';
    }
}
class ProjectInput extends Component {
    constructor() {
        super('project-input', 'app', true, 'user-input');
        this.button = this.element.querySelector('#submit');
        this.titleInput = this.element.querySelector('#title');
        this.descriptionInput = this.element.querySelector('#description');
        this.peopleInput = this.element.querySelector('#people');
        this.configure();
    }
    gatherUserInput() {
        const enteredTitle = this.titleInput.value;
        const enteredDescription = this.descriptionInput.value;
        const enteredPeople = this.peopleInput.value;
        const titleValidatable = {
            value: enteredTitle,
            required: true,
            minLength: 3,
            maxLength: 30,
        };
        const descriptionValidatable = {
            value: enteredDescription,
            required: true,
            minLength: 1,
        };
        const peopleValidatable = {
            value: +enteredPeople,
            required: true,
            min: 1,
            max: 10,
        };
        if (
        //validate
        !validate(titleValidatable) ||
            !validate(descriptionValidatable) ||
            !validate(peopleValidatable)) {
            alert('incorrect input');
            return;
        }
        return [enteredTitle, enteredDescription, +enteredPeople];
    }
    clearInputs() {
        this.titleInput.value = '';
        this.descriptionInput.value = '';
        this.peopleInput.value = '';
    }
    submitHandler(e) {
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
    renderContent() { }
    configure() {
        this.element.addEventListener('submit', this.submitHandler.bind(this));
    }
}
const project1 = new ProjectInput();
const activeProjectList = new ProjectList('active');
const finishedProjectList = new ProjectList('finished');
