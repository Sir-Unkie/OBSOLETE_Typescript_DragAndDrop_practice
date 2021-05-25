import { Component } from './base-component.js';
import { validate } from '../Validation/validation.js';
import { projectState } from '../State/state.js';
export class ProjectInput extends Component {
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
