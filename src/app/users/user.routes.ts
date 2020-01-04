import { UserDashboardComponent } from './user-dashboard.component';
import { SiteRouteActivator } from 'src/common/route-activator.service';


export const userRoutes = [
    { path: ':name', component: UserDashboardComponent }
];
