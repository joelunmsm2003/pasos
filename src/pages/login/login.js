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
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import { RegistroPage } from '../../pages/registro/registro';
import { PerfilProvider } from '../../providers/perfil/perfil';
import { Facebook } from '@ionic-native/facebook';
import { App, IonicPage, Nav, ViewController, AlertController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ServerProvider } from '../../providers/server/server';
import { AuthService } from "angular4-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angular4-social-login";
var User = /** @class */ (function () {
    function User(username, password) {
        this.username = username;
        this.password = password;
    }
    return User;
}());
export { User };
var LoginPage = /** @class */ (function () {
    function LoginPage(authService, server, toastCtrl, fb, alertCtrl, view, _perfil, appCtrl, http, authHttp, storage) {
        this.authService = authService;
        this.server = server;
        this.toastCtrl = toastCtrl;
        this.fb = fb;
        this.alertCtrl = alertCtrl;
        this.view = view;
        this._perfil = _perfil;
        this.appCtrl = appCtrl;
        this.http = http;
        this.authHttp = authHttp;
        this.storage = storage;
        this.isLoggedIn = false;
        this.model = new User(null, null);
        this.cargandoregistro();
        this.registroPage = RegistroPage;
    }
    LoginPage.prototype.ionViewWillEnter = function () {
        console.log('Will....Enter');
    };
    LoginPage.prototype.ionViewDidEnter = function () {
        console.log('Did....Enter');
        //this.storage.get('token').then((val) => {if(val){this.appCtrl.getRootNav().push(IntroPage);}});
    };
    LoginPage.prototype.signInWithGoogle = function () {
        this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    };
    LoginPage.prototype.signInWithFB = function () {
        this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    };
    LoginPage.prototype.signOut = function () {
        this.authService.signOut();
    };
    LoginPage.prototype.nologin = function () {
        var alert = this.alertCtrl.create({
            title: 'My Look Xpress',
            subTitle: 'Usuario o contraseña incorrecta',
            buttons: ['Cerrar']
        });
        alert.present();
    };
    //Facebook
    LoginPage.prototype.cargandoregistro = function () {
        var toast = this.toastCtrl.create({
            message: 'Registrarte con Facebook o por correo',
            duration: 4000
        });
        toast.present();
    };
    LoginPage.prototype.login = function () {
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
    LoginPage.prototype.logout = function () {
        var _this = this;
        this.fb.logout()
            .then(function (res) { return _this.isLoggedIn = false; })
            .catch(function (e) { return console.log('Error logout from Facebook', e); });
    };
    LoginPage.prototype.getUserDetail = function (userid) {
        var _this = this;
        this.fb.api("/" + userid + "/?fields=id,email,name,picture,gender", ["public_profile"])
            .then(function (res) {
            _this.users = res;
            var options = new RequestOptions({
                headers: new Headers({ 'Content-Type': 'application/json' })
            });
            var creds = JSON.stringify({ users: _this.users });
            _this.http.post(_this.server.getMyGlobalVar() + '/loginfacebook/', creds, options)
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
    LoginPage.prototype.authenticate = function (username, password) {
        var _this = this;
        console.log('ingresando...');
        var creds = JSON.stringify({ username: username, password: password });
        var jwtHelper = new JwtHelper();
        var options = new RequestOptions({
            headers: new Headers({ 'Content-Type': 'application/json' })
        });
        // sleep time expects milliseconds
        function sleep(time) {
            return new Promise(function (resolve) { return setTimeout(resolve, time); });
        }
        this.http.post(this.server.getMyGlobalVar() + 'api-token-auth/', creds, options)
            .subscribe(function (data) {
            console.log('status', data.status);
            _this.storage.set('token', JSON.parse(data["_body"]).token);
            if (data.status == 200) {
                _this.view.dismiss();
                console.log('Redirigiendo...');
                sleep(200).then(function () {
                    //this.appCtrl.getRootNav().push(IntroPage);
                });
            }
            console.log('jwtHelper', JSON.stringify(jwtHelper.decodeToken(JSON.parse(data["_body"]).token)));
        }, function (error) {
            _this.nologin();
        });
    };
    LoginPage.prototype.closeModal = function () {
        this.view.dismiss();
    };
    __decorate([
        ViewChild(Nav),
        __metadata("design:type", Nav)
    ], LoginPage.prototype, "nav", void 0);
    LoginPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-login',
            templateUrl: 'login.html',
            providers: [ServerProvider]
        }),
        __metadata("design:paramtypes", [AuthService, ServerProvider, ToastController, Facebook, AlertController, ViewController, PerfilProvider, App, Http, AuthHttp, Storage])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.js.map