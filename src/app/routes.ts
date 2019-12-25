import { Routes } from '@angular/router'

import { ScHomepageComponent } from './sc-folder/sc-homepage.component'
import { DetailsPageComponent } from './sc-folder/details-page.component'

export const appRoutes:Routes = [


	{ path: 'main', component:ScHomepageComponent },
	{ path: '', redirectTo: '/main', pathMatch: 'full' },
	{ path: 'main/:name', component:DetailsPageComponent }
]