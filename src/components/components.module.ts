import { NgModule } from '@angular/core';

import { HttpModule } from '@angular/http'
import { DetalleproductoComponent } from './detalleproducto/detalleproducto';


@NgModule({
	declarations: [DetalleproductoComponent

   
    ],
	imports: [HttpModule],
	exports: [DetalleproductoComponent


    ]
})
export class ComponentsModule {}
