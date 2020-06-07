import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component ({
    template: `
    <div *ngIf="auth.isAuthenticated()">
        <div class="container text-light" *ngIf="auth.isAuthenticated()">
            <h1>Potential Fancy</h1>
            <hr class="bg-light" />
        </div>
        <img src="/assets/images/img_avatar2.png" alt="incoming">
        <div class="card">
            <div class="">
                <span>
                <h1 class="title"> {{viewProfile?.firstname | uppercase}} {{viewProfile?.lastname | uppercase}}</h1>
                </span>
            </div>
            <div>
                <div class="body">
                    <div class="content">
                        <h6>Username: {{viewProfile?.username}}</h6>
                        <h6>Age: {{viewProfile?.age}} years</h6>
                        <h6>Status: {{viewProfile?.rStatus}}</h6>
                        <h6>Height: {{viewProfile?.height}}</h6>
                        <h6>Education Level: </h6>
                        <h6>Ethnicity: {{viewProfile?.ethnicity}}</h6>
                        <h6>Location:</h6>
                        <h6>Kids: {{viewProfile?.kids}}</h6>
                        <h6>About: {{viewProfile?.aboutYou}}</h6>
                    </div>
                </div>

            </div>
        </div>
    </div>
        <unauthorized *ngIf="!auth.isAuthenticated()"></unauthorized>
    `,
    styles: [`
                .title{
                    text-align:center;
                    padding-top: 2em;
                }
                .content{
                    background: blue;
                }
                h6{
                    color: #fff;
                    padding: 8px;
                }
                .card{
                    padding-left: 15px;
                    padding-right: 15px;
                    padding-bottom: 20px;
                    background: #fff;
                    margin-top: 6%;
                    margin-left:30px;
                    margin-right: 30px;
                }
                img{
                    border-radius: 100%;
                    display: flex;
                    justify-content: center;
                    justify-items: center
                    border:2px solid #aaa;
                    max-width: 100px;
                    max-height: 120px;
                }
                @media only screen and max-width(600px){
                    .details{
                        margin-left: 55px;
                        margin-right: 55px;
                    }
                    img{
                        left: 40%;
                    }
                }
    `]
})

export class FullDetailsComponent implements OnInit {
    viewProfile: any;
    date = new Date();
    age: any;


    constructor(public auth: AuthService, private route: ActivatedRoute) {

    }
    ngOnInit() {

    // get details from snapshot params
        this.viewProfile = this.auth.getId(this.route.snapshot.params.name).subscribe(
            (data)=>{
                this.viewProfile = data;
                console.log(this.viewProfile);
            return this.viewProfile;
            }
        );
    }

}
