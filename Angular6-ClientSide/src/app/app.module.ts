import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import  {FlexLayoutModule} from '@angular/flex-layout';
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';

//Angular Material Modules
import {MatTabsModule,MatButtonModule,MatInputModule,MatFormFieldModule,MatSnackBarModule,MatBadgeModule,MatChipsModule,MatSidenavModule,MatCardModule,MatGridListModule, MatToolbarModule, MatIconModule, MatListModule} from '@angular/material';
//Components

import { AppComponent } from './app.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import {routingModule} from './app-routing.module';
import { FormsModule}from '@angular/forms';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { HomeComponent } from './home/home.component';
import { DealsComponent } from './deals/deals.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';

//Services
import {AuthenticationInterceptorService } from './services/authentication.interceptor.service';
import {AuthenticationService} from './services/authentication.service';
import { CartComponent } from './cart/cart.component';
import { HistoryComponent } from './history/history.component';
import { BonusComponent } from './bonus/bonus.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    DealsComponent,
    MainNavComponent,
    CartComponent,
    HistoryComponent,
    BonusComponent],
  imports: [
    BrowserModule,
    MatTabsModule,
    MatBadgeModule,
    routingModule,
    MatGridListModule,
    MatSnackBarModule,
    MatInputModule,
    FormsModule,
    MatChipsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatButtonModule,
MatCardModule,
    MatSidenavModule,
    FlexLayoutModule,
    LayoutModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    HttpClientModule
  ],
  providers: [AuthenticationService,{
    provide:HTTP_INTERCEPTORS,
    useClass: AuthenticationInterceptorService,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
