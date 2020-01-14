import { UserDashboardComponent } from './user-dashboard.component';
import { SiteRouteActivator } from 'src/common/route-activator.service';
import { UserFancyComponent } from './user-fancy.component';


export const userRoutes = [
    { path: 'contact-chap', component: UserFancyComponent },
    { path: ':name', component: UserDashboardComponent }
];
