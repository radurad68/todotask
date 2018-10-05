import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Project } from '../../interfaces/project';
import { Colors } from '../../interfaces/colors';
import { ProjectsServiceProvider } from '../../providers/projects-service/projects-service';
import { Task} from '../../interfaces/task';
import { Priority } from '../../interfaces/priorities';
import { TaskAddPage } from '../task-add/task-add';

/**
 * Generated class for the PriorityListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-priority-list',
  templateUrl: 'priority-list.html',
})
export class PriorityListPage {

  tasks: Array<Task>;
  title: string = "";
  project: Project = null;
  priority: Priority;
  projects: Array<Project>;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public projectsService: ProjectsServiceProvider
  ) {
    this.priority = this.navParams.get('priority');
    this.title = this.priority.name;
    this.projectsService.getTasksByPriority(this.priority.index);
    this.projectsService.tasks$.subscribe(list => {
      this.tasks = list;
    })

    // connect projects to provider observables
    this.projectsService.projects$.subscribe(list => {
      this.projects = list;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PriorityListPage');


  }

  // Actions

  onAdd() {
    this.navCtrl.push(TaskAddPage, {
      projectForTaskAdd: this.projects[0],
      new: true
    });
  }

  // Utils

  getColorPriority(task) {
    return Colors.getPriorityColorByIndex(task.priority);
  }

  isTaskOfPriority(task) {
    return task.priority == this.priority.index;
  }

}
