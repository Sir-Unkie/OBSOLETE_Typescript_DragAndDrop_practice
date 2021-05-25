import { Project } from '../models/project.js';
export var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
    ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";
})(ProjectStatus || (ProjectStatus = {}));
class State {
    constructor() {
        this.listeners = [];
    }
    addListener(listenerFn) {
        this.listeners.push(listenerFn);
    }
}
export class ProjectState extends State {
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
export const projectState = ProjectState.getInstance();
