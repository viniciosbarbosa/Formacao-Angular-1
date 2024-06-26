import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToolbarComponent } from "./commom/components/toolbar/toolbar.component";
import { MaterialModule } from "./shared/material/material.module";

import { LOCALE_ID } from "@angular/core";

import { registerLocaleData } from "@angular/common";
import localePt from "@angular/common/locales/pt";
import { AuthGuard } from "./commom/components/auth.guard";
import { AuthInterceptor } from "./commom/components/auth.interceptor";

registerLocaleData(localePt, "pt-BR");

@NgModule({
  declarations: [AppComponent, ToolbarComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
  ],
  providers: [
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: "pt-BR" },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
