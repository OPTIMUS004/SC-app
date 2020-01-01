import { Component, Inject } from '@angular/core'
import { AuthService } from '../sc-folder/services/auth.service';
import { Router } from '@angular/router';
import { JQ_TOKEN } from '../../common/jQuery.service'
import {FormControl, FormGroup, Validators} from '@angular/forms'
@Component({
    selector: 'nav-bar',
    templateUrl: './nav-bar.component.html',
    styles: [`  
                .style-bg{
                    background-color: #bbb;
                    margin: 0 30px 0 30px;
                }
                nav{
                    height: 65px;
                    line-height: 30px;
                    background-color: #09095ea2;
                }
                ul{
                    list-style-type: none;
                }
                .navbar{ 
                    float: right;
                    padding-right: 20px;
                }
                .sc-logo{
                    float: left;
                    padding-left: 20px;
                }
                a{  
                    text-decoration: none;
                    transition: 0.8s;
                }
                a:hover{
                    color: #fff;
                    opacity: 0.9;
                    transform: scale(0.5);
                    cursor:pointer;
                }
                .comment-one{
                    float: left;
                    display: inline-block;
                }
                .comment-two{
                    float: right;
                }
                .btn-primary{
                    background-color: green;
                    border-radius: 0;
                    border: 0;
                }
                .btn-default{
                    background-color: red;
                    border-radius: 0;
                    color: white;
                }
                .btn:hover{
                    width:;
                    font-size: 14px;
                    opacity: 0.7;
                }
                .empty-span{
                    width: 100%;
                    height: 50px;
                    margin:0;
                    background-color: #aaa;
                }
        `]
})
export class NavBarComponent {
    loginForm: FormGroup;
    user;
    userIsValid;
    
    constructor(private router: Router, private auth:AuthService, @Inject(JQ_TOKEN) private $:any){}

    ngOnInit(){
        let userName = new FormControl('', [Validators.required]),
            password = new FormControl('', [Validators.required, Validators.minLength(8)])
        this.loginForm = new FormGroup ({
            userName,
            password
        })
    }
    loginUser(loginDetails){
        this.auth.loginUser(loginDetails.userName, loginDetails.password)
          
}
    logout(){
        this.auth.logout();
        this.router.navigate(['/soul-connect'])
    }
    toHomeOrDetailsPage(){
        if(this.userIsValid){
            this.router.navigate([`/user/${this.auth.currentUser.username}`])
        }else{
            this.router.navigate(['/soul-connect'])
        }
    }
}