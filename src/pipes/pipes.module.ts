import { NgModule } from '@angular/core';
import { SubcategoriaPipe } from './subcategoria/subcategoria';
import { FilterPipe } from './filter/filter';
@NgModule({
	declarations: [SubcategoriaPipe,
    FilterPipe],
	imports: [],
	exports: [SubcategoriaPipe,
    FilterPipe]
})
export class PipesModule {}
