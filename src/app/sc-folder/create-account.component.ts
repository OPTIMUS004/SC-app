import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'create-account',
    templateUrl: './create-account.component.html',

    styles: [`
    em{ float: right; color: #E05C65;}
 	.error input select{ background-color: #E3C3C5}
 	.error ::-webkit-input-placeholder, .error ::-webkit-select{ color:#999;}
 	.error ::-moz-placeholder, .error ::-moz-select { color: #999; }
 	.error :-moc-placeholder, .error :-moc-select { color: #999; }
	.error :ms-input-placeholder, .error: ms-select { color: #999;}
    .btn{
        background-color: #fff;
        width:40%;
        height: 40px;
        border: 0;
        border-radius: 6px;
        color: #000;
    }
    .btn-fb{
        display: inline-block;
        background-color: rgb(109, 142, 248);
        color: #fff;
    }
    .btn-gg{
        float: right;
    }
    .btn-submit{
        background-color: orangered;
        color: #fff;
        width:100%;
    }
    input[type=text], [type=number], [type=password], select{
        border: 0;
        height: 45px;
        border-radius: 6px;
        padding-left: 10px;
        width:100%
    }
    .form-group{
        margin-bottom: 15px;
    }
    #email, #password, #cpassword{
    }
    .flex-container{
        display: flex;
        flex-direction: row;
    }
    #day, #month{
        margin-right: 1em;
    }
            `]
})

export class CreateAccountComponent {
    loginForm: FormGroup;

    constructor(private auth:AuthService, private router:Router){

    }
ngOnInit(){
let gender = new FormControl('',[Validators.required]),
     day = new FormControl('',[Validators.required, Validators.maxLength(2)]),
     month = new FormControl('',[Validators.required, Validators.maxLength(2)]),
     year = new FormControl('',[Validators.required, Validators.maxLength(4)]),
     username = new FormControl('',[Validators.required, Validators.maxLength(25)]),
     birthday = new FormGroup({
        day, month, year
        }),
     email = new FormControl('',[Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]),
     password = new FormControl('',[Validators.required, Validators.minLength(8)]),
     confirmPassword = new FormControl('',[Validators.required])
this.loginForm = new FormGroup({
    gender,
    birthday,
    email,
    username,
    password,
    confirmPassword
})
}
saveUser(usersInput){
if(usersInput.confirmPassword === usersInput.password && this.loginForm.valid){
    this.auth.saveNewUser(
        usersInput.username, usersInput.gender, usersInput.birthday, usersInput.email, usersInput.password
    )}
    }
}