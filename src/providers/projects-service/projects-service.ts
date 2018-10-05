import { Injectable } from '@angular/core';

import { StorageServiceProvider } from '../../providers/storage-service/storage-service';
import { Project } from '../../interfaces/project';
import { Task } from '../../interfaces/task';

import { Observable, BehaviorSubject, Subject } from 'rxjs/Rx';
/*
  Generated class for the ProjectsServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProjectsServiceProvider {

  // projects list as observable
  projects: Array<Project> = new Array<Project>();
  projectsSubject: BehaviorSubject<Array<Project>> = new BehaviorSubject([]);
  projects$: Observable<Array<Project>> = this.projectsSubject.asObservable();

  // project selected for task as observable
  projectTask: Project;
  projectTaskSubject: Subject<Project> = new Subject();
  projectTask$: Observable<Project> = this.projectTaskSubject.asObservable();

  // tasks of priority as observable
  tasks: Array<Task> = new Array<Task>();
  tasksSubject: BehaviorSubject<Array<Task>> = new BehaviorSubject([]);
  tasks$: Observable<Array<Task>> = this.tasksSubject.asObservable();

  constructor(
    public storageService: StorageServiceProvider
  ) {
    console.log('Hello ProjectsServiceProvider Provider');
    this.loadProjects();
    this.populateProjects();
  }

  // Projects
  addProject(project: Project) {
    this.projects.push(project);
    this.refreshProjects();
  }

  removeProject(project: Project) {
    let index = this.projects.indexOf(project);
    if (index != -1) {
      this.projects.splice(index, 1);
      this.refreshProjects();
    }
  }

  updateProject(project: Project) {
    project.update();
    this.refreshProjects();
  }

  updateProjectColor(project: Project, color: number) {
    project.updateColor(color);
    this.refreshProjects();
  }

  getIndexOf(project: Project) {
    this.projects.indexOf(project);
  }

  getProjectByIndex(index: number) {
    if (index >= 0 && index < this.projects.length) {
      return this.projects[index];
    }
    else {
      return null;
    }

  }

  // Tasks

  addTask(project: Project, task: Task) {
    project.addTask(task);
    this.refreshProjects();
  }

  removeTask(project: Project, task: Task) {
    project.removeTask(task);
    this.refreshProjects();
  }

  moveTask(projectFrom: Project, task: Task, projectTo: Project) {
    projectFrom.moveTask(task, projectTo);
    this.refreshProjects();
  }

  // Tasks With Priority

  getTasksByPriority(priority: number) {
    this.tasks = new Array<Task>();
    for(let indexProjects = 0; indexProjects < this.projects.length; indexProjects++) {
      for (let indexTasks = 0; indexTasks < this.projects[indexProjects].tasks.length; indexTasks++) {
        let task = this.projects[indexProjects].tasks[indexTasks];
        if (task.priority == priority) {
          this.tasks.push(task);
        }
      }
    }
    this.refreshTasks();
  }

  // Utils

  updateProjectForTask(project: Project) {
    this.projectTask = project;
    this.refreshProjectTask();
  }

  // Storage, Observable

  refreshTasks() {
    this.tasksSubject.next(this.tasks);
  }

  refreshProjectTask() {
    this.projectTaskSubject.next(this.projectTask);
  }

  refreshProjects() {
    this.projectsSubject.next(this.projects);
    this.saveProjects();
  }

  saveProjects() {
    this.storageService.saveData(this.projects);
  }

  loadProjects() {
    this.storageService.loadData()
      .then(list => {
        if (list != undefined) {
          console.log(list);
          this.projects = list;
          this.refreshProjects();
        }
      })
  }

  // dummy
  populateProjects() {
    // populate
    this.projects = new Array<Project>();
    let project = new Project('Project 1', 3);
    let task1 = new Task('Task 1', 2);
    let task2 = new Task('Task 2', 3);
    project.addTask(task1);
    project.addTask(task2);
    let project2 = new Project('Project 2', 10);
    let task21 = new Task('Task 1', 1);
    let task22 = new Task('Task 2', 1);
    project2.addTask(task21);
    project2.addTask(task22);
    this.projects.push(project);
    this.projects.push(project2);
    this.refreshProjects();
  }

}
