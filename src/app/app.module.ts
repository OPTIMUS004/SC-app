import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { appRoutes } from './routes';
import { SCAppComponent } from './sc-app.component';

import { Error404Component } from './errors/error-404.component';

import { JQ_TOKEN } from '../common/jQuery.service';
import { NavBarComponent } from './Nav/nav-bar.component';
import { CreateAccountComponent } from './sc-folder/create-account.component';
import { FullDetailsComponent } from './sc-folder/full-details.component';
import { ScHomepageComponent } from './sc-folder/sc-homepage.component';
import { FileUploadComponent } from './sc-folder/File-upload.component';
import { AuthService } from './sc-folder/services/auth.service';
import { SiteRouteActivator } from '../common/route-activator.service';
import { UserProfileComponent } from './sc-folder/user-profile.component';
import { UploadProgressComponent } from './sc-folder/upload-progress.component';

import { HttpInterceptorService } from './sc-folder/services/httpInterceptor.interceptor';
import { LogResponseInterceptor } from './sc-folder/services/log-response.interceptor';
import { HttpCacheService } from './sc-folder/services/http-cache.service';
import { CacheInterceptor } from './sc-folder/services/cache.intercptor';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './sc-folder/footer.component';
import { SharedModule } from 'src/common/shared.module';

// tslint:disable-next-line: no-string-literal
const jQuery = window['$'];

@NgModule({
  declarations: [
    SCAppComponent,
    NavBarComponent,
    CreateAccountComponent,
    UserProfileComponent,
    FullDetailsComponent,
    FileUploadComponent,
    UploadProgressComponent,
    ScHomepageComponent,
    Error404Component,
    FooterComponent

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    SharedModule

  ],
  providers: [
    AuthService,
    HttpCacheService,
    SiteRouteActivator,
    { provide: JQ_TOKEN, useValue: jQuery },
    { provide: HTTP_INTERCEPTORS , useClass: HttpInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS , useClass: LogResponseInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS , useClass: CacheInterceptor, multi: true }

  ],
  bootstrap: [SCAppComponent]
})
export class AppModule {}
