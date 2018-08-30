var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { AuthHttp } from 'angular2-jwt';
import { ServerProvider } from '../../providers/server/server';
/*
  Generated class for the ServiciosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var ServiciosProvider = /** @class */ (function () {
    function ServiciosProvider(authHttp, _http, server) {
        this.authHttp = authHttp;
        this._http = _http;
        this.server = server;
        console.log('Hello ServiciosProvider Provider');
    }
    ServiciosProvider.prototype.getservicios = function () {
        return this.authHttp.get(this.server.getMyGlobalVar() + 'miservicios/')
            .map(function (response) { return response.json(); });
    };
    ServiciosProvider.prototype.detalleservicio = function (id_servicio) {
        return this.authHttp.get(this.server.getMyGlobalVar() + 'detalleservicio/' + id_servicio)
            .map(function (response) { return response.json(); });
    };
    ServiciosProvider.prototype.ultimoservicio = function () {
        return this.authHttp.get(this.server.getMyGlobalVar() + 'ultimoservicio/')
            .map(function (response) { return response.json(); });
    };
    ServiciosProvider.prototype.serviciosdesocias = function () {
        return this.authHttp.get(this.server.getMyGlobalVar() + 'miserviciossocias/2')
            .map(function (response) { return response.json(); });
    };
    ServiciosProvider.prototype.aceptaservicio = function (id_servicio) {
        return this.authHttp.get(this.server.getMyGlobalVar() + 'aceptaserviciocliente/' + id_servicio)
            .map(function (response) { return response.json(); });
    };
    ServiciosProvider.prototype.cancelarservicio = function (id_servicio) {
        return this.authHttp.get(this.server.getMyGlobalVar() + 'cancelaserviciocliente/' + id_servicio)
            .map(function (response) { return response.json(); });
    };
    ServiciosProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [AuthHttp, HttpClient, ServerProvider])
    ], ServiciosProvider);
    return ServiciosProvider;
}());
export { ServiciosProvider };
//# sourceMappingURL=servicios.js.map