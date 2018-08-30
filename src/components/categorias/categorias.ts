import { Component } from '@angular/core';
import { PortadaProvider } from '../../providers/portada/portada';
import { Foto } from '../../providers/portada/foto';
import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';
import { Storage } from '@ionic/storage';

import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { ServerProvider } from '../../providers/server/server';
/**
 * Generated class for the CategoriasComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'categoriaspue',
  templateUrl: 'categorias.html',
  providers:[PortadaProvider]
})
export class CategoriasComponent {

  text: string;

  photo1: string;

  photo2: string;

  photo3: string;


  photo4: string;

  photo5: string;

  photo6: string;

  photo7: string;
  photo8: string;

  link1:string;
  link2:string;
  link3:string;
  link4:string;
  link5:string;
  link6:string;
  link7:string;
  link8:string;

  host:any;

   @ViewChild(Slides) slides: Slides;

  // ngAfterViewInit() {
  //   this.slides.autoplay = true;
  // }

  ionViewDidLoad(){


    //setTimeout(()=>this.slides.startAutoplay())

  }



  constructor(public server:ServerProvider,public storage: Storage,private _photo: PortadaProvider) {


    this.host=this.server.getMyGlobalVar()


    function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}


 sleep(5000).then(() => {   



   console.log('!!!!!!!!!!!!!!!!!')



  this.storage.get('sexo').then((val) => {


              this._photo.getfotosdeportada(val)
      .subscribe(data => {

           this.photo1=data[0].photo;

           this.link1=data[0].enlace

           this.photo2=data[1].photo;

           this.link2=data[1].enlace

           this.photo3=data[2].photo

           this.link3=data[2].enlace

           this.photo4=data[3].photo

           this.link4=data[3].enlace



      })




      });


});

  


  //       iradetalle(data){

  //   this.navCtrl.push(DetalleservicioPage, {
  //     servicio: data,
  //   })

  // }



        this._photo.getfotosdepublicidad()
      .subscribe(data => {

           this.photo5=data[0].photo

           this.link5=data[0].enlace

           this.photo6=data[1].photo

           this.link6=data[1].enlace

           this.photo7=data[2].photo

           this.link7=data[2].enlace

           this.photo8=data[3].photo

           this.link8=data[3].enlace
      })





  }


  

    	
  
}


