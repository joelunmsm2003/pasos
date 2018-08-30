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
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { RequestOptions, Headers } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
/**
 * Generated class for the PagoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PagoPage = /** @class */ (function () {
    function PagoPage(authHttp, view, navCtrl, navParams) {
        this.authHttp = authHttp;
        this.view = view;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    PagoPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PagoPage');
    };
    PagoPage.prototype.closeModal = function () {
        this.view.dismiss();
    };
    PagoPage.prototype.pagar = function () {
        var options = new RequestOptions({
            headers: new Headers({ 'Content-Type': 'application/json' })
        });
        var creds = JSON.stringify({ categoria: '99', socia: 'data' });
        this.authHttp.post('http://104.236.247.3:8000/creatoken/', creds, options)
            .subscribe(function (data) {
        });
    };
    PagoPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-pago',
            templateUrl: 'pago.html',
        }),
        __metadata("design:paramtypes", [AuthHttp, ViewController, NavController, NavParams])
    ], PagoPage);
    return PagoPage;
}());
export { PagoPage };
//# sourceMappingURL=pago.js.map