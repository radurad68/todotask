import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Task } from '../../interfaces/task';
import { Project } from '../../interfaces/project';
import { ProjectsServiceProvider } from '../../providers/projects-service/projects-service';

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

  name: string;
  isValid: boolean = false;
  title: string = "New Task";
  project: Project;
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
    if (this.navParams.get('edit') != undefined) {
      this.isAdd = false;
    }
    this.title = this.isAdd ? 'New Task' : 'Edit Task';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskAddPage');
  }

  onSave() {
    if (this.isAdd) {
      let task = new Task(this.name, 1);
      this.projectsService.addTask(this.project, task);
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

}
