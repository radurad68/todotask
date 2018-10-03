import { Injectable } from '@angular/core';

import { StorageServiceProvider } from '../../providers/storage-service/storage-service';
import { Project } from '../../interfaces/project';
import { Task } from '../../interfaces/task';

import { Observable, BehaviorSubject } from 'rxjs/Rx';
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
  projectTaskSubject: BehaviorSubject<Project> = new BehaviorSubject(null);
  projectTask$: Observable<Project> = this.projectTaskSubject.asObservable();

  constructor(
    public storageService: StorageServiceProvider
  ) {
    console.log('Hello ProjectsServiceProvider Provider');
    this.loadProjects();
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

  updateProjectColor(project: Project, color: number) {
    project.updateColor(color);
    this.refreshProjects();
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

  // Utils

  updateProjectForTask(project: Project) {
    this.projectTask = project;
    this.refreshProjectTask();
  }

  // Storage, Observable

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
        }
      })
  }

}
