import { Router, ActivatedRouteSnapshot, CanActivate, ActivatedRoute } from '@angular/router'
import { AuthService } from '../app/sc-folder/services/auth.service'
import { Injectable } from '@angular/core'

@Injectable()

export class SiteRouteActivator implements CanActivate{

    constructor(private router:Router, private auth:AuthService ){

    }

    canActivate(route:ActivatedRouteSnapshot){
        const routeExists = !!this.auth.getId(route.params['name'])
    
        if(!routeExists)
            this.router.navigate(['/404'])
        return routeExists
    }
}