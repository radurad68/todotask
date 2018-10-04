import { NgModule } from '@angular/core';
import { CircleComponent } from './circle/circle';
import { ListOptionsComponent } from './list-options/list-options';
@NgModule({
	declarations: [CircleComponent,
    ListOptionsComponent],
	imports: [],
	exports: [CircleComponent,
    ListOptionsComponent]
})
export class ComponentsModule {}
