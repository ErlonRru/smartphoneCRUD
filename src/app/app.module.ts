import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SmartphoneListComponent} from './components/smartphone-list/smartphone-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import { DeviceFormComponent } from './components/form/device-form/device-form.component';
import { ReactiveFormComponent } from './components/form/reactive-form/reactive-form.component';

@NgModule({
  declarations: [
    AppComponent,
    SmartphoneListComponent,
    DeviceFormComponent,
    ReactiveFormComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
