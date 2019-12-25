import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { SCAppComponent } from './sc-app.component';

import { Error404Component } from './errors/error-404.component'
import { ModalTriggerDirective } from '../common/modal-trigger.directive'
import { JQ_TOKEN } from '../common/jQuery.service'
import { LikesComponent } from './sc-folder/likes.component'
import { SimpleModalComponent } from '../common/simple-modal.component'
import { NavBarComponent } from './Nav/nav-bar.component';
import { CreateAccountComponent } from './sc-folder/create-account.component';
import { DetailsPageComponent } from './sc-folder/details-page.component';
import { FullDetailsComponent } from './sc-folder/full-details.component'
import { ScHomepageComponent } from './sc-folder/sc-homepage.component';
import { FileUploadComponent } from './sc-folder/File-upload.component';
import { AuthService } from './sc-folder/shared/auth.service'
import { SiteRouteActivator } from '../common/route-activator.service';
import { CollapsibleWellComponent } from'../common/collapsible-well.component';
import { UnauthorizedUserComponent } from './errors/unauthorized-user.component'
import { UserProfileComponent } from './sc-folder/user-profile.component';
import { UploadProgressComponent } from './sc-folder/upload-progress.component';
import { RightPanelComponent } from './sc-folder/right-panel.component';
import { favoriteComponent } from './sc-folder/Favorite.component';
import { HttpInterceptorService } from './sc-folder/shared/httpInterceptor.interceptor';
import { LogResponseInterceptor } from './sc-folder/shared/log-response.interceptor';
import { HttpCacheService } from './sc-folder/shared/http-cache.service';
import { CacheInterceptor } from './sc-folder/shared/cache.intercptor';

const jQuery = window['$'];
@NgModule({
  declarations: [
    SCAppComponent,
    UnauthorizedUserComponent,
    NavBarComponent,
    RightPanelComponent,
    CreateAccountComponent,
    UserProfileComponent,
    DetailsPageComponent,
    FullDetailsComponent,
    FileUploadComponent,
    UploadProgressComponent,
    ScHomepageComponent,
    SimpleModalComponent,
    LikesComponent,
    Error404Component,
    favoriteComponent,
    ModalTriggerDirective,
    CollapsibleWellComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule
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
export class AppModule { }
