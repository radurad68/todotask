import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Task } from '../../interfaces/task';
import { Project } from '../../interfaces/project';
import { ProjectsServiceProvider } from '../../providers/projects-service/projects-service';

import { ProjectsListPage } from '../../pages/projects-list/projects-list';

/**
 * Generated class for the TaskAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

class ButtonFlag {
  image: string;

  constructor(image: string) {
    this.image = image;
  }
}

@IonicPage()
@Component({
  selector: 'page-task-add',
  templateUrl: 'task-add.html',
})
export class TaskAddPage {

  // UI
  name: string;
  isValid: boolean = false;
  title: string = "New Task";

  // models
  project: Project; // project to add to
  task: Task; // task to add/edit
  projectOld: Project; // project to move from
  isOtherProject: boolean = false;

  buttons: Array<ButtonFlag>;
  priorityIndex: number = 0;


  // utils
  isAdd: boolean = true;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public projectsService: ProjectsServiceProvider
  ) {
    this.projectOld = this.navParams.get('projectForTaskAdd');
    this.project = new Project(this.projectOld.name, this.projectOld.color);
    this.isOtherProject = false;

    if (this.navParams.get('new') != undefined) {
      this.isAdd = true;
    }
    if (this.navParams.get('edit') != undefined && this.navParams.get('task') != undefined) {
      this.isAdd = false;
      this.task = this.navParams.get('task');
      this.name = this.task.name;
      this.isValid = true;
      this.priorityIndex = this.task.priority;
    }

    this.title = this.isAdd ? 'New Task' : 'Edit Task';

    // subscribe to changes from projects list
    this.projectsService.projectTask$.subscribe(project => {
      if (project != null && project != undefined) {
        console.log('new project selected');
        this.project = project;
        this.isOtherProject = true;
      }
    })

    this.prepareButtons();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskAddPage');
  }

  // Actions

  onSave() {
    if (this.isAdd) {
      let task = new Task(this.name);
      task.priority = this.priorityIndex;
      if (this.isOtherProject) {
        this.projectsService.addTask(this.project, task);
      }
      else {
        this.projectsService.addTask(this.projectOld, task);
      }
    }
    else {
      this.task.name = this.name;
      this.task.priority = this.priorityIndex;
      if (this.isOtherProject && this.projectOld != this.project) {
        this.projectsService.moveTask(this.projectOld, this.task, this.project);
      }
      else {
        this.projectsService.updateProject(this.projectOld);
      }
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

  onSelectProject() {
    this.navCtrl.push(ProjectsListPage, {
      projectForTaskSelect: this.isOtherProject ? this.project : this.projectOld
    });
  }

  onButtonPressed(button) {
    this.priorityIndex = this.buttons.indexOf(button);
  }

  isButtonSelected(button) {
    return this.priorityIndex == this.buttons.indexOf(button);
  }

  // Buttons

  prepareButtons() {
    this.buttons = new Array<ButtonFlag>();
    let buttonLow = new ButtonFlag("/assets/imgs/FlagWhite.png");
    let buttonMedium = new ButtonFlag("/assets/imgs/FlagYellow.png");
    let buttonMediumHigh = new ButtonFlag("/assets/imgs/FlagOrange.png");
    let buttonHigh = new ButtonFlag("/assets/imgs/FlagRed.png");
    this.buttons.push(buttonLow);
    this.buttons.push(buttonMedium);
    this.buttons.push(buttonMediumHigh);
    this.buttons.push(buttonHigh);
  }


}
