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
import { App, Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Http, RequestOptions, Headers } from '@angular/http';
import { HomePage } from '../pages/home/home';
import { PerfilPage } from '../pages/perfil/perfil';
import { ServicioPage } from '../pages/servicio/servicio';
import { IntroPage } from '../pages/intro/intro';
import { DetalleservicioPage } from '../pages/detalleservicio/detalleservicio';
import { AlertaPage } from '../pages/alerta/alerta';
import { Storage } from '@ionic/storage';
import { AuthHttp } from 'angular2-jwt';
import { OneSignal } from '@ionic-native/onesignal';
import { PerfilProvider } from '../providers/perfil/perfil';
import { AuthService } from "angular4-social-login";
var MyApp = /** @class */ (function () {
    function MyApp(authService, platform, splashScreen, statusBar, http, _perfil, storage, alertCtrl, authHttp, appCtrl, oneSignal) {
        var _this = this;
        this.authService = authService;
        this.platform = platform;
        this.splashScreen = splashScreen;
        this.statusBar = statusBar;
        this.http = http;
        this._perfil = _perfil;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.authHttp = authHttp;
        this.appCtrl = appCtrl;
        this.oneSignal = oneSignal;
        this.rootPage = HomePage;
        this.url = 'http://104.236.247.3:8000';
        this.pages = [
            { title: 'Homepage', component: PerfilPage },
            { title: 'Settings', component: IntroPage },
            { title: 'Account', component: ServicioPage }
        ];
        //this.rootPage=HomePage
        this.authService.authState.subscribe(function (user) {
            _this.user = user;
            _this.loggedIn = (user != null);
        });
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
            _this.handlerNotifications();
        });
        // this.storage.get('token').then((val) => {
        //      if(val){this.appCtrl.getRootNav().push(IntroPage);}
        // });
    }
    MyApp.prototype.ionViewWillEnter = function () {
        console.log('App components.', 'ionViewWillEnter');
    };
    MyApp.prototype.handlerNotifications = function () {
        var _this = this;
        this.oneSignal.startInit('6d06ccb5-60c3-4a76-83d5-9363fbf6b40a', '466431784640');
        this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
        this.oneSignal.handleNotificationOpened()
            .subscribe(function (jsonData) {
            if (jsonData.notification.payload.additionalData.servicio) {
                // let alert = this.alertCtrl.create({
                //   title: 'Tienes un nuevo servicio',
                //   subTitle: 'Codigo: '+jsonData.notification.payload.additionalData.servicio,
                //   buttons: ['OK']
                // });
                // alert.present();
                _this.appCtrl.getRootNav().push(AlertaPage, { servicio: jsonData.notification.payload.additionalData.servicio });
            }
            if (jsonData.notification.payload.additionalData.aceptaservicio) {
                _this.appCtrl.getRootNav().push(DetalleservicioPage, { servicio: jsonData.notification.payload.additionalData.aceptaservicio });
            }
            if (jsonData.notification.payload.additionalData.codigo) {
                var code = _this.alertCtrl.create({
                    title: 'No te olvide de My Look Xpress',
                    subTitle: 'Buenas tardes',
                    buttons: ['OK']
                });
                code.present();
                var creds = JSON.stringify(jsonData);
                var options = new RequestOptions({
                    headers: new Headers({ 'Content-Type': 'application/json' })
                });
                _this.authHttp.post('http://104.236.247.3:8000/guardanotificacion/', creds, options)
                    .subscribe(function (data) {
                    console.log(data);
                });
            }
            console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
        });
        this.oneSignal.endInit();
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    __decorate([
        ViewChild(Nav),
        __metadata("design:type", Nav)
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Component({
            templateUrl: 'app.html'
        }),
        __metadata("design:paramtypes", [AuthService, Platform, SplashScreen, StatusBar, Http, PerfilProvider, Storage, AlertController, AuthHttp, App, OneSignal])
    ], MyApp);
    return MyApp;
}());
export { MyApp };
////
// Add the following to your existing ready fuction.
//# sourceMappingURL=app.component.js.map