import { DetailsPageComponent } from './details-page.component';
import { SiteRouteActivator } from 'src/common/route-activator.service';


export const userRoutes = [
    { path: ':name', component:DetailsPageComponent, canActivate:[ SiteRouteActivator] },   
]