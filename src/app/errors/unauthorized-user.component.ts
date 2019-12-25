  import { Component } from '@angular/core';

  @Component({
  selector: 'unauthorized',
  template: `
    <div class="bg-white text-center">
      <h1 class="errorMessage">Unauthorized Access.</h1>
      <h4><a class="text-blue" [routerLink]="['/soul-connect']" >Login</a> to continue</h4>
    </div>
  `,
  styles: [`
            
  			.errorMessage{
  				margin-top: 150px;
                margin-left: 30px;
                margin-right: 30px;
  				font-size:80px;
          text-align: center;
        }
        .bg-white{
          padding-bottom: 15px;
          margin-right: 50px;
          margin-left: 50px;
        }
  	`]
  })

  export class UnauthorizedUserComponent {
  	constructor() {

  	}
  }
