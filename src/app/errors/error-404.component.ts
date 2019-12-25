  import { Component } from '@angular/core';

  @Component({
  selector: 'error-404',
  template: `
    <div class="bg-white">
      <h1 class="errorMessage">404'd</h1>
      <h5 class="text-center">Page Not Found</h5>
    </div>
  `,
  styles: [`
        .bg-white{
          margin-left: 30px;
          margin-right: 30px;
        }
  			.errorMessage{
  				margin-top: 150px;
          font-size:150px;
          text-align: center;
  			}
  	`]
  })

  export class Error404Component {
  	constructor() {

  	}
  }
