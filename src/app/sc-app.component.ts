import { Component } from '@angular/core';
import { AuthService } from './sc-folder/services/auth.service';

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

	background-image: url('/assets/images/bg-xl.png');
	background-size: cover;
	background-position: center;
	margin: 0;
}
.style-bg{
	background-image: url('/assets/images/scbackground.png');
}
@media only screen and (max-width: 500px) {
	background-image: url('/assets/images/bg-small.png');
}
@media only screen and (max-width: 800px) {
	background-image: url('/assets/images/bg-medium.png');
}
}
  		`]
})
export class SCAppComponent {

  constructor(public auth: AuthService) {}
}
