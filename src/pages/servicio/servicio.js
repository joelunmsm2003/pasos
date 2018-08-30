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
import { Device } from '@ionic-native/device';
import { Http, RequestOptions, Headers } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { ServerProvider } from '../../providers/server/server';
/**
 * Generated class for the ServicioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ServicioPage = /** @class */ (function () {
    function ServicioPage(server, authHttp, http, device, navCtrl, navParams) {
        this.server = server;
        this.authHttp = authHttp;
        this.http = http;
        this.device = device;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        var creds = JSON.stringify({ model: this.device.model, tipo: this.device.version });
        var options = new RequestOptions({
            headers: new Headers({ 'Content-Type': 'application/json' })
        });
        this.authHttp.post(this.server.getMyGlobalVar() + 'guardadatosmovil/', creds, options)
            .subscribe(function (data) {
            console.log(data);
        });
    }
    ServicioPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ServicioPage');
    };
    ServicioPage.prototype.home = function () {
        this.navCtrl.popToRoot();
    };
    ServicioPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-servicio',
            templateUrl: 'servicio.html',
            providers: [ServerProvider]
        }),
        __metadata("design:paramtypes", [ServerProvider, AuthHttp, Http, Device, NavController, NavParams])
    ], ServicioPage);
    return ServicioPage;
}());
export { ServicioPage };
//# sourceMappingURL=servicio.js.map