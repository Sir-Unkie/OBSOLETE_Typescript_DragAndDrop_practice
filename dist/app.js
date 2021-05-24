"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
    ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";
})(ProjectStatus || (ProjectStatus = {}));
var Project = /** @class */ (function () {
    function Project(id, title, description, people, projectStatus) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.people = people;
        this.projectStatus = projectStatus;
    }
    return Project;
}());
var State = /** @class */ (function () {
    function State() {
        this.listeners = [];
    }
    State.prototype.addListener = function (listenerFn) {
        this.listeners.push(listenerFn);
    };
    return State;
}());
var ProjectState = /** @class */ (function (_super) {
    __extends(ProjectState, _super);
    function ProjectState() {
        var _this = _super.call(this) || this;
        _this.projects = [];
        return _this;
    }
    ProjectState.getInstance = function () {
        if (this.instane) {
            return this.instane;
        }
        else {
            this.instane = new ProjectState();
            return this.instane;
        }
    };
    ProjectState.prototype.addListener = function (listenerFn) {
        this.listeners.push(listenerFn);
    };
    ProjectState.prototype.addProject = function (title, description, numberOfPeople) {
        var newproject = new Project(Math.random.toString(), title, description, numberOfPeople, ProjectStatus.Active);
        this.projects.push(newproject);
        console.log(this.listeners);
        for (var _i = 0, _a = this.listeners; _i < _a.length; _i++) {
            var listenerFn = _a[_i];
            listenerFn(this.projects.slice());
        }
    };
    return ProjectState;
}(State));
var projectState = ProjectState.getInstance();
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
// Component base class
var Component = /** @class */ (function () {
    function Component(templateId, hostElementId, insertAtStart, newElementId) {
        this.templateElement = document.getElementById(templateId);
        this.hostElement = document.getElementById(hostElementId);
        var importedNode = document.importNode(this.templateElement.content, true);
        // console.log(importedNode);
        this.element = importedNode.firstElementChild;
        if (newElementId) {
            this.element.id = newElementId;
        }
        this.attach(insertAtStart);
    }
    Component.prototype.attach = function (insertAtBeginning) {
        if (insertAtBeginning) {
            this.hostElement.insertAdjacentElement('afterbegin', this.element);
        }
        else {
            this.hostElement.insertAdjacentElement('beforeend', this.element);
        }
    };
    return Component;
}());
// Project item component
var ProjectItem = /** @class */ (function (_super) {
    __extends(ProjectItem, _super);
    function ProjectItem(hostId, project) {
        var _this = _super.call(this, 'single-project', hostId, false, project.id) || this;
        _this.project = project;
        _this.configure();
        _this.renderContent();
        return _this;
    }
    Object.defineProperty(ProjectItem.prototype, "persons", {
        get: function () {
            if (this.project.people === 1) {
                return '1 person is assigned';
            }
            else {
                return this.project.people + " persons are assigned";
            }
        },
        enumerable: false,
        configurable: true
    });
    ProjectItem.prototype.configure = function () { };
    ProjectItem.prototype.renderContent = function () {
        this.element.querySelector('h2').textContent = this.project.title;
        this.element.querySelector('h3').textContent = this.persons;
        this.element.querySelector('p').textContent = this.project.description;
    };
    return ProjectItem;
}(Component));
var ProjectList = /** @class */ (function (_super) {
    __extends(ProjectList, _super);
    function ProjectList(type) {
        var _this = _super.call(this, 'project-list', 'app', false, type + "-projects") || this;
        _this.type = type;
        _this.assignedProjects = [];
        _this.configure();
        _this.renderContent();
        return _this;
    }
    ProjectList.prototype.renderProjects = function () {
        var listEl = document.getElementById(this.type + "-projects-list");
        listEl.innerHTML = '';
        for (var _i = 0, _a = this.assignedProjects; _i < _a.length; _i++) {
            var prjItem = _a[_i];
            new ProjectItem(this.element.querySelector('ul').id, prjItem);
        }
    };
    ProjectList.prototype.configure = function () {
        var _this = this;
        projectState.addListener(function (projects) {
            var relevantProjects = projects.filter(function (elem) {
                if (_this.type === 'active') {
                    return elem.projectStatus === ProjectStatus.Active;
                }
                else {
                    return elem.projectStatus === ProjectStatus.Finished;
                }
            });
            _this.assignedProjects = relevantProjects;
            _this.renderProjects();
        });
    };
    ProjectList.prototype.renderContent = function () {
        var listId = this.type + "-projects-list";
        this.element.querySelector('ul').id = listId;
        this.element.querySelector('h2').textContent =
            this.type.toUpperCase() + ' PROJECTS';
    };
    return ProjectList;
}(Component));
var ProjectInput = /** @class */ (function (_super) {
    __extends(ProjectInput, _super);
    function ProjectInput() {
        var _this = _super.call(this, 'project-input', 'app', true, 'user-input') || this;
        _this.button = _this.element.querySelector('#submit');
        _this.titleInput = _this.element.querySelector('#title');
        _this.descriptionInput = _this.element.querySelector('#description');
        _this.peopleInput = _this.element.querySelector('#people');
        _this.configure();
        return _this;
    }
    ProjectInput.prototype.gatherUserInput = function () {
        var enteredTitle = this.titleInput.value;
        var enteredDescription = this.descriptionInput.value;
        var enteredPeople = this.peopleInput.value;
        var titleValidatable = {
            value: enteredTitle,
            required: true,
            minLength: 3,
            maxLength: 30,
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
            projectState.addProject(title, description, people);
            this.clearInputs();
        }
    };
    ProjectInput.prototype.renderContent = function () { };
    ProjectInput.prototype.configure = function () {
        this.element.addEventListener('submit', this.submitHandler.bind(this));
    };
    return ProjectInput;
}(Component));
var project1 = new ProjectInput();
var activeProjectList = new ProjectList('active');
var finishedProjectList = new ProjectList('finished');
