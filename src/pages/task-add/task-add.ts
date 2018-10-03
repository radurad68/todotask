import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Task } from '../../interfaces/task';
import { Project } from '../../interfaces/project';
import { ProjectsServiceProvider } from '../../providers/projects-service/projects-service';

import { ProjectsListPage } from '../../pages/projects-list/projects-list';

/**
 * Generated class for the TaskAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-task-add',
  templateUrl: 'task-add.html',
})
export class TaskAddPage {

  // UI
  name: string;
  isValid: boolean = false;
  title: string = "New Task";

  // models
  project: Project; // project to add to
  task: Task; // task to add/edit
  projectOld: Project; // project to move from


  // utils
  isAdd: boolean = true;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public projectsService: ProjectsServiceProvider
  ) {
    this.project = this.navParams.get('project');

    if (this.navParams.get('new') != undefined) {
      this.isAdd = true;
    }
    if (this.navParams.get('edit') != undefined && this.navParams.get('task') != undefined) {
      this.isAdd = false;
      this.task = this.navParams.get('task');
      this.name = this.task.name;
      this.isValid = true;
    }

    this.title = this.isAdd ? 'New Task' : 'Edit Task';

    // subscribe to changes from projects list
    this.projectsService.projectTask$.subscribe(project => {
      if (project != null && project != undefined) {
        this.project = project;
        // save initial project
        if (!this.isAdd) {
          if (this.projectOld == null && this.projectOld == undefined) {
            this.projectOld = project;
          }
        }
      }
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskAddPage');
  }

  onSave() {
    if (this.isAdd) {
      let task = new Task(this.name);
      task.priority = 1;
      this.projectsService.addTask(this.project, task);
    }
    else {
      this.task.name = this.name;
      if (this.projectOld != undefined && this.projectOld != null) {
        this.projectsService.moveTask(this.projectOld, this.task, this.project);
      }
      else {
        this.projectsService.refreshProjects();
      }
    }

    this.navCtrl.pop();
  }

  onCancel() {
    this.navCtrl.pop();
  }

  onChangeName(value) {
    if (value != null && value != undefined && value != "") {
      this.isValid = true;
    }
    else
    {
      this.isValid = false;
    }
  }

  onSelectProject() {
    this.navCtrl.push(ProjectsListPage, {
      project: this.project
    });
  }

}
