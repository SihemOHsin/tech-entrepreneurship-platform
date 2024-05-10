import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {CodeInputModule} from "angular-code-input";
import {HttpTokenInterceptor} from "./services/interceptor/http-token.interceptor";
import {LayoutsModule} from "./layouts/layouts.module";
import { TestServicesComponent } from './components/test-services/test-services.component';

@NgModule({
  declarations: [
    AppComponent,
    TestServicesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CodeInputModule,
    LayoutsModule
  ],
  providers: [
    HttpClient,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,
      multi: true
    }
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
