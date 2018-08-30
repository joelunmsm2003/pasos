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
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { Http, RequestOptions, Headers } from '@angular/http';
import { App, Nav } from 'ionic-angular';
import { IntroPage } from '../../pages/intro/intro';
import { LoginPage } from '../../pages/login/login';
import { InicioPage } from '../../pages/inicio/inicio';
import { Validators, FormBuilder } from '@angular/forms';
import { PerfilProvider } from '../../providers/perfil/perfil';
import { Storage } from '@ionic/storage';
import { ServerProvider } from '../../providers/server/server';
/**
 * Generated class for the RegistroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var RegistroprincipalPage = /** @class */ (function () {
    // @ViewChild(Nav) nav: Nav;
    function RegistroprincipalPage(server, nav, storage, _perfil, alertCtrl, view, formBuilder, appCtrl, http, navCtrl, navParams) {
        this.server = server;
        this.nav = nav;
        this.storage = storage;
        this._perfil = _perfil;
        this.alertCtrl = alertCtrl;
        this.view = view;
        this.formBuilder = formBuilder;
        this.appCtrl = appCtrl;
        this.http = http;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.user = {};
        this.todo = this.formBuilder.group({
            email: ['', Validators.required],
            nombre: [''],
            password: [''],
        });
        this.loginPage = LoginPage;
    }
    RegistroprincipalPage.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        console.log('Page...', page);
        this.nav.setRoot(page);
    };
    RegistroprincipalPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RegistroPage');
    };
    RegistroprincipalPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        console.log('Did....Enter');
        this.storage.get('token').then(function (val) { if (val) {
            _this.appCtrl.getRootNav().push(IntroPage);
        } });
    };
    RegistroprincipalPage.prototype.showAlert = function (data) {
        console.log(data);
        var alert = this.alertCtrl.create({
            title: 'My Look Xpress',
            subTitle: 'Bienvenido, porfavor ingresa',
            buttons: ['OK']
        });
        alert.present();
    };
    RegistroprincipalPage.prototype.emailrepetido = function () {
        var alert = this.alertCtrl.create({
            title: 'My Look Xpress',
            subTitle: 'Este correo ya existe porfavor escoja otra',
            buttons: ['Cerrar']
        });
        alert.present();
    };
    RegistroprincipalPage.prototype.closeModal = function () {
        this.view.dismiss();
    };
    RegistroprincipalPage.prototype.logForm = function (env) {
        var _this = this;
        console.log(env.email);
        var creds = JSON.stringify({ username: env.email, password: env.password });
        var options = new RequestOptions({
            headers: new Headers({ 'Content-Type': 'application/json' })
        });
        function sleep(time) {
            return new Promise(function (resolve) { return setTimeout(resolve, time); });
        }
        this.http.post(this.server.getMyGlobalVar() + 'registro/', env, options)
            .subscribe(function (data) {
            console.log('eroo..', data['_body']);
            if (data['_body'] == '"ok"') {
                console.log('ingrese');
                ///Logeandose
                _this.http.post(_this.server.getMyGlobalVar() + 'api-token-auth/', creds, options)
                    .subscribe(function (data) {
                    console.log('ingresando..', data);
                    _this.storage.set('token', JSON.parse(data["_body"]).token);
                    _this._perfil.miperfil();
                    console.log('Registre...');
                    //this.appCtrl.getRootNav().push(IntroPage);
                    _this.nav.push(InicioPage);
                    //this.nav.setRoot(IntroPage);
                });
            }
            if (data['_body'] == 0) {
                _this.emailrepetido();
            }
        });
    };
    RegistroprincipalPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-registroprincipal',
            templateUrl: 'registroprincipal.html',
            providers: [ServerProvider]
        }),
        __metadata("design:paramtypes", [ServerProvider, Nav, Storage, PerfilProvider, AlertController, ViewController, FormBuilder, App, Http, NavController, NavParams])
    ], RegistroprincipalPage);
    return RegistroprincipalPage;
}());
export { RegistroprincipalPage };
//# sourceMappingURL=registroprincipal.js.map