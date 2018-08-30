var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Nav } from 'ionic-angular';
import { ServiciosProvider } from '../../providers/servicios/servicios';
import { SpinnerProvider } from '../../providers/spinner/spinner';
import { Device } from '@ionic-native/device';
import { ServerProvider } from '../../providers/server/server';
/**
 * Generated class for the DetalleservicioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var DetalleservicioPage = /** @class */ (function () {
    function DetalleservicioPage(server, device, spinner, toastCtrl, _servicio, navCtrl, navParams) {
        this.server = server;
        this.device = device;
        this.spinner = spinner;
        this.toastCtrl = toastCtrl;
        this._servicio = _servicio;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.preciototal = 0;
        this.serv = navParams.get("servicio");
        this.host = this.server.getMyGlobalVar();
    }
    DetalleservicioPage.prototype.presentToast = function () {
        var toast = this.toastCtrl.create({
            message: 'Perfecto nuestra socia vendra hacia ti atenderte',
            duration: 4000
        });
        toast.present();
    };
    DetalleservicioPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this._servicio.detalleservicio(this.navParams.get("servicio"))
            .subscribe(function (data) {
            console.log(data);
            _this.ped = data[0]['pedidos'];
            for (_this.ser in _this.ped) {
                console.log('que.....', _this.ped[_this.ser]);
                _this.todoser = _this.ped[_this.ser].subcategoria__nombre + ' S/. ' + _this.ped[_this.ser].subcategoria__precio + '<br>' + _this.todoser;
                _this.preciototal = _this.ped[_this.ser].subcategoria__precio + _this.preciototal;
            }
            _this.codigo_servicio = data[0]['id'];
            _this.precio = _this.preciototal;
            _this.fecha = data[0]['fecha'];
            _this.fecha_inicio = data[0]['fecha_inicio'];
            _this.nombre = data[0]['cliente__nombre'];
            _this.estado = data[0]['estado__nombre'];
            _this.socia = data[0]['socia__nombre'];
            _this.referencia = data[0]['referencia'];
            _this.socia__photo = data[0]['socia__photo'];
            console.log('jsjsj', _this.socia__photo);
        });
    };
    DetalleservicioPage.prototype.aceptar = function (servicio) {
        var _this = this;
        this.spinner.load();
        this._servicio.detalleservicio(this.navParams.get("servicio"))
            .subscribe(function (data) {
            _this._servicio.aceptaservicio(data[0]['id'])
                .subscribe(function (data) {
                _this._servicio.detalleservicio(_this.navParams.get("servicio"))
                    .subscribe(function (data) {
                    _this.estado = data[0]['estado__nombre'];
                    _this.spinner.dismiss();
                    _this.presentToast();
                });
            });
        });
    };
    DetalleservicioPage.prototype.pagar = function () {
        window.open('https://mylookxpress.com/culqui.php?precio=' + this.precio + '&codigo=' + this.codigo_servicio + '&nombre=' + this.nombre + '&pedidos=' + this.todoser);
    };
    DetalleservicioPage.prototype.cancelar = function (servicio) {
        var _this = this;
        this.spinner.load();
        this._servicio.detalleservicio(this.navParams.get("servicio"))
            .subscribe(function (data) {
            _this._servicio.cancelarservicio(data[0]['id'])
                .subscribe(function (data) {
                _this._servicio.detalleservicio(_this.navParams.get("servicio"))
                    .subscribe(function (data) {
                    _this.estado = data[0]['estado__nombre'];
                    _this.spinner.dismiss();
                    _this.presentToast();
                });
            });
        });
    };
    __decorate([
        ViewChild(Nav),
        __metadata("design:type", Nav)
    ], DetalleservicioPage.prototype, "nav", void 0);
    DetalleservicioPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-detalleservicio',
            templateUrl: 'detalleservicio.html',
            providers: [ServerProvider]
        }),
        __metadata("design:paramtypes", [ServerProvider, Device, SpinnerProvider, ToastController, ServiciosProvider, NavController, NavParams])
    ], DetalleservicioPage);
    return DetalleservicioPage;
}());
export { DetalleservicioPage };
//# sourceMappingURL=detalleservicio.js.map