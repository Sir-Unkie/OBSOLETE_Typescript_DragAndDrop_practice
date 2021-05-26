import { Component } from './base-component';
import { Project } from '../models/project';
import { ProjectItem } from './project-item';
import { DragTarget } from '../models/drag-drop';
import { projectState, ProjectStatus } from '../State/state';

export class ProjectList
  extends Component<HTMLDivElement, HTMLElement>
  implements DragTarget
{
  assignedProjects: Project[];
  constructor(private type: 'active' | 'finished') {
    super('project-list', 'app', false, `${type}-projects`);
    this.assignedProjects = [];
    this.configure();
    this.renderContent();
  }

  dragOverHandler(event: DragEvent) {
    if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
      event.preventDefault();
      const lisEl = this.element.querySelector('ul');
      lisEl!.classList.add('droppable');
    }
  }

  dragLeaveHandler(event: DragEvent) {
    event.preventDefault();
    // console.log('asdasdasd');
    const lisEl = this.element.querySelector('ul');
    lisEl!.classList.remove('droppable');
  }

  dropHandler(event: DragEvent) {
    // console.log('dropped');
    const prjId = event.dataTransfer!.getData('text/plain');
    projectState.moveProject(
      prjId,
      this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished
    );
  }

  private renderProjects() {
    const listEl = document.getElementById(`${this.type}-projects-list`);
    listEl!.innerHTML = '';
    for (const prjItem of this.assignedProjects) {
      new ProjectItem(this.element.querySelector('ul')!.id, prjItem);
    }
  }

  configure() {
    this.element.addEventListener(
      'dragover',
      this.dragOverHandler.bind(this),
      false
    );
    this.element.addEventListener(
      'dragleave',
      this.dragLeaveHandler.bind(this)
    );
    this.element.addEventListener('drop', this.dropHandler.bind(this));
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
