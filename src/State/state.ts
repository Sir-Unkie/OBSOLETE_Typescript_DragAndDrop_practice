import { Project } from '../models/project';
type Listener<T> = (items: T[]) => void;

export enum ProjectStatus {
  Active,
  Finished,
}

class State<T> {
  protected listeners: Listener<T>[] = [];

  addListener(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn);
  }
}

export class ProjectState extends State<Project> {
  private projects: Project[] = [];
  //   private listeners: Listener[] = [];
  private static instane: ProjectState;

  private constructor() {
    super();
  }

  static getInstance() {
    if (this.instane) {
      return this.instane;
    } else {
      this.instane = new ProjectState();
      return this.instane;
    }
  }

  addListener(listenerFn: Listener<Project>) {
    this.listeners.push(listenerFn);
  }

  addProject(title: string, description: string, numberOfPeople: number) {
    const newproject = new Project(
      Math.random().toString(),
      title,
      description,
      numberOfPeople,
      ProjectStatus.Active
    );
    this.projects.push(newproject);
    // console.log(this.listeners);
    this.updateListeners();
  }

  moveProject(projectId: string, newStatus: ProjectStatus) {
    const project = this.projects.find(el => {
      return el.id === projectId;
    });
    if (project && project.projectStatus !== newStatus) {
      //   console.log('yeeees');
      project.projectStatus = newStatus;
      this.updateListeners();
    }
  }

  private updateListeners() {
    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice());
    }
  }
}

export const projectState = ProjectState.getInstance();
