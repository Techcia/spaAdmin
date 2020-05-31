import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';

import { fuseConfig } from 'app/core/fuse-config';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/shared/layout/layout.module';
import { AppRoutingModule } from './app-routing.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { FakeDbService } from './fake-db/fake-db.service';
import { JwtModule } from "@auth0/angular-jwt";
import { InterceptorModule } from './core/helpers/https-request-interceptor.service';

export function tokenGetter() {
    return localStorage.getItem("access_token");
}



@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,

        TranslateModule.forRoot(),

        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,
        InterceptorModule,
        // App modules
        LayoutModule,

        InMemoryWebApiModule.forRoot(FakeDbService, {
            delay: 0,
            passThruUnknownUrl: true
        }),
        JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter,
                whitelistedDomains: ["apiparkpaygo-env.eba-cp4p3e5v.us-east-2.elasticbeanstalk.com", "https://viacep.com.br/"],
                blacklistedRoutes: [""]
            }
        })
    ],
    bootstrap: [
        AppComponent
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy }
    ]
})
export class AppModule {
}
