import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { requiredFileType } from './services/requiredFileType.validator'

@Component({
    selector: 'user-profile',
    templateUrl: 'user-profile.component.html',
    styles: [``]
})

export class UserProfileComponent implements OnInit{
    userProfile;
    
    birthday:FormGroup;
    editForm: FormGroup;
    private image: FormControl;
    private firstname: FormControl;
    private lastname: FormControl;
    private aboutYou: FormControl;    
    private username: FormControl;
    private day: FormControl;
    private month: FormControl;
    private year: FormControl;
    private password: FormControl;
    private height: FormControl;
    private bodyType: FormControl;
    private kids: FormControl;
    private religionSect: FormControl;
    private workStatus: FormControl;
    private salary:FormControl;
    private email: FormControl;
    private eductionLevel: FormControl;
    private gender: FormControl;
    confirmPassword: FormControl;
    constructor( private auth:AuthService, private router:Router ){}
    ngOnInit(){
        this.userProfile = this.auth.currentUser;
        this.firstname = new FormControl(this.userProfile.firstname, Validators.required)
        this.lastname = new FormControl(this.userProfile.lastname, Validators.required )
        this.aboutYou = new FormControl(this.userProfile.aboutYou, Validators.required)
        this.username = new FormControl(this.userProfile.username, Validators.required)
        this.password = new FormControl(this.userProfile.password, Validators.required)
        this.height = new FormControl(this.userProfile.password, Validators.required)
        this.bodyType = new FormControl(this.userProfile.bodyType, Validators.required)
        this.kids = new FormControl(this.userProfile.kids, Validators.required)
        this.religionSect = new FormControl(this.userProfile.religionSect, Validators.required)
        this.day  = new FormControl({value:this.userProfile.birthday.day, disabled:true}, Validators.required)
        this.month = new FormControl({value:this.userProfile.birthday.month, disabled:true}, Validators.required)
        this.year = new FormControl({value:this.userProfile.birthday.year, disabled:true}, Validators.required)
        this.birthday = new FormGroup({
            day: this.day,
            month: this.month,
            year: this.year,
        })
            this.confirmPassword = new FormControl(this.userProfile.password, Validators.required)
            this.workStatus =new FormControl(this.userProfile.workStatus, Validators.required)
            this.salary = new FormControl(this.userProfile.salary, Validators.required)
            this.email = new FormControl(this.userProfile.email, Validators.required)
            this.eductionLevel = new FormControl(this.userProfile.educationLevel, Validators.required)
            this.gender = new FormControl({value:this.userProfile.gender,disabled: true}, Validators.required)
            this.image = new FormControl(null, [Validators.required, requiredFileType('png')])

        this.editForm = new FormGroup({
            firstname: this.firstname  ,
            lastname: this.lastname ,
            aboutYou: this.aboutYou,
            username: this.username,
            password: this.password,
            height: this.height,
            image: this.image,
            bodyType: this.bodyType,
            kids: this.kids,
            religionSect: this.religionSect,
            birthday: this.birthday,
            workStatus: this.workStatus,
            salary: this.salary,
            email: this.email,
            eductionLevel: this.eductionLevel,
            gender: this.gender,
            confirmPassword: this.confirmPassword
         
        })
    }
    cancel(){
        this.router.navigate([`./soul-connect/${this.userProfile.username}`])
    }
    saveEditedProfile(formValue){
        
       if(formValue.password === formValue.confirmPassword){
           this.auth.EditProfile(formValue)
           this.router.navigate([`./soul-connect/${this.userProfile.username}`])
       }
    }
}