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
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServiciosProvider } from '../../providers/servicios/servicios';
import { DetalleservicioPage } from '../../pages/detalleservicio/detalleservicio';
import { ServerProvider } from '../../providers/server/server';
/**
 * Generated class for the HistorialPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var HistorialPage = /** @class */ (function () {
    function HistorialPage(server, _servicio, navCtrl, navParams) {
        var _this = this;
        this.server = server;
        this._servicio = _servicio;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.host = this.server.getMyGlobalVar();
        this._servicio.getservicios()
            .subscribe(function (data) { return _this.servicios = data; });
    }
    HistorialPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad HistorialPage');
    };
    HistorialPage.prototype.iradetalle = function (data) {
        this.navCtrl.push(DetalleservicioPage, {
            servicio: data.id,
        });
    };
    HistorialPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-historial',
            templateUrl: 'historial.html',
            providers: [ServerProvider]
        }),
        __metadata("design:paramtypes", [ServerProvider, ServiciosProvider, NavController, NavParams])
    ], HistorialPage);
    return HistorialPage;
}());
export { HistorialPage };
//# sourceMappingURL=historial.js.map