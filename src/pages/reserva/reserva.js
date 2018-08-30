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
import { ModalController, App, IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { HomePage } from '../home/home';
import { RegistroPage } from '../registro/registro';
import { Storage } from '@ionic/storage';
import { AuthHttp } from 'angular2-jwt';
import { SpinnerProvider } from '../../providers/spinner/spinner';
import { ServiciosProvider } from '../../providers/servicios/servicios';
import { PerfilProvider } from '../../providers/perfil/perfil';
import { GoogleMaps } from '@ionic-native/google-maps';
import { ServerProvider } from '../../providers/server/server';
/**
 * Generated class for the ReservaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ReservaPage = /** @class */ (function () {
    function ReservaPage(server, _perfil, loadingCtrl, _servicio, toastCtrl, spinner, modalCtrl, appCtrl, authHttp, storage, http, navCtrl, navParams, googleMaps) {
        var _this = this;
        this.server = server;
        this._perfil = _perfil;
        this.loadingCtrl = loadingCtrl;
        this._servicio = _servicio;
        this.toastCtrl = toastCtrl;
        this.spinner = spinner;
        this.modalCtrl = modalCtrl;
        this.appCtrl = appCtrl;
        this.authHttp = authHttp;
        this.storage = storage;
        this.http = http;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.googleMaps = googleMaps;
        this.rootPage = HomePage;
        this.todoservicio = '';
        this.todoser = '';
        this.storage.get('pedido').then(function (val) {
            console.log('entre putas...');
            _this.pedidos = val;
            for (_this.i = 0; _this.i < _this.pedidos.length; _this.i++) {
                console.log('iiii', _this.pedidos[_this.i]);
                _this.todoservicio = _this.todoservicio + ' * ' + _this.pedidos[_this.i].nombre;
            }
        });
        this._perfil.miperfil()
            .subscribe(function (data) {
            _this.email = data[0]['email'];
            _this.telefono = data[0]['telefono'];
            _this.nombre = data[0]['nombre'];
        });
        this.agregatoast();
        this.storage.get('pedido').then(function (val) {
            _this.pedidos = val;
            for (_this.ser in _this.pedidos) {
                console.log('que.....', _this.pedidos[_this.ser]);
                _this.todoser = _this.pedidos[_this.ser].nombre + ' S/. ' + _this.pedidos[_this.ser].precio + '<br>' + _this.todoser;
            }
        });
        this.storage.get('ubicacion').then(function (val) {
            _this.ubicacion = val;
        });
        this.storage.get('precio').then(function (val) {
            _this.precio = val;
        });
        this.storage.get('dia').then(function (val) {
            _this.dia = val;
        });
        this.storage.get('hora').then(function (val) {
            _this.hora = val;
        });
        this.storage.get('referencia').then(function (val) {
            _this.referencia = val;
        });
        this.spinner.load();
        this.storage.get('token').then(function (val) {
            if (val == null) {
                _this.presentProfileModal();
                _this.spinner.dismiss();
            }
            else {
                var myHeader = new Headers();
                myHeader.append('Content-Type', 'application/json');
                _this.data = {
                    'pedido': _this.pedidos,
                    'ubicacion': _this.ubicacion,
                    'dia': _this.dia,
                    'hora': _this.hora,
                    'referencia': _this.referencia
                };
                _this.authHttp.post(_this.server.getMyGlobalVar() + 'buscasocia/1', _this.data)
                    .subscribe(function (data) {
                    console.log('resultados de busqueda..', JSON.parse(data['_body'])[0]['servicio_id']);
                    _this.id_servicio = JSON.parse(data['_body'])[0]['servicio_id'];
                    _this.socia = JSON.parse(data['_body'])[0]['servicio__socia__nombre'];
                    _this.photo_socia = JSON.parse(data['_body'])[0]['servicio__socia__photo'];
                    _this.telefono = JSON.parse(data['_body'])[0]['servicio__socia__telefono'];
                    _this.codigo_servicio = JSON.parse(data['_body'])[0]['servicio_id'];
                    //sthis.appCtrl.getRootNav().push(ServicioPage);
                    _this.spinner.dismiss();
                });
            }
        });
    }
    ReservaPage.prototype.agregatoast = function () {
        var toast = this.toastCtrl.create({
            message: 'Estamos a un paso, de completar tu pedido !',
            duration: 4000
        });
        toast.present();
    };
    ReservaPage.prototype.presentProfileModal = function () {
        var profileModal = this.modalCtrl.create(RegistroPage, { userId: 8675309 });
        profileModal.present();
    };
    ReservaPage.prototype.pagar = function () {
        //this.presentProfileModal()
        window.open('https://mylookxpress.com/culqui.php?precio=' + this.precio + '&codigo=' + this.codigo_servicio + '&nombre=' + this.nombre + '&pedidos=' + this.todoser);
    };
    ReservaPage.prototype.quitacarrito = function (data) {
        console.log('jsjs', data);
        var index = this.pedidos.indexOf(data);
        if (index !== -1) {
            console.log('isisi', this.pedidos[index]);
            this.precio = this.precio - this.pedidos[index].precio;
            this.pedidos.splice(index, 1);
        }
    };
    ReservaPage.prototype.presentToast = function () {
        var toast = this.toastCtrl.create({
            message: 'Excellente ! hemos completado tu solicitud, en breve te contactaremos con nuestra socia',
            duration: 4000
        });
        toast.present();
    };
    ReservaPage.prototype.aceptar = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: 'Estamos procesando tu pedido.',
        });
        this.spinner.load();
        loader.present().then(function () {
            _this._servicio.aceptaservicio(_this.id_servicio)
                .subscribe(function (data) {
                // this._servicio.detalleservicio(this.navParams.get("servicio"))
                // .subscribe(data => {
                // this.estado=data[0]['estado__nombre'];
                _this.navCtrl.popToRoot();
                _this.storage.set('newservice', 1);
                _this.spinner.dismiss();
                _this.presentToast();
            });
            loader.dismiss();
        });
    };
    ReservaPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-reserva',
            templateUrl: 'reserva.html',
            providers: [ServerProvider]
        }),
        __metadata("design:paramtypes", [ServerProvider, PerfilProvider, LoadingController, ServiciosProvider, ToastController, SpinnerProvider, ModalController, App, AuthHttp, Storage, Http, NavController, NavParams, GoogleMaps])
    ], ReservaPage);
    return ReservaPage;
}());
export { ReservaPage };
//# sourceMappingURL=reserva.js.map