var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ReservaPage } from '../pages/reserva/reserva';
import { VentaPage } from '../pages/venta/venta';
import { IntroPage } from '../pages/intro/intro';
import { AlertaPage } from '../pages/alerta/alerta';
import { PagoPage } from '../pages/pago/pago';
import { MenPage } from '../pages/men/men';
import { UbicacionPage } from '../pages/ubicacion/ubicacion';
import { LoginPage } from '../pages/login/login';
import { ServicioPage } from '../pages/servicio/servicio';
import { TabsPage } from '../pages/tabs/tabs';
import { RegistroPage } from '../pages/registro/registro';
import { DetalleservicioPage } from '../pages/detalleservicio/detalleservicio';
import { AyudaPage } from '../pages/ayuda/ayuda';
import { SocialSharing } from '@ionic-native/social-sharing';
import { CompartirPage } from '../pages/compartir/compartir';
import { PerfilPage } from '../pages/perfil/perfil';
import { NotificacionPage } from '../pages/notificacion/notificacion';
import { CarritoPage } from '../pages/carrito/carrito';
import { HistorialPage } from '../pages/historial/historial';
import { HistorialsociaPage } from '../pages/historialsocia/historialsocia';
import { InicioPage } from '../pages/inicio/inicio';
import { RegistroprincipalPage } from '../pages/registroprincipal/registroprincipal';
import { LoginprincipalPage } from '../pages/loginprincipal/loginprincipal';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CategoriasComponent } from '../components/categorias/categorias';
import { MytabsComponent } from '../components/mytabs/mytabs';
import { MytabsnologinComponent } from '../components/mytabsnologin/mytabsnologin';
import { MytabssociaComponent } from '../components/mytabssocia/mytabssocia';
import { Geolocation } from '@ionic-native/geolocation';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Http, HttpModule } from '@angular/http';
import { Storage } from '@ionic/storage';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';
import { GoogleMaps } from '@ionic-native/google-maps';
import { CategoriasProvider } from '../providers/categorias/categorias';
import { Facebook } from '@ionic-native/facebook';
import { MapProvider } from '../providers/map/map';
import { SpinnerProvider } from '../providers/spinner/spinner';
import { ServiciosProvider } from '../providers/servicios/servicios';
import { PerfilProvider } from '../providers/perfil/perfil';
import { OneSignal } from '@ionic-native/onesignal';
import { ServicioProvider } from '../providers/servicio/servicio';
import { NotificacionProvider } from '../providers/notificacion/notificacion';
import { Device } from '@ionic-native/device';
import { ServerProvider } from '../providers/server/server';
import { SocialLoginModule, AuthServiceConfig } from "angular4-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angular4-social-login";
var config = new AuthServiceConfig([
    {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider("466431784640-objf8bhgbkmuvdu0s5i8f0551jif125h.apps.googleusercontent.com")
    },
    {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider("180799656092340")
    }
]);
var storage = new Storage({});
export function getAuthHttp(http) {
    return new AuthHttp(new AuthConfig({
        headerPrefix: 'Bearer',
        noJwtError: true,
        globalHeaders: [{ 'Accept': 'application/json' }],
        tokenGetter: (function () { return storage.get('token').then(function (token) { return token; }); }),
    }), http);
}
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            declarations: [
                MyApp,
                HomePage,
                DetalleservicioPage,
                ReservaPage,
                VentaPage,
                IntroPage,
                HistorialPage,
                LoginprincipalPage,
                NotificacionPage,
                LoginPage,
                ServicioPage,
                MenPage,
                PerfilPage,
                CompartirPage,
                RegistroprincipalPage,
                AlertaPage,
                TabsPage,
                AyudaPage,
                PagoPage,
                InicioPage,
                CarritoPage,
                HistorialsociaPage,
                UbicacionPage,
                RegistroPage,
                CategoriasComponent,
                MytabsComponent,
                MytabssociaComponent,
                MytabsnologinComponent
            ],
            imports: [
                BrowserModule,
                HttpModule,
                HttpClientModule,
                IonicModule.forRoot(MyApp),
                IonicStorageModule.forRoot(),
                SocialLoginModule.initialize(config)
            ],
            bootstrap: [IonicApp],
            entryComponents: [
                MyApp,
                HomePage,
                ReservaPage,
                VentaPage,
                AlertaPage,
                DetalleservicioPage,
                HistorialPage,
                LoginPage,
                UbicacionPage,
                CompartirPage,
                IntroPage,
                ServicioPage,
                LoginprincipalPage,
                InicioPage,
                RegistroprincipalPage,
                PagoPage,
                NotificacionPage,
                RegistroPage,
                TabsPage,
                MenPage,
                PerfilPage,
                HistorialsociaPage,
                CompartirPage,
                AyudaPage,
                CarritoPage
            ],
            providers: [
                StatusBar,
                SplashScreen,
                GoogleMaps,
                Geolocation,
                Device,
                SocialSharing,
                OneSignal,
                {
                    provide: AuthHttp,
                    useFactory: getAuthHttp,
                    deps: [Http]
                },
                CategoriasProvider,
                Facebook,
                MapProvider,
                SpinnerProvider,
                ServiciosProvider,
                PerfilProvider,
                ServicioProvider,
                NotificacionProvider,
                ServerProvider
            ]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map