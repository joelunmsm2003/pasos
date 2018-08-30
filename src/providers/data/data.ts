import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { CategoriasProvider } from '../../providers/categorias/categorias';
import 'rxjs/add/operator/map';
@Injectable()
export class DataProvider {
items: any;
constructor(public http: Http,private _categoria: CategoriasProvider) {


 


}

   
  filterItems(_data,searchTerm){


  	console.log('filterItems',_data)
  return _data.filter((item) => {
   return item.title.toLowerCase().indexOf(
     searchTerm.toLowerCase()) > -1;
   });
  }
}