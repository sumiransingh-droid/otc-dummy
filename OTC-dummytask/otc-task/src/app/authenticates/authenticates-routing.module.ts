import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { GenerateOtpComponent } from './generate-otp/generate-otp.component';




const routes: Routes = [
  {
    path:"",
    component:RegistrationComponent
  },
  {
    path:"verify",
    component:GenerateOtpComponent
  }

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticatesRoutingModule { }
