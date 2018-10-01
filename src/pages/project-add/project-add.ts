import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ProjectsServiceProvider } from '../../providers/projects-service/projects-service';
import { Project } from '../../interfaces/project';

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

  name: string;
  isValid: boolean = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public projectsService: ProjectsServiceProvider
  ) {
    this.navCtrl.canGoBack()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProjectAddPage');
  }

  onSave() {
    let project = new Project(this.name, 1);
    this.projectsService.addProject(project);
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
