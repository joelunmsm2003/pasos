import { Component } from '@angular/core';

/**
 * Generated class for the DetalleproductoComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'detalleproducto',
  templateUrl: 'detalleproducto.html'
})
export class DetalleproductoComponent {

  text: string;

  constructor() {
    console.log('Hello DetalleproductoComponent Component');
    this.text = 'Hello World';
  }

}
