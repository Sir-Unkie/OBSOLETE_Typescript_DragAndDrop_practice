/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Components/base-component.ts":
/*!******************************************!*\
  !*** ./src/Components/base-component.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Component": () => (/* binding */ Component)
/* harmony export */ });
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



/***/ }),

/***/ "./src/Components/project-input.ts":
/*!*****************************************!*\
  !*** ./src/Components/project-input.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProjectInput": () => (/* binding */ ProjectInput)
/* harmony export */ });
/* harmony import */ var _base_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-component */ "./src/Components/base-component.ts");
/* harmony import */ var _Validation_validation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Validation/validation */ "./src/Validation/validation.ts");
/* harmony import */ var _State_state__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../State/state */ "./src/State/state.ts");
var __extends = (undefined && undefined.__extends) || (function () {
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
        !(0,_Validation_validation__WEBPACK_IMPORTED_MODULE_1__.validate)(titleValidatable) ||
            !(0,_Validation_validation__WEBPACK_IMPORTED_MODULE_1__.validate)(descriptionValidatable) ||
            !(0,_Validation_validation__WEBPACK_IMPORTED_MODULE_1__.validate)(peopleValidatable)) {
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
        // console.log(this.titleInput.value);
        var userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            var title = userInput[0], description = userInput[1], people = userInput[2];
            //   console.log(description);
            _State_state__WEBPACK_IMPORTED_MODULE_2__.projectState.addProject(title, description, people);
            this.clearInputs();
        }
    };
    ProjectInput.prototype.renderContent = function () { };
    ProjectInput.prototype.configure = function () {
        this.element.addEventListener('submit', this.submitHandler.bind(this));
    };
    return ProjectInput;
}(_base_component__WEBPACK_IMPORTED_MODULE_0__.Component));



/***/ }),

/***/ "./src/Components/project-item.ts":
/*!****************************************!*\
  !*** ./src/Components/project-item.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProjectItem": () => (/* binding */ ProjectItem)
/* harmony export */ });
/* harmony import */ var _base_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-component */ "./src/Components/base-component.ts");
var __extends = (undefined && undefined.__extends) || (function () {
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
    ProjectItem.prototype.dragStartHandler = function (event) {
        // console.log(event);
        event.dataTransfer.setData('text/plain', this.project.id);
        event.dataTransfer.effectAllowed = 'move';
        // console.log(this.project.id);
    };
    ProjectItem.prototype.dragEndHandler = function (event) {
        // console.log(event);
    };
    ProjectItem.prototype.configure = function () {
        this.element.addEventListener('dragstart', this.dragStartHandler.bind(this));
        this.element.addEventListener('dragend', this.dragEndHandler.bind(this));
    };
    ProjectItem.prototype.renderContent = function () {
        this.element.querySelector('h2').textContent = this.project.title;
        this.element.querySelector('h3').textContent = this.persons;
        this.element.querySelector('p').textContent = this.project.description;
    };
    return ProjectItem;
}(_base_component__WEBPACK_IMPORTED_MODULE_0__.Component));



/***/ }),

/***/ "./src/Components/project-list.ts":
/*!****************************************!*\
  !*** ./src/Components/project-list.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProjectList": () => (/* binding */ ProjectList)
/* harmony export */ });
/* harmony import */ var _base_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-component */ "./src/Components/base-component.ts");
/* harmony import */ var _project_item__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./project-item */ "./src/Components/project-item.ts");
/* harmony import */ var _State_state__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../State/state */ "./src/State/state.ts");
var __extends = (undefined && undefined.__extends) || (function () {
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
    ProjectList.prototype.dragOverHandler = function (event) {
        if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
            event.preventDefault();
            var lisEl = this.element.querySelector('ul');
            lisEl.classList.add('droppable');
        }
    };
    ProjectList.prototype.dragLeaveHandler = function (event) {
        event.preventDefault();
        var lisEl = this.element.querySelector('ul');
        lisEl.classList.remove('droppable');
    };
    ProjectList.prototype.dropHandler = function (event) {
        // console.log('dropped');
        var prjId = event.dataTransfer.getData('text/plain');
        _State_state__WEBPACK_IMPORTED_MODULE_2__.projectState.moveProject(prjId, this.type === 'active' ? _State_state__WEBPACK_IMPORTED_MODULE_2__.ProjectStatus.Active : _State_state__WEBPACK_IMPORTED_MODULE_2__.ProjectStatus.Finished);
    };
    ProjectList.prototype.renderProjects = function () {
        var listEl = document.getElementById(this.type + "-projects-list");
        listEl.innerHTML = '';
        for (var _i = 0, _a = this.assignedProjects; _i < _a.length; _i++) {
            var prjItem = _a[_i];
            new _project_item__WEBPACK_IMPORTED_MODULE_1__.ProjectItem(this.element.querySelector('ul').id, prjItem);
        }
    };
    ProjectList.prototype.configure = function () {
        var _this = this;
        this.element.addEventListener('dragover', this.dragOverHandler.bind(this), false);
        this.element.addEventListener('dragleave', this.dragLeaveHandler.bind(this));
        this.element.addEventListener('drop', this.dropHandler.bind(this));
        _State_state__WEBPACK_IMPORTED_MODULE_2__.projectState.addListener(function (projects) {
            var relevantProjects = projects.filter(function (elem) {
                if (_this.type === 'active') {
                    return elem.projectStatus === _State_state__WEBPACK_IMPORTED_MODULE_2__.ProjectStatus.Active;
                }
                else {
                    return elem.projectStatus === _State_state__WEBPACK_IMPORTED_MODULE_2__.ProjectStatus.Finished;
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
}(_base_component__WEBPACK_IMPORTED_MODULE_0__.Component));



/***/ }),

/***/ "./src/State/state.ts":
/*!****************************!*\
  !*** ./src/State/state.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProjectStatus": () => (/* binding */ ProjectStatus),
/* harmony export */   "ProjectState": () => (/* binding */ ProjectState),
/* harmony export */   "projectState": () => (/* binding */ projectState)
/* harmony export */ });
/* harmony import */ var _models_project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/project */ "./src/models/project.ts");
var __extends = (undefined && undefined.__extends) || (function () {
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
        var newproject = new _models_project__WEBPACK_IMPORTED_MODULE_0__.Project(Math.random().toString(), title, description, numberOfPeople, ProjectStatus.Active);
        this.projects.push(newproject);
        // console.log(this.listeners);
        this.updateListeners();
    };
    ProjectState.prototype.moveProject = function (projectId, newStatus) {
        var project = this.projects.find(function (el) {
            return el.id === projectId;
        });
        if (project && project.projectStatus !== newStatus) {
            //   console.log('yeeees');
            project.projectStatus = newStatus;
            this.updateListeners();
        }
    };
    ProjectState.prototype.updateListeners = function () {
        for (var _i = 0, _a = this.listeners; _i < _a.length; _i++) {
            var listenerFn = _a[_i];
            listenerFn(this.projects.slice());
        }
    };
    return ProjectState;
}(State));

var projectState = ProjectState.getInstance();


/***/ }),

/***/ "./src/Validation/validation.ts":
/*!**************************************!*\
  !*** ./src/Validation/validation.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "validate": () => (/* binding */ validate)
/* harmony export */ });
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


/***/ }),

/***/ "./src/models/project.ts":
/*!*******************************!*\
  !*** ./src/models/project.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Project": () => (/* binding */ Project)
/* harmony export */ });
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



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Components_project_input__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Components/project-input */ "./src/Components/project-input.ts");
/* harmony import */ var _Components_project_list__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Components/project-list */ "./src/Components/project-list.ts");


var project1 = new _Components_project_input__WEBPACK_IMPORTED_MODULE_0__.ProjectInput();
var activeProjectList = new _Components_project_list__WEBPACK_IMPORTED_MODULE_1__.ProjectList('active');
var finishedProjectList = new _Components_project_list__WEBPACK_IMPORTED_MODULE_1__.ProjectList('finished');

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90eXBlc2NyaXB0Ly4vc3JjL0NvbXBvbmVudHMvYmFzZS1jb21wb25lbnQudHMiLCJ3ZWJwYWNrOi8vdHlwZXNjcmlwdC8uL3NyYy9Db21wb25lbnRzL3Byb2plY3QtaW5wdXQudHMiLCJ3ZWJwYWNrOi8vdHlwZXNjcmlwdC8uL3NyYy9Db21wb25lbnRzL3Byb2plY3QtaXRlbS50cyIsIndlYnBhY2s6Ly90eXBlc2NyaXB0Ly4vc3JjL0NvbXBvbmVudHMvcHJvamVjdC1saXN0LnRzIiwid2VicGFjazovL3R5cGVzY3JpcHQvLi9zcmMvU3RhdGUvc3RhdGUudHMiLCJ3ZWJwYWNrOi8vdHlwZXNjcmlwdC8uL3NyYy9WYWxpZGF0aW9uL3ZhbGlkYXRpb24udHMiLCJ3ZWJwYWNrOi8vdHlwZXNjcmlwdC8uL3NyYy9tb2RlbHMvcHJvamVjdC50cyIsIndlYnBhY2s6Ly90eXBlc2NyaXB0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3R5cGVzY3JpcHQvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3R5cGVzY3JpcHQvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90eXBlc2NyaXB0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdHlwZXNjcmlwdC8uL3NyYy9hcHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQTtJQUtFLG1CQUNFLFVBQWtCLEVBQ2xCLGFBQXFCLEVBQ3JCLGFBQXNCLEVBQ3RCLFlBQXFCO1FBRXJCLElBQUksQ0FBQyxlQUFlLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FDNUMsVUFBVSxDQUNhLENBQUM7UUFDMUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBTyxDQUFDO1FBQ2hFLElBQU0sWUFBWSxHQUFH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b3VyY2VzQ29udGVudCI6WyJleHBvcnQgYWJzdHJhY3QgY2xhc3MgQ29tcG9uZW50PFQgZXh0ZW5kcyBIVE1MRWxlbWVudCwgVSBleHRlbmRzIEhUTUxFbGVtZW50PiB7XHJcbiAgdGVtcGxhdGVFbGVtZW50OiBIVE1MVGVtcGxhdGVFbGVtZW50O1xyXG4gIGhvc3RFbGVtZW50OiBUO1xyXG4gIGVsZW1lbnQ6IFU7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgdGVtcGxhdGVJZDogc3RyaW5nLFxyXG4gICAgaG9zdEVsZW1lbnRJZDogc3RyaW5nLFxyXG4gICAgaW5zZXJ0QXRTdGFydDogYm9vbGVhbixcclxuICAgIG5ld0VsZW1lbnRJZD86IHN0cmluZ1xyXG4gICkge1xyXG4gICAgdGhpcy50ZW1wbGF0ZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcclxuICAgICAgdGVtcGxhdGVJZFxyXG4gICAgKSEgYXMgSFRNTFRlbXBsYXRlRWxlbWVudDtcclxuICAgIHRoaXMuaG9zdEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChob3N0RWxlbWVudElkKSEgYXMgVDtcclxuICAgIGNvbnN0IGltcG9ydGVkTm9kZSA9IGRvY3VtZW50LmltcG9ydE5vZGUoXHJcbiAgICAgIHRoaXMudGVtcGxhdGVFbGVtZW50LmNvbnRlbnQsXHJcbiAgICAgIHRydWVcclxuICAgICk7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhpbXBvcnRlZE5vZGUpO1xyXG4gICAgdGhpcy5lbGVtZW50ID0gaW1wb3J0ZWROb2RlLmZpcnN0RWxlbWVudENoaWxkIGFzIFU7XHJcbiAgICBpZiAobmV3RWxlbWVudElkKSB7XHJcbiAgICAgIHRoaXMuZWxlbWVudC5pZCA9IG5ld0VsZW1lbnRJZDtcclxuICAgIH1cclxuICAgIHRoaXMuYXR0YWNoKGluc2VydEF0U3RhcnQpO1xyXG4gIH1cclxuICBwcml2YXRlIGF0dGFjaChpbnNlcnRBdEJlZ2lubmluZzogYm9vbGVhbikge1xyXG4gICAgaWYgKGluc2VydEF0QmVnaW5uaW5nKSB7XHJcbiAgICAgIHRoaXMuaG9zdEVsZW1lbnQuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdhZnRlcmJlZ2luJywgdGhpcy5lbGVtZW50KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaG9zdEVsZW1lbnQuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdiZWZvcmVlbmQnLCB0aGlzLmVsZW1lbnQpO1xyXG4gICAgfVxyXG4gIH1cclxuICBhYnN0cmFjdCBjb25maWd1cmUoKTogdm9pZDtcclxuICBhYnN0cmFjdCByZW5kZXJDb250ZW50KCk6IHZvaWQ7XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnLi9iYXNlLWNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFZhbGlkYXRhYmxlLCB2YWxpZGF0ZSB9IGZyb20gJy4uL1ZhbGlkYXRpb24vdmFsaWRhdGlvbic7XHJcbmltcG9ydCB7IHByb2plY3RTdGF0ZSB9IGZyb20gJy4uL1N0YXRlL3N0YXRlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBQcm9qZWN0SW5wdXQgZXh0ZW5kcyBDb21wb25lbnQ8SFRNTERpdkVsZW1lbnQsIEhUTUxGb3JtRWxlbWVudD4ge1xyXG4gIGJ1dHRvbjogSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbiAgdGl0bGVJbnB1dDogSFRNTElucHV0RWxlbWVudDtcclxuICBkZXNjcmlwdGlvbklucHV0OiBIVE1MSW5wdXRFbGVtZW50O1xyXG4gIHBlb3BsZUlucHV0OiBIVE1MSW5wdXRFbGVtZW50O1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHN1cGVyKCdwcm9qZWN0LWlucHV0JywgJ2FwcCcsIHRydWUsICd1c2VyLWlucHV0Jyk7XHJcbiAgICB0aGlzLmJ1dHRvbiA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcjc3VibWl0JykhIGFzIEhUTUxCdXR0b25FbGVtZW50O1xyXG4gICAgdGhpcy50aXRsZUlucHV0ID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0aXRsZScpISBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgdGhpcy5kZXNjcmlwdGlvbklucHV0ID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgICcjZGVzY3JpcHRpb24nXHJcbiAgICApISBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgdGhpcy5wZW9wbGVJbnB1dCA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICAnI3Blb3BsZSdcclxuICAgICkhIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICB0aGlzLmNvbmZpZ3VyZSgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnYXRoZXJVc2VySW5wdXQoKTogW3N0cmluZywgc3RyaW5nLCBudW1iZXJdIHwgdm9pZCB7XHJcbiAgICBjb25zdCBlbnRlcmVkVGl0bGUgPSB0aGlzLnRpdGxlSW5wdXQudmFsdWU7XHJcbiAgICBjb25zdCBlbnRlcmVkRGVzY3JpcHRpb24gPSB0aGlzLmRlc2NyaXB0aW9uSW5wdXQudmFsdWU7XHJcbiAgICBjb25zdCBlbnRlcmVkUGVvcGxlID0gdGhpcy5wZW9wbGVJbnB1dC52YWx1ZTtcclxuXHJcbiAgICBjb25zdCB0aXRsZVZhbGlkYXRhYmxlOiBWYWxpZGF0YWJsZSA9IHtcclxuICAgICAgdmFsdWU6IGVudGVyZWRUaXRsZSxcclxuICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgIG1pbkxlbmd0aDogMyxcclxuICAgICAgbWF4TGVuZ3RoOiAzMCxcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgZGVzY3JpcHRpb25WYWxpZGF0YWJsZTogVmFsaWRhdGFibGUgPSB7XHJcbiAgICAgIHZhbHVlOiBlbnRlcmVkRGVzY3JpcHRpb24sXHJcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICBtaW5MZW5ndGg6IDEsXHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IHBlb3BsZVZhbGlkYXRhYmxlOiBWYWxpZGF0YWJsZSA9IHtcclxuICAgICAgdmFsdWU6ICtlbnRlcmVkUGVvcGxlLFxyXG4gICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgbWluOiAxLFxyXG4gICAgICBtYXg6IDEwLFxyXG4gICAgfTtcclxuXHJcbiAgICBpZiAoXHJcbiAgICAgIC8vdmFsaWRhdGVcclxuICAgICAgIXZhbGlkYXRlKHRpdGxlVmFsaWRhdGFibGUpIHx8XHJcbiAgICAgICF2YWxpZGF0ZShkZXNjcmlwdGlvblZhbGlkYXRhYmxlKSB8fFxyXG4gICAgICAhdmFsaWRhdGUocGVvcGxlVmFsaWRhdGFibGUpXHJcbiAgICApIHtcclxuICAgICAgYWxlcnQoJ2luY29ycmVjdCBpbnB1dCcpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICByZXR1cm4gW2VudGVyZWRUaXRsZSwgZW50ZXJlZERlc2NyaXB0aW9uLCArZW50ZXJlZFBlb3BsZV07XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNsZWFySW5wdXRzKCkge1xyXG4gICAgdGhpcy50aXRsZUlucHV0LnZhbHVlID0gJyc7XHJcbiAgICB0aGlzLmRlc2NyaXB0aW9uSW5wdXQudmFsdWUgPSAnJztcclxuICAgIHRoaXMucGVvcGxlSW5wdXQudmFsdWUgPSAnJztcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc3VibWl0SGFuZGxlcihlOiBFdmVudCkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgLy8gY29uc29sZS5sb2codGhpcy50aXRsZUlucHV0LnZhbHVlKTtcclxuICAgIGNvbnN0IHVzZXJJbnB1dCA9IHRoaXMuZ2F0aGVyVXNlcklucHV0KCk7XHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh1c2VySW5wdXQpKSB7XHJcbiAgICAgIGNvbnN0IFt0aXRsZSwgZGVzY3JpcHRpb24sIHBlb3BsZV0gPSB1c2VySW5wdXQ7XHJcbiAgICAgIC8vICAgY29uc29sZS5sb2coZGVzY3JpcHRpb24pO1xyXG4gICAgICBwcm9qZWN0U3RhdGUuYWRkUHJvamVjdCh0aXRsZSwgZGVzY3JpcHRpb24sIHBlb3BsZSk7XHJcbiAgICAgIHRoaXMuY2xlYXJJbnB1dHMoKTtcclxuICAgIH1cclxuICB9XHJcbiAgcmVuZGVyQ29udGVudCgpIHt9XHJcbiAgY29uZmlndXJlKCkge1xyXG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIHRoaXMuc3VibWl0SGFuZGxlci5iaW5kKHRoaXMpKTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnLi9iYXNlLWNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFByb2plY3QgfSBmcm9tICcuLi9tb2RlbHMvcHJvamVjdCc7XHJcbmltcG9ydCB7IERyYWdnYWJsZSB9IGZyb20gJy4uL21vZGVscy9kcmFnLWRyb3AnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFByb2plY3RJdGVtXHJcbiAgZXh0ZW5kcyBDb21wb25lbnQ8SFRNTFVMaXN0RWxlbWVudCwgSFRNTExJRWxlbWVudD5cclxuICBpbXBsZW1lbnRzIERyYWdnYWJsZVxyXG57XHJcbiAgcHJpdmF0ZSBwcm9qZWN0OiBQcm9qZWN0O1xyXG5cclxuICBnZXQgcGVyc29ucygpIHtcclxuICAgIGlmICh0aGlzLnByb2plY3QucGVvcGxlID09PSAxKSB7XHJcbiAgICAgIHJldHVybiAnMSBwZXJzb24gaXMgYXNzaWduZWQnO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIGAke3RoaXMucHJvamVjdC5wZW9wbGV9IHBlcnNvbnMgYXJlIGFzc2lnbmVkYDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKGhvc3RJZDogc3RyaW5nLCBwcm9qZWN0OiBQcm9qZWN0KSB7XHJcbiAgICBzdXBlcignc2luZ2xlLXByb2plY3QnLCBob3N0SWQsIGZhbHNlLCBwcm9qZWN0LmlkKTtcclxuICAgIHRoaXMucHJvamVjdCA9IHByb2plY3Q7XHJcblxyXG4gICAgdGhpcy5jb25maWd1cmUoKTtcclxuICAgIHRoaXMucmVuZGVyQ29udGVudCgpO1xyXG4gIH1cclxuXHJcbiAgZHJhZ1N0YXJ0SGFuZGxlcihldmVudDogRHJhZ0V2ZW50KSB7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhldmVudCk7XHJcbiAgICBldmVudC5kYXRhVHJhbnNmZXIhLnNldERhdGEoJ3RleHQvcGxhaW4nLCB0aGlzLnByb2plY3QuaWQpO1xyXG4gICAgZXZlbnQuZGF0YVRyYW5zZmVyIS5lZmZlY3RBbGxvd2VkID0gJ21vdmUnO1xyXG4gICAgLy8gY29uc29sZS5sb2codGhpcy5wcm9qZWN0LmlkKTtcclxuICB9XHJcbiAgZHJhZ0VuZEhhbmRsZXIoZXZlbnQ6IERyYWdFdmVudCkge1xyXG4gICAgLy8gY29uc29sZS5sb2coZXZlbnQpO1xyXG4gIH1cclxuICBjb25maWd1cmUoKSB7XHJcbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcclxuICAgICAgJ2RyYWdzdGFydCcsXHJcbiAgICAgIHRoaXMuZHJhZ1N0YXJ0SGFuZGxlci5iaW5kKHRoaXMpXHJcbiAgICApO1xyXG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdlbmQnLCB0aGlzLmRyYWdFbmRIYW5kbGVyLmJpbmQodGhpcykpO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyQ29udGVudCgpIHtcclxuICAgIHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdoMicpIS50ZXh0Q29udGVudCA9IHRoaXMucHJvamVjdC50aXRsZTtcclxuICAgIHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdoMycpIS50ZXh0Q29udGVudCA9IHRoaXMucGVyc29ucztcclxuICAgIHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdwJykhLnRleHRDb250ZW50ID0gdGhpcy5wcm9qZWN0LmRlc2NyaXB0aW9uO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICcuL2Jhc2UtY29tcG9uZW50JztcclxuaW1wb3J0IHsgUHJvamVjdCB9IGZyb20gJy4uL21vZGVscy9wcm9qZWN0JztcclxuaW1wb3J0IHsgUHJvamVjdEl0ZW0gfSBmcm9tICcuL3Byb2plY3QtaXRlbSc7XHJcbmltcG9ydCB7IERyYWdUYXJnZXQgfSBmcm9tICcuLi9tb2RlbHMvZHJhZy1kcm9wJztcclxuaW1wb3J0IHsgcHJvamVjdFN0YXRlLCBQcm9qZWN0U3RhdHVzIH0gZnJvbSAnLi4vU3RhdGUvc3RhdGUnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFByb2plY3RMaXN0XHJcbiAgZXh0ZW5kcyBDb21wb25lbnQ8SFRNTERpdkVsZW1lbnQsIEhUTUxFbGVtZW50PlxyXG4gIGltcGxlbWVudHMgRHJhZ1RhcmdldFxyXG57XHJcbiAgYXNzaWduZWRQcm9qZWN0czogUHJvamVjdFtdO1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdHlwZTogJ2FjdGl2ZScgfCAnZmluaXNoZWQnKSB7XHJcbiAgICBzdXBlcigncHJvamVjdC1saXN0JywgJ2FwcCcsIGZhbHNlLCBgJHt0eXBlfS1wcm9qZWN0c2ApO1xyXG4gICAgdGhpcy5hc3NpZ25lZFByb2plY3RzID0gW107XHJcbiAgICB0aGlzLmNvbmZpZ3VyZSgpO1xyXG4gICAgdGhpcy5yZW5kZXJDb250ZW50KCk7XHJcbiAgfVxyXG5cclxuICBkcmFnT3ZlckhhbmRsZXIoZXZlbnQ6IERyYWdFdmVudCkge1xyXG4gICAgaWYgKGV2ZW50LmRhdGFUcmFuc2ZlciAmJiBldmVudC5kYXRhVHJhbnNmZXIudHlwZXNbMF0gPT09ICd0ZXh0L3BsYWluJykge1xyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBjb25zdCBsaXNFbCA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCd1bCcpO1xyXG4gICAgICBsaXNFbCEuY2xhc3NMaXN0LmFkZCgnZHJvcHBhYmxlJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBkcmFnTGVhdmVIYW5kbGVyKGV2ZW50OiBEcmFnRXZlbnQpIHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBjb25zdCBsaXNFbCA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCd1bCcpO1xyXG4gICAgbGlzRWwhLmNsYXNzTGlzdC5yZW1vdmUoJ2Ryb3BwYWJsZScpO1xyXG4gIH1cclxuXHJcbiAgZHJvcEhhbmRsZXIoZXZlbnQ6IERyYWdFdmVudCkge1xyXG4gICAgLy8gY29uc29sZS5sb2coJ2Ryb3BwZWQnKTtcclxuICAgIGNvbnN0IHByaklkID0gZXZlbnQuZGF0YVRyYW5zZmVyIS5nZXREYXRhKCd0ZXh0L3BsYWluJyk7XHJcbiAgICBwcm9qZWN0U3RhdGUubW92ZVByb2plY3QoXHJcbiAgICAgIHByaklkLFxyXG4gICAgICB0aGlzLnR5cGUgPT09ICdhY3RpdmUnID8gUHJvamVjdFN0YXR1cy5BY3RpdmUgOiBQcm9qZWN0U3RhdHVzLkZpbmlzaGVkXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSByZW5kZXJQcm9qZWN0cygpIHtcclxuICAgIGNvbnN0IGxpc3RFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke3RoaXMudHlwZX0tcHJvamVjdHMtbGlzdGApO1xyXG4gICAgbGlzdEVsIS5pbm5lckhUTUwgPSAnJztcclxuICAgIGZvciAoY29uc3QgcHJqSXRlbSBvZiB0aGlzLmFzc2lnbmVkUHJvamVjdHMpIHtcclxuICAgICAgbmV3IFByb2plY3RJdGVtKHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCd1bCcpIS5pZCwgcHJqSXRlbSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb25maWd1cmUoKSB7XHJcbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcclxuICAgICAgJ2RyYWdvdmVyJyxcclxuICAgICAgdGhpcy5kcmFnT3ZlckhhbmRsZXIuYmluZCh0aGlzKSxcclxuICAgICAgZmFsc2VcclxuICAgICk7XHJcbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcclxuICAgICAgJ2RyYWdsZWF2ZScsXHJcbiAgICAgIHRoaXMuZHJhZ0xlYXZlSGFuZGxlci5iaW5kKHRoaXMpXHJcbiAgICApO1xyXG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2Ryb3AnLCB0aGlzLmRyb3BIYW5kbGVyLmJpbmQodGhpcykpO1xyXG4gICAgcHJvamVjdFN0YXRlLmFkZExpc3RlbmVyKChwcm9qZWN0czogUHJvamVjdFtdKSA9PiB7XHJcbiAgICAgIGNvbnN0IHJlbGV2YW50UHJvamVjdHMgPSBwcm9qZWN0cy5maWx0ZXIoZWxlbSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMudHlwZSA9PT0gJ2FjdGl2ZScpIHtcclxuICAgICAgICAgIHJldHVybiBlbGVtLnByb2plY3RTdGF0dXMgPT09IFByb2plY3RTdGF0dXMuQWN0aXZlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZXR1cm4gZWxlbS5wcm9qZWN0U3RhdHVzID09PSBQcm9qZWN0U3RhdHVzLkZpbmlzaGVkO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMuYXNzaWduZWRQcm9qZWN0cyA9IHJlbGV2YW50UHJvamVjdHM7XHJcbiAgICAgIHRoaXMucmVuZGVyUHJvamVjdHMoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyQ29udGVudCgpIHtcclxuICAgIGNvbnN0IGxpc3RJZCA9IGAke3RoaXMudHlwZX0tcHJvamVjdHMtbGlzdGA7XHJcbiAgICB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcigndWwnKSEuaWQgPSBsaXN0SWQ7XHJcbiAgICB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcignaDInKSEudGV4dENvbnRlbnQgPVxyXG4gICAgICB0aGlzLnR5cGUudG9VcHBlckNhc2UoKSArICcgUFJPSkVDVFMnO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBQcm9qZWN0IH0gZnJvbSAnLi4vbW9kZWxzL3Byb2plY3QnO1xyXG50eXBlIExpc3RlbmVyPFQ+ID0gKGl0ZW1zOiBUW10pID0+IHZvaWQ7XHJcblxyXG5leHBvcnQgZW51bSBQcm9qZWN0U3RhdHVzIHtcclxuICBBY3RpdmUsXHJcbiAgRmluaXNoZWQsXHJcbn1cclxuXHJcbmNsYXNzIFN0YXRlPFQ+IHtcclxuICBwcm90ZWN0ZWQgbGlzdGVuZXJzOiBMaXN0ZW5lcjxUPltdID0gW107XHJcblxyXG4gIGFkZExpc3RlbmVyKGxpc3RlbmVyRm46IExpc3RlbmVyPFQ+KSB7XHJcbiAgICB0aGlzLmxpc3RlbmVycy5wdXNoKGxpc3RlbmVyRm4pO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFByb2plY3RTdGF0ZSBleHRlbmRzIFN0YXRlPFByb2plY3Q+IHtcclxuICBwcml2YXRlIHByb2plY3RzOiBQcm9qZWN0W10gPSBbXTtcclxuICAvLyAgIHByaXZhdGUgbGlzdGVuZXJzOiBMaXN0ZW5lcltdID0gW107XHJcbiAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuZTogUHJvamVjdFN0YXRlO1xyXG5cclxuICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgc3VwZXIoKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBnZXRJbnN0YW5jZSgpIHtcclxuICAgIGlmICh0aGlzLmluc3RhbmUpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaW5zdGFuZSA9IG5ldyBQcm9qZWN0U3RhdGUoKTtcclxuICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFkZExpc3RlbmVyKGxpc3RlbmVyRm46IExpc3RlbmVyPFByb2plY3Q+KSB7XHJcbiAgICB0aGlzLmxpc3RlbmVycy5wdXNoKGxpc3RlbmVyRm4pO1xyXG4gIH1cclxuXHJcbiAgYWRkUHJvamVjdCh0aXRsZTogc3RyaW5nLCBkZXNjcmlwdGlvbjogc3RyaW5nLCBudW1iZXJPZlBlb3BsZTogbnVtYmVyKSB7XHJcbiAgICBjb25zdCBuZXdwcm9qZWN0ID0gbmV3IFByb2plY3QoXHJcbiAgICAgIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoKSxcclxuICAgICAgdGl0bGUsXHJcbiAgICAgIGRlc2NyaXB0aW9uLFxyXG4gICAgICBudW1iZXJPZlBlb3BsZSxcclxuICAgICAgUHJvamVjdFN0YXR1cy5BY3RpdmVcclxuICAgICk7XHJcbiAgICB0aGlzLnByb2plY3RzLnB1c2gobmV3cHJvamVjdCk7XHJcbiAgICAvLyBjb25zb2xlLmxvZyh0aGlzLmxpc3RlbmVycyk7XHJcbiAgICB0aGlzLnVwZGF0ZUxpc3RlbmVycygpO1xyXG4gIH1cclxuXHJcbiAgbW92ZVByb2plY3QocHJvamVjdElkOiBzdHJpbmcsIG5ld1N0YXR1czogUHJvamVjdFN0YXR1cykge1xyXG4gICAgY29uc3QgcHJvamVjdCA9IHRoaXMucHJvamVjdHMuZmluZChlbCA9PiB7XHJcbiAgICAgIHJldHVybiBlbC5pZCA9PT0gcHJvamVjdElkO1xyXG4gICAgfSk7XHJcbiAgICBpZiAocHJvamVjdCAmJiBwcm9qZWN0LnByb2plY3RTdGF0dXMgIT09IG5ld1N0YXR1cykge1xyXG4gICAgICAvLyAgIGNvbnNvbGUubG9nKCd5ZWVlZXMnKTtcclxuICAgICAgcHJvamVjdC5wcm9qZWN0U3RhdHVzID0gbmV3U3RhdHVzO1xyXG4gICAgICB0aGlzLnVwZGF0ZUxpc3RlbmVycygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB1cGRhdGVMaXN0ZW5lcnMoKSB7XHJcbiAgICBmb3IgKGNvbnN0IGxpc3RlbmVyRm4gb2YgdGhpcy5saXN0ZW5lcnMpIHtcclxuICAgICAgbGlzdGVuZXJGbih0aGlzLnByb2plY3RzLnNsaWNlKCkpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHByb2plY3RTdGF0ZSA9IFByb2plY3RTdGF0ZS5nZXRJbnN0YW5jZSgpO1xyXG4iLCJleHBvcnQgaW50ZXJmYWNlIFZhbGlkYXRhYmxlIHtcclxuICB2YWx1ZT86IHN0cmluZyB8IG51bWJlcjtcclxuICByZXF1aXJlZD86IGJvb2xlYW47XHJcbiAgbWluTGVuZ3RoPzogbnVtYmVyO1xyXG4gIG1heExlbmd0aD86IG51bWJlcjtcclxuICBtaW4/OiBudW1iZXI7XHJcbiAgbWF4PzogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgdmFsaWRhdGUgPSAodmFsaWRhdGFibGVJbnB1dDogVmFsaWRhdGFibGUpOiBib29sZWFuID0+IHtcclxuICBsZXQgaXNWYWxpZCA9IHRydWU7XHJcbiAgaWYgKHZhbGlkYXRhYmxlSW5wdXQucmVxdWlyZWQpIHtcclxuICAgIGlzVmFsaWQgPSBpc1ZhbGlkICYmIHZhbGlkYXRhYmxlSW5wdXQudmFsdWU/LnRvU3RyaW5nKCkudHJpbSgpLmxlbmd0aCAhPT0gMDtcclxuICB9XHJcbiAgaWYgKFxyXG4gICAgdmFsaWRhdGFibGVJbnB1dC5taW5MZW5ndGggJiZcclxuICAgIHR5cGVvZiB2YWxpZGF0YWJsZUlucHV0LnZhbHVlID09PSAnc3RyaW5nJ1xyXG4gICkge1xyXG4gICAgaXNWYWxpZCA9XHJcbiAgICAgIGlzVmFsaWQgJiZcclxuICAgICAgdmFsaWRhdGFibGVJbnB1dC52YWx1ZS50cmltKCkubGVuZ3RoID49IHZhbGlkYXRhYmxlSW5wdXQubWluTGVuZ3RoO1xyXG4gIH1cclxuICBpZiAoXHJcbiAgICB2YWxpZGF0YWJsZUlucHV0Lm1heExlbmd0aCAmJlxyXG4gICAgdHlwZW9mIHZhbGlkYXRhYmxlSW5wdXQudmFsdWUgPT09ICdzdHJpbmcnXHJcbiAgKSB7XHJcbiAgICBpc1ZhbGlkID1cclxuICAgICAgaXNWYWxpZCAmJlxyXG4gICAgICB2YWxpZGF0YWJsZUlucHV0LnZhbHVlLnRyaW0oKS5sZW5ndGggPD0gdmFsaWRhdGFibGVJbnB1dC5tYXhMZW5ndGg7XHJcbiAgfVxyXG4gIGlmICh2YWxpZGF0YWJsZUlucHV0Lm1heCAmJiB0eXBlb2YgdmFsaWRhdGFibGVJbnB1dC52YWx1ZSA9PT0gJ251bWJlcicpIHtcclxuICAgIGlzVmFsaWQgPSBpc1ZhbGlkICYmIHZhbGlkYXRhYmxlSW5wdXQudmFsdWUgPD0gdmFsaWRhdGFibGVJbnB1dC5tYXg7XHJcbiAgfVxyXG4gIGlmICh2YWxpZGF0YWJsZUlucHV0Lm1pbiAmJiB0eXBlb2YgdmFsaWRhdGFibGVJbnB1dC52YWx1ZSA9PT0gJ251bWJlcicpIHtcclxuICAgIGlzVmFsaWQgPSBpc1ZhbGlkICYmIHZhbGlkYXRhYmxlSW5wdXQudmFsdWUgPj0gdmFsaWRhdGFibGVJbnB1dC5taW47XHJcbiAgfVxyXG4gIHJldHVybiBpc1ZhbGlkO1xyXG59O1xyXG4iLCJpbXBvcnQgeyBQcm9qZWN0U3RhdHVzIH0gZnJvbSAnLi4vU3RhdGUvc3RhdGUnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFByb2plY3Qge1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHVibGljIGlkOiBzdHJpbmcsXHJcbiAgICBwdWJsaWMgdGl0bGU6IHN0cmluZyxcclxuICAgIHB1YmxpYyBkZXNjcmlwdGlvbjogc3RyaW5nLFxyXG4gICAgcHVibGljIHBlb3BsZTogbnVtYmVyLFxyXG4gICAgcHVibGljIHByb2plY3RTdGF0dXM6IFByb2plY3RTdGF0dXNcclxuICApIHt9XHJcbn1cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBQcm9qZWN0SW5wdXQgfSBmcm9tICcuL0NvbXBvbmVudHMvcHJvamVjdC1pbnB1dCc7XHJcbmltcG9ydCB7IFByb2plY3RMaXN0IH0gZnJvbSAnLi9Db21wb25lbnRzL3Byb2plY3QtbGlzdCc7XHJcblxyXG5jb25zdCBwcm9qZWN0MSA9IG5ldyBQcm9qZWN0SW5wdXQoKTtcclxuY29uc3QgYWN0aXZlUHJvamVjdExpc3QgPSBuZXcgUHJvamVjdExpc3QoJ2FjdGl2ZScpO1xyXG5jb25zdCBmaW5pc2hlZFByb2plY3RMaXN0ID0gbmV3IFByb2plY3RMaXN0KCdmaW5pc2hlZCcpO1xyXG4iXSwic291cmNlUm9vdCI6IiJ9