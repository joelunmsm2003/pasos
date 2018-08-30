import { HttpClient } from '@angular/common/http';
import { Http , Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Observable';
import { Categoria } from './categoria';
import { Subcategoria } from './subcategoria';
import { ServerProvider } from '../server/server';

/*
  Generated class for the CategoriasProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/


@Injectable()
export class CategoriasProvider {

  items: any;

  myGlobalVar:any;
 
  constructor(public _http: Http, public server:ServerProvider) {
    console.log('Hello CategoriasProvider Provider');

     



  }

  getcategorias(distrito): Observable<Categoria[]> {
      return this._http.get(this.server.getMyGlobalVar()+'categoria/'+distrito)
      .map((response: Response) => <Categoria[]> response.json())

   }

  getsubcategorias(categoria,distrito): Observable<Subcategoria[]> {
      return this._http.get(this.server.getMyGlobalVar()+'subcategoria/'+categoria+'/'+distrito)
      .map((response: Response) => <Subcategoria[]> response.json())
  
   }

  _getsubcategorias(): Observable<Subcategoria[]> {
      return this._http.get(this.server.getMyGlobalVar()+'_subcategorias/')
      .map((response: Response) => <Subcategoria[]> response.json())
  
   }


   filterItems(data,searchTerm){
 
        return data.filter((item) => {

       
            return item.descripcion.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
        });    
 
    }

}
