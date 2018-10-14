import {NgModule} from '@angular/core';
import { LoginComponent} from './authentication/login/login.component';
import {AuthenticationComponent} from './authentication/authentication.component';
import {SignupComponent} from './authentication/signup/signup.component';
import {HomeComponent} from './home/home.component'; 
import {Routes,RouterModule} from '@angular/router';
import {CartComponent}  from './cart/cart.component';
import {HistoryComponent} from './history/history.component';
import {BonusComponent} from  './bonus/bonus.component'   ;
const routes:Routes = [
    {path:'',component:AuthenticationComponent},
    {path:'login',component:LoginComponent},
    
    {path:'welcome',component:HomeComponent},
    {path:'signup',component:SignupComponent},
    {path:'cart',component:CartComponent},
    {path:'history',component:HistoryComponent},
    {path:'bonus',component:BonusComponent}

]
@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
export class routingModule{

}