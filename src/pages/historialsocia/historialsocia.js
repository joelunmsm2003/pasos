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
import { AlertaPage } from '../../pages/alerta/alerta';
/**
 * Generated class for the HistorialsociaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var HistorialsociaPage = /** @class */ (function () {
    function HistorialsociaPage(_servicio, navCtrl, navParams) {
        this._servicio = _servicio;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    HistorialsociaPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad HistorialsociaPage');
        this._servicio.serviciosdesocias()
            .subscribe(function (data) { return _this.servicios = data; });
    };
    HistorialsociaPage.prototype.iradetalle = function (data) {
        this.navCtrl.push(AlertaPage, {
            servicio: data.id,
        });
    };
    HistorialsociaPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-historialsocia',
            templateUrl: 'historialsocia.html',
            providers: [ServiciosProvider]
        }),
        __metadata("design:paramtypes", [ServiciosProvider, NavController, NavParams])
    ], HistorialsociaPage);
    return HistorialsociaPage;
}());
export { HistorialsociaPage };
//# sourceMappingURL=historialsocia.js.map