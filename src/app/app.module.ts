import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule }   from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MaterialModule } from '@angular/material';
import 'hammerjs';

// Imports for loading & configuring the in-memory web api
// import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { InMemoryDataService }  from './in-memory-data.service';

import { AppConfigService } from './app-config.service';
import { HelpService } from './shared/help.service';
import { LoginService } from './login/login.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';

import { AppRoutingModule }     from './app-routing.module';

@NgModule({
    declarations: 
    [
        AppComponent,
        LoginComponent,
        AboutComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,

        AppRoutingModule,
        MaterialModule.forRoot()
    ],
    providers: [
        AppConfigService,
        HelpService,
        LoginService
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
