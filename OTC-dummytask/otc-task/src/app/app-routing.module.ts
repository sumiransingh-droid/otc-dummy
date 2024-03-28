import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoComponentComponent } from './no-component/no-component.component';
import { RegistrationComponent } from './authenticates/registration/registration.component';

const routes: Routes = [
  {
    path:"auth" , loadChildren :() => import('./authenticates/authenticates.module')
    .then(mod=>mod.AuthenticatesModule)
  },
  {
    path:"" , loadChildren :() => import('./authenticates/authenticates.module')
    .then(mod=>mod.AuthenticatesModule)
  },
  {
    path:"**",
    component:NoComponentComponent
  } 
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
