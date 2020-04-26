import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '../sc-folder/services/auth.service';
import { Router } from '@angular/router';
import { JQ_TOKEN } from '../../common/jQuery.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
    selector: 'nav-bar',
    templateUrl: './nav-bar.component.html',
    styles: [`
                nav{
                    background-color: #a2;
                    font-family: cursive;
                    background-color: darkblue;
                    border-radius: 0 0 20px 20px;
                    box-shadow: 0 10px 14px -7px #111;
                    width: 100%;
                    z-index: 10;
                }
                .navbar-toggler{
                    color: #fff;
                    outline: none;
                }
                .nav-link, .sc-logo{
                    cursor: pointer;
                }
                
                @media only screen and (min-width: 700px) {
                    .dontShow{
                        display: none;
                    }
                }
                @media only screen and (max-width: 600px){
                    .navlinksstyle{
                    }   
                }

        `]
})
export class NavBarComponent implements OnInit {
    loginForm: FormGroup;
    user;
    userIsValid;

    constructor(private router: Router, 
                public auth: AuthService, 
                @Inject(JQ_TOKEN) private $: any,
                private toastr: ToastrService
                ) {}

    ngOnInit() {
        // tslint:disable-next-line: one-variable-per-declaration
        const userName = new FormControl('', [Validators.required]),
            password = new FormControl('', [Validators.required, Validators.minLength(8)]);
        this.loginForm = new FormGroup ({
            userName,
            password
        });
    }
    loginUser(loginDetails) {
        this.loginForm.reset();
        this.auth.loginUser(loginDetails.userName, loginDetails.password)
        .subscribe( data => {
            this.auth.currentUser = data;
            this.auth.isAuthenticated();
            console.log(this.auth.isAuthenticated(), this.auth.currentUser);
              
            if(!this.auth.isAuthenticated()){
              this.loginForm.reset();
              console.log(this.auth.isAuthenticated());
              this.toastr.error("Invalid Username or password");
            }else{
              console.log(this.auth.isAuthenticated());
              this.toastr.success("Signed in successfully");
              console.log(this.auth.isAuthenticated());
              this.router.navigate([`/user/${this.auth.currentUser.username}`]);
            }
              return this.auth.currentUser;
          })
        
    }
    cancelSignIn() {
        this.loginForm.reset();
    }
    logout() {

        this.auth.logout();
        this.toastr.success("Logged out successfully");
        this.router.navigate(['/soul-connect']);
    }
    toHomeOrDetailsPage() {
        this.userIsValid = this.auth.isAuthenticated()
        if (this.userIsValid) {
            this.router.navigate([`/user/${this.auth.currentUser.username}`]);
        } else {
            this.router.navigate(['/soul-connect']);
        }
    }
    comingSoon() {
        this.toastr.info("This feature is under construction");
        if(this.auth.isAuthenticated()) {
            this.router.navigate([`/chats`]);
        }else{
            this.toastr.warning("Login");
            this.router.navigate(['/soul-connect'])
        }
    }
    myFanciesPage(){
        this.userIsValid = this.auth.isAuthenticated()
        if(this.userIsValid && (this.auth.currentUser.favorite.length)) {
            this.router.navigate([`/user/contact-chap`]);
        }else{
            console.log(this.userIsValid);
            this.toastr.warning("Add fancies");
        }
    }
}
