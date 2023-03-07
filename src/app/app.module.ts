import {HttpClientModule} from '@angular/common/http';
import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {registerLocaleData} from '@angular/common';
import localeNL from '@angular/common/locales/nl';
import {MatButtonModule} from '@angular/material/button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {environment} from 'environments/development/environment';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CoreEffects, CoreStates} from './core/stores';
import {APIURL} from './utils/tokens/api-url.token';

registerLocaleData(localeNL, 'nl');

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    StoreModule.forRoot(CoreStates, {}),
    EffectsModule.forRoot(CoreEffects),
  ],
  providers: [
    {provide: APIURL, useValue: environment.apiUrl},
    {provide: LOCALE_ID, useValue: 'nl'},
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
