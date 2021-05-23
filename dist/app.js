"use strict";
var validate = function (validatableInput) {
    var _a;
    var isValid = true;
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
var ProjectList = /** @class */ (function () {
    function ProjectList(type) {
        this.type = type;
        this.templateElement = document.getElementById('project-list');
        this.hostElement = document.getElementById('app');
        var importedNode = document.importNode(this.templateElement.content, true);
        // console.log(importedNode);
        this.element = importedNode.firstElementChild;
        this.element.id = this.type + "-projects";
        this.attach();
        this.renderContent();
    }
    ProjectList.prototype.attach = function () {
        this.hostElement.insertAdjacentElement('beforeend', this.element);
    };
    ProjectList.prototype.renderContent = function () {
        var listId = this.type + "-projects-list";
        this.element.querySelector('ul').id = listId;
        this.element.querySelector('h2').textContent =
            this.type.toUpperCase() + ' PROJECTS';
    };
    return ProjectList;
}());
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
        var titleValidatable = {
            value: enteredTitle,
            required: true,
            minLength: 3,
            maxLength: 10,
        };
        var descriptionValidatable = {
            value: enteredDescription,
            required: true,
            minLength: 1,
        };
        var peopleValidatable = {
            value: +enteredPeople,
            required: true,
            min: 1,
            max: 5,
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
    };
    ProjectInput.prototype.clearInputs = function () {
        this.titleInput.value = '';
        this.descriptionInput.value = '';
        this.peopleInput.value = '';
    };
    ProjectInput.prototype.submitHandler = function (e) {
        e.preventDefault();
        console.log(this.titleInput.value);
        var userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            var title = userInput[0], description = userInput[1], people = userInput[2];
            console.log(description);
            this.clearInputs();
        }
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
var activeProjectList = new ProjectList('active');
var finishedProjectList = new ProjectList('finished');
