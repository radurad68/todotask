import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ProjectsServiceProvider } from '../../providers/projects-service/projects-service'; 
import { Project } from '../../interfaces/project';
import { Priority, Priorities } from '../../interfaces/priorities';

import { ProjectAddPage } from '../project-add/project-add';
import { ProjectViewPage} from '../project-view/project-view';
import { PriorityListPage } from '../priority-list/priority-list';

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

  priorities: Array<Priority>;
  projects: Array<Project>; 
  color: "green";
  isFirstTabSelected: boolean = true;

  //css
  colorTextNormal = "gray";
  colorTextSelected = "black";
  colorBackgroundNormal = "gainsboro";
  colorBackgroundSelected = "#f5f5f0";
  colorBackgroundProjects = this.colorBackgroundSelected;
  colorBackgroundFilters = this.colorBackgroundNormal;
  colorProjects = this.colorTextSelected;
  colorFilters = this.colorTextNormal;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public projectsService: ProjectsServiceProvider
  ) {
    this.projectsService.loadProjects();
    // connect projects to provider observables
    this.projectsService.projects$.subscribe(list => {
      this.projects = list;
    })
    Priorities.populatePriorities();
    this.priorities = Priorities.list;
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProjectsPage');
  }

  ionViewWillEnter() {
  }

  // Actions

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

  onProjectsSelected() {
    this.isFirstTabSelected = true;
    this.updateTopButtons();
  }

  onPrioritiesSelected() {
    this.isFirstTabSelected = false;
    this.updateTopButtons();
  }

  onPrioritySelected(priority) {
    this.navCtrl.push(PriorityListPage, {
      priority: priority
    })
  }

  //

  updateTopButtons() {
    if (this.isFirstTabSelected) {
      this.colorProjects = this.colorTextSelected;
      this.colorBackgroundProjects = this.colorBackgroundSelected;
      this.colorFilters = this.colorTextNormal;
      this.colorBackgroundFilters = this.colorBackgroundNormal;
    }
    else {
      this.colorProjects = this.colorTextNormal;
      this.colorBackgroundProjects = this.colorBackgroundNormal;
      this.colorFilters = this.colorTextSelected;
      this.colorBackgroundFilters = this.colorBackgroundSelected;
    }
  }
  
}
