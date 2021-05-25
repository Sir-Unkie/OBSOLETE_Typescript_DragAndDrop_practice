import { Component } from './base-component.js';
import { ProjectItem } from './project-item.js';
import { projectState, ProjectStatus } from '../State/state.js';
export class ProjectList extends Component {
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
