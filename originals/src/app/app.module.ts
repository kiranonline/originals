import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RegistrationPage } from './../pages/registration/registration';
import { LoginPage } from '../pages/login/login';
import { ForgetpasswordPage } from './../pages/forgetpassword/forgetpassword';
import { ForgetpasswordcodePage } from './../pages/forgetpasswordcode/forgetpasswordcode';
import { ResetcodePage } from './../pages/resetcode/resetcode';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RegistrationPage,
    LoginPage,
    ForgetpasswordPage,
    ForgetpasswordcodePage,
    ResetcodePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RegistrationPage,
    LoginPage,
    ForgetpasswordPage,
    ForgetpasswordcodePage,
    ResetcodePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
