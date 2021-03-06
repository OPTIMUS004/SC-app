  import { Component } from '@angular/core';
  import { Router } from '@angular/router';

  @Component({
  selector: 'unauthorized',
  template: `
    <div class="bg-white text-center">
      <h1 class="errorMessage">Unauthorized Access.</h1>
      <h4><a class="text-blue" (click)="home()"><span class="log">Login</span></a> to continue</h4>
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
          margin-bottom: 50px;
        }
        .log{
          color: lightblue;
          cursor: pointer;
        }
        @media only screen and (max-width: 600px){
          .errorMessage{ font-size: 30px; }
        }
  	`]
  })

  export class UnauthorizedUserComponent {
  	constructor(private router: Router ) {

    }
    home() {
      this.router.navigate(['/soul-connect']);
    }
  }
