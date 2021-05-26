import { Component } from './base-component';
import { Project } from '../models/project';
import { Draggable } from '../models/drag-drop';

export class ProjectItem
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
    // console.log(event);
    event.dataTransfer!.setData('text/plain', this.project.id);
    event.dataTransfer!.effectAllowed = 'move';
    // console.log(this.project.id);
  }
  dragEndHandler(event: DragEvent) {
    // console.log(event);
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
