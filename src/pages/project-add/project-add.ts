import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ProjectsServiceProvider } from '../../providers/projects-service/projects-service';
import { Project } from '../../interfaces/project';

import { ProjectColorPage } from '../../pages/project-color/project-color';

/**
 * Generated class for the ProjectAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-project-add',
  templateUrl: 'project-add.html',
})
export class ProjectAddPage {

  @ViewChild('circle') circle;

  name: string;
  isValid: boolean = false;
  project: Project;
  count: number = 1;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public projectsService: ProjectsServiceProvider
  ) {
    this.navCtrl.canGoBack()
    this.project = new Project();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProjectAddPage');
  }

  ionViewWillEnter() {
    this.circle.update(this.project.colorRgb);
  }

  onSave() {
    this.project.name = this.name;
    this.projectsService.addProject(this.project);
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

  onSelectColor() {
    this.navCtrl.push(ProjectColorPage, {
      project: this.project
    });
  }

}
