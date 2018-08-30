import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
/**
 * Generated class for the RegistrofinalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registrofinal',
  templateUrl: 'registrofinal.html',
})
export class RegistrofinalPage {


 private todo : FormGroup;

 registrosociaPage:any;
  loginPage:any;

  isLoggedIn:boolean = false;
  users: any;
  user:any={};
  telefono:any;
  activa:boolean=false;

  constructor(public navCtrl: NavController, public navParams: NavParams,private formBuilder: FormBuilder) {


  this.todo = this.formBuilder.group({
      email: ['', Validators.required],
      nombre: [''],


    });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrofinalPage');
  }


   logForm(env) {
    console.log(env.email)


  }

}
