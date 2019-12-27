import { Component } from '@angular/core';
import { AuthService } from './sc-folder/shared/auth.service';

@Component({
  selector: 'sc-app',
  template: `
  		<div class="body-bg" [ngClass]="{'style-bg': (auth.isAuthenticated())}">  
  			<nav-bar></nav-bar>		
			<router-outlet></router-outlet>
			<footer></footer>
		</div>
	  `,
  styles: [`
  .body-bg{
	
	background-image: url('/assets/images/background.jpg');
	background-size: cover;
	background-position: center;
	margin: 0;
}
.style-bg{
	background-image: url('/assets/images/scbackground.png');
}

  		`]
})
export class SCAppComponent {

  constructor(public auth:AuthService){}
}
