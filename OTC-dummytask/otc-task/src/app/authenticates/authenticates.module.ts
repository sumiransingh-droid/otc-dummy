import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticatesRoutingModule } from './authenticates-routing.module';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationComponent } from './registration/registration.component';
import { GenerateOtpComponent } from './generate-otp/generate-otp.component';



@NgModule({
  declarations: [
   RegistrationComponent,
   GenerateOtpComponent
  ],
  imports: [
    CommonModule,
    AuthenticatesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    
  ],
  exports: [
    RegistrationComponent
  ]
})
export class AuthenticatesModule { }
