import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { requiredFileType } from './services/requiredFileType.validator';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'user-profile',
    templateUrl: 'user-profile.component.html',
    styles: [``]
})

export class UserProfileComponent implements OnInit {
    userProfile;
    progress: any;
    
    editForm: FormGroup;
    image: FormControl;
    firstname: FormControl;
    lastname: FormControl;
    aboutYou: FormControl;
    username: FormControl;
    password: FormControl;
    height: FormControl;
    bodyType: FormControl;
    kids: FormControl;
    religionSect: FormControl;
    workStatus: FormControl;
    salary: FormControl;
    email: FormControl;
    eductionLevel: FormControl;
    gender: FormControl;
    confirmPassword: FormControl;
    rStatus: FormControl;
    constructor( private auth: AuthService, private router: Router, private toastr: ToastrService ) {}
    ngOnInit() {
        this.userProfile = this.auth.currentUser;
        this.firstname = new FormControl(this.userProfile.firstname, Validators.required);
        this.lastname = new FormControl(this.userProfile.lastname, Validators.required );
        this.aboutYou = new FormControl(this.userProfile.aboutYou, Validators.required);
        this.username = new FormControl(this.userProfile.username, Validators.required);
        this.password = new FormControl(this.userProfile.password, Validators.required);
        this.height = new FormControl(this.userProfile.password, Validators.required);
        this.bodyType = new FormControl(this.userProfile.bodyType, Validators.required);
        this.kids = new FormControl(this.userProfile.kids, Validators.required);
        this.religionSect = new FormControl(this.userProfile.religionSect, Validators.required);
        this.confirmPassword = new FormControl(this.userProfile.password, Validators.required);
        this.workStatus = new FormControl(this.userProfile.workStatus, Validators.required);
        this.salary = new FormControl(this.userProfile.salary, Validators.required);
        this.rStatus = new FormControl(this.userProfile.rStatus, Validators.required);
        this.email = new FormControl(this.userProfile.email, Validators.required);
        this.eductionLevel = new FormControl(this.userProfile.educationLevel, Validators.required);
        this.gender = new FormControl({value: this.userProfile.gender, disabled: true}, Validators.required);
        this.image = new FormControl(null, [Validators.required, requiredFileType('png')]);

        this.editForm = new FormGroup({
            firstname: this.firstname  ,
            lastname: this.lastname,
            aboutYou: this.aboutYou,
            username: this.username,
            password: this.password,
            height: this.height,
            image: this.image,
            bodyType: this.bodyType,
            kids: this.kids,
            religionSect: this.religionSect,
            workStatus: this.workStatus,
            salary: this.salary,
            email: this.email,
            rStatus: this.rStatus,
            eductionLevel: this.eductionLevel,
            gender: this.gender,
            confirmPassword: this.confirmPassword
        });
    }
    cancel() {
        this.router.navigate([`/user/${this.userProfile.username}`]);
    }
    saveEditedProfile(formValue) {

       if (formValue.password === formValue.confirmPassword) {
           this.auth.EditProfile(formValue)
           .subscribe(
               data => {
                if(data.hasOwnProperty('_id')) {
                    this.toastr.success("Sign in to apply changes", "Updated successfully");
                    this.auth.logout();
                    this.router.navigate([`/soul-connect`]);
                   }else{
                    this.toastr.error("Update not successful");
                   }
               })
       }else{
        this.toastr.error("Password must be the same!");
       }
    }
}
