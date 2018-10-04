import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ProjectsServiceProvider } from '../../providers/projects-service/projects-service'; 
import { Project } from '../../interfaces/project';

import { ProjectAddPage } from '../project-add/project-add';
import { ProjectViewPage} from '../project-view/project-view';

/**
 * Generated class for the ProjectsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-projects',
  templateUrl: 'projects.html',
})
export class ProjectsPage {

  projects: Array<Project>; 
  color: "green";

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public projectsService: ProjectsServiceProvider
  ) {
    // connect projects to provider observables
    this.projectsService.projects$.subscribe(list => {
      this.projects = list;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProjectsPage');
  }

  onItemSelected(project) {
    console.log('onItemSelected');
    this.navCtrl.push(ProjectViewPage, {
      projectForTasksList: project
    });
  }

  onAddProject() {
    console.log('onAddProject');
    this.navCtrl.push(ProjectAddPage);
  }

}
