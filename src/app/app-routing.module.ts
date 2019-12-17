import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SmartphoneListComponent} from './components/smartphone-list/smartphone-list.component';
import {AppComponent} from './app.component';
import {DeviceFormComponent} from './components/form/device-form/device-form.component';
import {ReactiveFormComponent} from './components/form/reactive-form/reactive-form.component';


const routes: Routes = [
  {path: '', component: SmartphoneListComponent},
  {path:'drivenForm',component: DeviceFormComponent},
  {path:'reactiveForm',component: ReactiveFormComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
