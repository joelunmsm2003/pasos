import { NgModule } from '@angular/core';
import { FocuserDirective } from './focuser/focuser';
import { ScrollHideDirective } from './scroll-hide/scroll-hide';
@NgModule({
	declarations: [FocuserDirective,
    ScrollHideDirective],
	imports: [],
	exports: [FocuserDirective,
    ScrollHideDirective]
})
export class DirectivesModule {}
