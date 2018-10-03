import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Project } from '../../interfaces/project';
import { Colors} from '../../interfaces/colors';

import { ProjectsServiceProvider } from '../../providers/projects-service/projects-service';

/**
 * Generated class for the ProjectColorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-project-color',
  templateUrl: 'project-color.html',
})
export class ProjectColorPage {

  project: Project;
  colors: Array<Array<string>>;
  colorSelected: string;
  colorIndex: number;
  isColorSelected: boolean = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public projectsService: ProjectsServiceProvider
  ) {
    this.project = this.navParams.get('project');
    this.prepareColors();
    this.colorSelected = Colors.list[this.project.color];
    this.isColorSelected = false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProjectColorPage');
  }

  private prepareColors() {
    this.colors = new Array<Array<string>>();
    let count = 0;
    let colorsArray = new Array<string>();

    for (let index = 0; index < Colors.list.length; index++) {
      if (count == 0) {
        colorsArray = new Array<string>();
      }

      colorsArray.push(Colors.list[index]);
      count++;
      
      if (count == 6 || ((index + 1) == Colors.list.length)) {
        count = 0;
        this.colors.push(colorsArray);
      }
    }

    console.log(this.colors);
  }

  onColorSelected(color) {
    if (this.isColorSelected) {
      return;
    }
    this.isColorSelected = true;
    this.colorSelected = color;
    setTimeout(() => {
      let index = Colors.getIndex(this.colorSelected);
      this.projectsService.updateProjectColor(this.project, index);
      this.navCtrl.pop();
    }, 500)
  }

  isSelected(color) {
    return this.colorSelected == color;
  }

}
