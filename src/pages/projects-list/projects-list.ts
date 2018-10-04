import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Project } from '../../interfaces/project';
import { ProjectsServiceProvider } from '../../providers/projects-service/projects-service';

/**
 * Generated class for the ProjectsListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-projects-list',
  templateUrl: 'projects-list.html',
})
export class ProjectsListPage {

  projects: Array<Project> = new Array<Project>();
  project: Project;
  isProjectSelected: boolean = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public projectsService: ProjectsServiceProvider
  ) {

    this.project = this.navParams.get('projectForTaskSelect');

    // connect projects to provider observables
    this.projectsService.projects$.subscribe(list => {
      this.projects = list;
    })

    this.isProjectSelected = false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProjectsListPage');
  }

  onSelect(project) {

    if (this.isProjectSelected) {
      return;
    }
    this.isProjectSelected = true;
    this.project = project;

    setTimeout(() => {
      this.projectsService.updateProjectForTask(this.project);
      this.navCtrl.pop();
    }, 500)
  }

  isSelected(project) {
    return this.project == project;
  }

}
