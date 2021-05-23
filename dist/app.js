"use strict";
var ProjectInput = /** @class */ (function () {
    function ProjectInput() {
        this.templateElement = document.getElementById('project-input');
        this.hostElement = document.getElementById('app');
        var importedNode = document.importNode(this.templateElement.content, true);
        // console.log(importedNode);
        this.element = importedNode.firstElementChild;
        this.element.id = 'user-input';
        this.button = this.element.querySelector('#submit');
        this.titleInput = this.element.querySelector('#title');
        this.descriptionInput = this.element.querySelector('#description');
        this.peopleInput = this.element.querySelector('#people');
        this.attach();
        this.configure();
    }
    ProjectInput.prototype.gatherUserInput = function () {
        var enteredTitle = this.titleInput.value;
        var enteredDescription = this.descriptionInput.value;
        var enteredPeople = this.peopleInput.value;
        if (enteredPeople.trim().length === 0 ||
            enteredTitle.trim().length === 0 ||
            enteredDescription.trim().length === 0) {
            alert('Please enter all the fields');
        }
        return [enteredTitle, enteredDescription, +enteredPeople];
    };
    ProjectInput.prototype.submitHandler = function (e) {
        e.preventDefault();
        console.log(this.titleInput.value);
    };
    ProjectInput.prototype.configure = function () {
        this.element.addEventListener('submit', this.submitHandler.bind(this));
    };
    ProjectInput.prototype.attach = function () {
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    };
    return ProjectInput;
}());
var project1 = new ProjectInput();
