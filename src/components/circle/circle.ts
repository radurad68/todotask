import { Component } from '@angular/core';

/**
 * Generated class for the CircleComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'circle',
  templateUrl: 'circle.html'
})
export class CircleComponent {

  text: string;

  constructor() {
    console.log('Hello CircleComponent Component');
    this.text = 'Hello World';
  }

}
