import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ServerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServerProvider {

  myGlobalVar:any;
  
  constructor() {

    this.myGlobalVar = "http://138.68.230.137:8000/";
    //this.myGlobalVar = "https://mylookxpressapp.com:2500/";
  
  }

  setMyGlobalVar(value) {
    this.myGlobalVar = value;
  }

  getMyGlobalVar() {
    return this.myGlobalVar;
  }

}
