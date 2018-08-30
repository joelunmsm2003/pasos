var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams, AlertController, ToastController, ModalController, MenuController } from 'ionic-angular';
import { CategoriasProvider } from '../../providers/categorias/categorias';
import { Http, RequestOptions, Headers } from '@angular/http';
import { FormBuilder } from '@angular/forms';
import { ReservaPage } from '../reserva/reserva';
import { CarritoPage } from '../carrito/carrito';
import { UbicacionPage } from '../ubicacion/ubicacion';
import { Storage } from '@ionic/storage';
import { ServerProvider } from '../../providers/server/server';
/**
 * Generated class for the VentaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var VentaPage = /** @class */ (function () {
    function VentaPage(server, menuCtrl, appCtrl, modalCtrl, toastCtrl, formBuilder, alertCtrl, storage, _categoria, navCtrl, http, navParams) {
        var _this = this;
        this.server = server;
        this.menuCtrl = menuCtrl;
        this.appCtrl = appCtrl;
        this.modalCtrl = modalCtrl;
        this.toastCtrl = toastCtrl;
        this.formBuilder = formBuilder;
        this.alertCtrl = alertCtrl;
        this.storage = storage;
        this._categoria = _categoria;
        this.navCtrl = navCtrl;
        this.http = http;
        this.navParams = navParams;
        this.myVar = true;
        this.book = 0;
        this.precio = 0;
        this.pedido = new Array();
        this.muestradescripcion = true;
        this.todo = this.formBuilder.group({
            experiencia: [''],
            referencia: [''],
            comentario: ['']
        });
        this.host = this.server.getMyGlobalVar();
        this.presentToast();
        this.storage.get('distrito').then(function (val) {
            _this.distrito = val;
            if (val == null) {
                _this.distrito = 1;
            }
            _this.cate = navParams.get("categoria");
            console.log('cate...', _this.cate);
            // this._categoria.getsubcategorias(1,this.distrito)
            // .subscribe(data => 
            // this.mano = data);
            // this._categoria.getsubcategorias(2,this.distrito)
            // .subscribe(data => this.pies = data);
            // this._categoria.getsubcategorias(3,this.distrito)
            // .subscribe(data => this.maquillaje = data);
            // this._categoria.getsubcategorias(4,this.distrito)
            // .subscribe(data => this.podologia = data);
            // this._categoria.getsubcategorias(5,this.distrito)
            // .subscribe(data => this.masajes = data);
            // this._categoria.getsubcategorias(6,this.distrito)
            // .subscribe(data => this.manicureninas = data);
            // this._categoria.getsubcategorias(7,this.distrito)
            // .subscribe(data => this.baber = data);
            // this._categoria.getsubcategorias(8,this.distrito)
            // .subscribe(data => this.extras = data);
            // this._categoria.getsubcategorias(9,this.distrito)
            // .subscribe(data => this.cabello = data);
            // this._categoria.getsubcategorias(10,this.distrito)
            // .subscribe(data => this.promociones = data);
            //this.traesubcategorias(this.cate)
            setTimeout(function () {
                _this.traesubcategorias(_this.cate);
            }, 1000);
        });
        this.reservaPage = ReservaPage;
        this.ubicacionPage = UbicacionPage;
        this.cate = navParams.get("categoria");
        console.log('nva', this.cate);
        this.storage.get('sexo').then(function (val) {
            console.log('sexo', val);
            if (val == null) {
                val = 1;
            }
            _this._categoria.getcategorias(val)
                .subscribe(function (data) {
                console.log('fgfgggf', data);
                _this.categoria = data;
            });
        });
    }
    VentaPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad VentaPage');
    };
    VentaPage.prototype.openMenu = function () {
        console.log('abriendo...');
        this.menuCtrl.open();
    };
    VentaPage.prototype.carritoModal = function () {
        this.storage.set('pedido', this.pedido);
        this.storage.set('precio', this.precio);
        var profileModal = this.modalCtrl.create(CarritoPage, {
            mano: this.mano,
            pies: this.pies,
            maquillaje: this.maquillaje,
            podologia: this.podologia,
            masajes: this.masajes,
            manicureninas: this.manicureninas,
            baber: this.baber,
            extras: this.extras,
            cabello: this.cabello,
            promociones: this.promociones
        });
        profileModal.present();
    };
    VentaPage.prototype.presentToast = function () {
        var toast = this.toastCtrl.create({
            message: 'Agrega todas las categorias que desees, para llenar tu carrito de compras',
            duration: 4000
        });
        toast.present();
    };
    VentaPage.prototype.agregatoast = function (data) {
        var toast = this.toastCtrl.create({
            message: 'Perfecto !! agregaste ' + data,
            duration: 4000
        });
        toast.present();
    };
    VentaPage.prototype.toastcategoria = function (data) {
        var toast = this.toastCtrl.create({
            message: data,
            duration: 1000,
            position: 'top'
        });
        toast.present();
    };
    VentaPage.prototype.showAlert = function (data) {
        console.log(data);
        var alert = this.alertCtrl.create({
            title: data.nombre,
            subTitle: data.descripcion,
            cssClass: 'alertCustomCss',
            buttons: ['OK']
        });
        alert.present();
    };
    VentaPage.prototype.traesubcategorias = function (data) {
        var _this = this;
        console.log('traesubcategorias..', data.id);
        this.toastcategoria(data.nombre);
        this.cate = data;
        this._categoria.getsubcategorias(data.id, this.distrito)
            .subscribe(function (data) { return _this.subcategoria = data; });
        // this._categoria.getsubcategorias(data.id)
        //     .subscribe(data => this.subcategoria = data);
        // if (data.id==1){
        //   this.subcategoria = this.mano
        // }
        // if (data.id==2){
        //   this.subcategoria = this.pies
        // }
        //  if (data.id==3){
        //   this.subcategoria = this.maquillaje
        // }
        //  if (data.id==4){
        //   this.subcategoria = this.podologia
        // }
        //  if (data.id==5){
        //   this.subcategoria = this.masajes
        // }
        //   if (data.id==6){
        //   this.subcategoria = this.manicureninas
        // }
        //  if (data.id==7){
        //   this.subcategoria = this.baber
        // }
        // if (data.id==8){
        //   this.subcategoria = this.extras
        // }
        //  if (data.id==9){
        //   this.subcategoria = this.cabello
        // }
        // if (data.id==10){
        //   this.subcategoria = this.promociones
        // }
    };
    VentaPage.prototype.agregacarrito = function (data) {
        //this.agregatoast(data.nombre)
        console.log('indexof', this.pedido.indexOf(data));
        this.pedido.push(data);
        console.log('pedido', this.pedido);
        this.precio = this.precio + data.precio;
        this.book = this.book + 1;
    };
    VentaPage.prototype.quitacarrito = function (data) {
        var index = this.pedido.indexOf(data);
        if (index !== -1) {
            this.pedido.splice(index, 1);
        }
        this.book = this.book - 1;
        this.precio = this.precio - data.precio;
        console.log('pedido', this.pedido);
    };
    VentaPage.prototype.continuar = function () {
        console.log('avanza', this.pedido);
        this.storage.set('pedido', this.pedido);
        this.storage.set('precio', this.precio);
        this.appCtrl.getRootNav().push(UbicacionPage);
    };
    VentaPage.prototype.reset = function (data) {
        console.log('resetando...', data, this.categoria);
        for (var i = 0; i < this.categoria.length; i++) {
            this.categoria[i]['check'] = true;
        }
        data.check = false;
    };
    VentaPage.prototype.enviasocia = function (data) {
        var creds = JSON.stringify({ categoria: this.pedido, socia: data });
        var options = new RequestOptions({
            headers: new Headers({ 'Content-Type': 'application/json' })
        });
        this.http.post(this.server.getMyGlobalVar() + 'nuevasocia/', creds, options)
            .subscribe(function (data) {
        });
    };
    VentaPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-venta',
            templateUrl: 'venta.html',
            providers: [CategoriasProvider, ServerProvider]
        }),
        __metadata("design:paramtypes", [ServerProvider, MenuController, App, ModalController, ToastController, FormBuilder, AlertController, Storage, CategoriasProvider, NavController, Http, NavParams])
    ], VentaPage);
    return VentaPage;
}());
export { VentaPage };
//# sourceMappingURL=venta.js.map