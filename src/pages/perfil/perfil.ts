import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PerfilProvider } from '../../providers/perfil/perfil';
import { User } from '../../providers/perfil/user';
import { ServerProvider } from '../../providers/server/server';
/**
 * Generated class for the PerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
  providers:[ServerProvider]
})
export class PerfilPage {

 	nombre: any;
 	email: any;
 	telefono:any;
  photo:any;
  perfil:User[];
  user_grupo:any;
  correo:any;
  photo_facebook:any;
  cliente:any={};
  codigo:any;

  host:any;

  constructor(public server: ServerProvider,public navCtrl: NavController,private _perfil: PerfilProvider, public navParams: NavParams) {


       this.host=this.server.getMyGlobalVar()

      this._perfil.miperfil()
      .subscribe(data => {

          this.email=data[0]['email']
          this.telefono=data[0]['telefono']
          this.photo=data[0]['photo']
          this.photo_facebook=data[0]['photo_facebook']
          this.user_grupo=data[0]['user__groups__name']
          this.nombre=data[0]['nombre']
          this.correo=data[0]['email']
          this.telefono=data[0]['telefono']
          this.codigo=data[0]['codigo_recibido']

      })

     
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilPage');
  }

  actualiza(nombre,email,telefono,codigo){
 

    this.cliente.nombre=nombre
    this.cliente.email=email
    this.cliente.telefono=telefono
    this.cliente.codigo=codigo

    this._perfil.actualiza(this.cliente)
      .subscribe(data => {

        console.log(data)


      })








  }

}
