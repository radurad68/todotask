import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { TaskAddPage } from '../task-add/task-add';
import { Project } from '../../interfaces/project';
/**
 * Generated class for the ProjectViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-project-view',
  templateUrl: 'project-view.html',
})
export class ProjectViewPage {

  project: Project = new Project();

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams
  ) {
    this.project = this.navParams.get('project');
    console.log(this.project);
    if (this.project == undefined) {
      this.project = new Project();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProjectViewPage');
  }

  onBack() {
    this.navCtrl.pop();
  }

  onAdd() {
    this.navCtrl.push(TaskAddPage, {
      project: this.project,
      new: true
    });
  }

  onSelect(task) {
    this.navCtrl.push(TaskAddPage, {
      project: this.project,
      task: task,
      edit: true
    });
  }
}
