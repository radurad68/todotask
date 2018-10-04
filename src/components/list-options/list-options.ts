import { Component, ViewChild, Input, Output, ElementRef, Renderer, EventEmitter } from '@angular/core';

/**
 * Generated class for the ListOptionsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'list-options',
  templateUrl: 'list-options.html'
})
export class ListOptionsComponent {

  @ViewChild('expandWrapper', {read: ElementRef}) expandWrapper;
  @Input('expanded') expanded;
  @Input('expandHeight') expandHeight;
  @Output() onClickOption1 = new EventEmitter();
  @Output() onClickOption2 = new EventEmitter();
 
  constructor(public renderer: Renderer) {
 
  }
 
  ngAfterViewInit(){
    //this.renderer.setElementStyle(this.expandWrapper.nativeElement, 'height', this.expanded ? this.expandHeight + 'px' : '0px');
    this.renderer.setElementStyle(this.expandWrapper.nativeElement, 'height', this.expandHeight + 'px');   
  }

  onFirstOptionClick() {
    this.onClickOption1.emit();
  }

  onSecondOptionClick() {
    this.onClickOption2.emit();
  }

}
