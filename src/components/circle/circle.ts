import { Component } from '@angular/core';
import { Input, Renderer, ViewChild, ElementRef } from '@angular/core';

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

  @ViewChild('circle', {read: ElementRef}) circle;
  @Input('circleColor') circleColor;
  @Input('circleHeight') circleHeight;
  @Input('circleWidth') circleWidth;
  @Input('circleTransform') circleTransform;

  constructor(
    public renderer: Renderer
  ) {
    console.log('Hello CircleComponent Component');
  }

  ngAfterViewInit() {
    this.renderer.setElementStyle(this.circle.nativeElement, 'background', this.circleColor);
    if (this.circleHeight != undefined) {
      this.renderer.setElementStyle(this.circle.nativeElement, 'height', this.circleHeight + 'px');
    }
    if (this.circleWidth != undefined) {
      this.renderer.setElementStyle(this.circle.nativeElement, 'width', this.circleWidth + 'px');
    }
    if (this.circleTransform != undefined) {
      this.renderer.setElementStyle(this.circle.nativeElement,'transform', this.circleTransform);
    }
  }

  update(color: string) {
    this.renderer.setElementStyle(this.circle.nativeElement, 'background', color);
  }

}
