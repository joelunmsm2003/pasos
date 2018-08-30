import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the SubcategoriaPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'subcategoria',
})
export class SubcategoriaPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    return value.toLowerCase();
  }
}
