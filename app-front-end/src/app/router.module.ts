import {Routes} from "@angular/router";
import {RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {RegistrationComponent} from "./authentication/registration/registration.component";
import {AuthenticationService} from "./authentication/shared/authentication.service";
import {AuthenticationComponent} from "./authentication/authentication.component";
import {SignInComponent} from "./authentication/sign-in/signIn.component";

const router : Routes = [
  {path: '' , redirectTo: 'user/registration' , pathMatch:"full"},
  {path: 'user' , redirectTo: 'user/sign-in' , pathMatch: 'full'},
  {path: 'user' , component: AuthenticationComponent , children: [
    {path: 'registration' , component: RegistrationComponent},
    {path: 'sign-in' , component: SignInComponent }
  ]}
];

@NgModule({
  declarations: [
    RegistrationComponent,
    AuthenticationComponent,
    SignInComponent
  ],
  imports: [
    RouterModule.forRoot(router, { useHash: true }),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  exports: [RouterModule],
  providers: [AuthenticationService]
})

export class AppRouterModule{}




