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
import { IonicPage, NavController, NavParams, ViewController, AlertController, ToastController } from 'ionic-angular';
import { Http, RequestOptions, Headers } from '@angular/http';
import { App } from 'ionic-angular';
import { LoginPage } from '../../pages/login/login';
import { Validators, FormBuilder } from '@angular/forms';
import { PerfilProvider } from '../../providers/perfil/perfil';
import { Storage } from '@ionic/storage';
import { Facebook } from '@ionic-native/facebook';
import { ServerProvider } from '../../providers/server/server';
import { AuthService } from "angular4-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angular4-social-login";
/**
 * Generated class for the RegistroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var RegistroPage = /** @class */ (function () {
    function RegistroPage(authService, server, toastCtrl, fb, storage, _perfil, alertCtrl, view, formBuilder, appCtrl, http, navCtrl, navParams) {
        ///Facebook
        var _this = this;
        this.authService = authService;
        this.server = server;
        this.toastCtrl = toastCtrl;
        this.fb = fb;
        this.storage = storage;
        this._perfil = _perfil;
        this.alertCtrl = alertCtrl;
        this.view = view;
        this.formBuilder = formBuilder;
        this.appCtrl = appCtrl;
        this.http = http;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.isLoggedIn = false;
        this.user = {};
        fb.getLoginStatus()
            .then(function (res) {
            console.log(res.status);
            if (res.status === "connect") {
                _this.isLoggedIn = true;
            }
            else {
                _this.isLoggedIn = false;
            }
        })
            .catch(function (e) { return console.log(e); });
        this.cargandoregistro();
        ///
        this.todo = this.formBuilder.group({
            email: ['', Validators.required],
            nombre: [''],
            password: [''],
        });
        this.loginPage = LoginPage;
    }
    RegistroPage.prototype.signInWithGoogle = function () {
        this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    };
    RegistroPage.prototype.signInWithFB = function () {
        var _this = this;
        this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
        console.log('datos');
        this.authService.authState.subscribe(function (user) {
            console.log('user...social', user);
            _this.userface = user;
            _this.loggedIn = (user != null);
            //Conexion con Django
            var options = new RequestOptions({
                headers: new Headers({ 'Content-Type': 'application/json' })
            });
            var creds = JSON.stringify({ users: _this.userface });
            _this.http.post(_this.server.getMyGlobalVar() + 'loginfacebook/', creds, options)
                .subscribe(function (data) {
                var creds = JSON.stringify({ username: JSON.parse(data['_body'])['email'], password: JSON.parse(data['_body'])['id_face'] + JSON.parse(data['_body'])['gender'] });
                _this.http.post(_this.server.getMyGlobalVar() + 'api-token-auth/', creds, options)
                    .subscribe(function (data) {
                    _this.storage.set('token', JSON.parse(data["_body"]).token);
                    _this.view.dismiss();
                });
            });
        });
    };
    RegistroPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RegistroPage');
    };
    RegistroPage.prototype.cargandoregistro = function () {
        var toast = this.toastCtrl.create({
            message: 'Registrarte con Facebook o por correo',
            duration: 4000
        });
        toast.present();
    };
    //Facebook
    RegistroPage.prototype.login = function () {
        var _this = this;
        this.fb.login(['public_profile', 'user_friends', 'email'])
            .then(function (res) {
            if (res.status === "connected") {
                _this.isLoggedIn = true;
                _this.getUserDetail(res.authResponse.userID);
            }
            else {
                _this.isLoggedIn = false;
            }
        })
            .catch(function (e) { return console.log('Error logging into Facebook', e); });
    };
    RegistroPage.prototype.logout = function () {
        var _this = this;
        this.fb.logout()
            .then(function (res) { return _this.isLoggedIn = false; })
            .catch(function (e) { return console.log('Error logout from Facebook', e); });
    };
    RegistroPage.prototype.getUserDetail = function (userid) {
        var _this = this;
        this.fb.api("/" + userid + "/?fields=id,email,name,picture,gender", ["public_profile"])
            .then(function (res) {
            _this.users = res;
            var options = new RequestOptions({
                headers: new Headers({ 'Content-Type': 'application/json' })
            });
            var creds = JSON.stringify({ users: _this.users });
            _this.http.post(_this.server.getMyGlobalVar() + 'loginfacebook/', creds, options)
                .subscribe(function (data) {
                var creds = JSON.stringify({ username: JSON.parse(data['_body'])['email'], password: JSON.parse(data['_body'])['id_face'] + JSON.parse(data['_body'])['gender'] });
                _this.http.post(_this.server.getMyGlobalVar() + 'api-token-auth/', creds, options)
                    .subscribe(function (data) {
                    _this.storage.set('token', JSON.parse(data["_body"]).token);
                    _this.view.dismiss();
                });
            });
        })
            .catch(function (e) {
            console.log(e);
        });
    };
    ///Fin
    RegistroPage.prototype.showAlert = function (data) {
        console.log(data);
        var alert = this.alertCtrl.create({
            title: 'My Look Xpress',
            subTitle: 'Bienvenido, porfavor ingresa',
            buttons: ['OK']
        });
        alert.present();
    };
    RegistroPage.prototype.emailrepetido = function () {
        var alert = this.alertCtrl.create({
            title: 'My Look Xpress',
            subTitle: 'Este correo ya existe porfavor escoja otra',
            buttons: ['Cerrar']
        });
        alert.present();
    };
    RegistroPage.prototype.closeModal = function () {
        this.view.dismiss();
    };
    RegistroPage.prototype.logForm = function (env) {
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
                    _this.view.dismiss();
                    //this.appCtrl.getRootNav().push(UbicacionPage);
                });
            }
            if (data['_body'] == 0) {
                _this.emailrepetido();
            }
        });
    };
    RegistroPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-registro',
            templateUrl: 'registro.html',
            providers: [ServerProvider]
        }),
        __metadata("design:paramtypes", [AuthService, ServerProvider, ToastController, Facebook, Storage, PerfilProvider, AlertController, ViewController, FormBuilder, App, Http, NavController, NavParams])
    ], RegistroPage);
    return RegistroPage;
}());
export { RegistroPage };
//# sourceMappingURL=registro.js.map