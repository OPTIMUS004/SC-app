import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScHomepageComponent } from './sc-folder/sc-homepage.component';
import { DetailsPageComponent } from './sc-folder/details-page.component';
import { FullDetailsComponent } from './sc-folder/full-details.component';
import { Error404Component } from './errors/error-404.component';
import { SiteRouteActivator } from 'src/common/route-activator.service';
import { UserProfileComponent } from './sc-folder/user-profile.component';

const routes: Routes = [
  { path: 'soul-connect', component:ScHomepageComponent },
  { path: '', redirectTo: '/soul-connect', pathMatch: 'full' },
  { path: '404', component:Error404Component },
  { path: 'soul-connect/:name', component:DetailsPageComponent, canActivate:[ SiteRouteActivator] },
  { path: 'soul-connect/users/:name', component:FullDetailsComponent,canActivate:[SiteRouteActivator] },
  { path: 'edit-profile', component:UserProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
