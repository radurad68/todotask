import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { TaskAddPage } from '../task-add/task-add';
import { Project } from '../../interfaces/project';
import { Colors } from '../../interfaces/colors';
//import { Task } from '../../interfaces/task';
import { ProjectsServiceProvider } from '../../providers/projects-service/projects-service';

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
    public navParams: NavParams,
    public projectsService: ProjectsServiceProvider
  ) {
    this.project = this.navParams.get('projectForTasksList');
    console.log(this.project);
    if (this.project == undefined) {
      this.project = new Project();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProjectViewPage');
  }

  ionViewWillEnter() {
    this.project.resetExpand();
    this.projectsService.refreshProjects();
  }

  onBack() {
    this.navCtrl.pop();
  }

  onAdd() {
    this.navCtrl.push(TaskAddPage, {
      projectForTaskAdd: this.project,
      new: true
    });
  }

  onSelect(task) {
    let selected = task.expanded;
    this.project.resetExpand();
    task.expanded = !selected;
    console.log(task.expanded);
    this.projectsService.refreshProjects();
  }

  onRightOptionClick(task) {
    this.navCtrl.push(TaskAddPage, {
      projectForTaskAdd: this.project,
      task: task,
      edit: true
    });
  }

  onLeftOptionClick(task) {
    task.completed = true;
    this.project.updateCount();
    this.projectsService.refreshProjects();
  }

  getColorPriority(task) {
    return Colors.getPriorityColorByIndex(task.priority);
  }


}
