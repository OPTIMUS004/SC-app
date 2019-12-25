import { Component, OnInit } from '@angular/core'
import { AuthService } from '../sc-folder/shared/auth.service'
import { ActivatedRoute } from '@angular/router'

@Component ({
    template:`
        <div class="container text-light">
            <h1>Potential Fancy</h1>
            <hr class="bg-light" />
        </div>
        <img src="/assets/images/img_avatar2.png" alt="incoming">
        <div class="details">
            <div class="">
                <span>
                <h1 class="title"> {{viewFemale?.firstname | uppercase}} {{viewFemale?.lastname | uppercase}}</h1>
                </span>
            </div>
            <div>
                <div class="body">
                    <div class="content">
                        <h6>Username: {{viewFemale?.username}}</h6>
                        <h6>Age: {{age}} years</h6>
                        <h6>Status: {{viewFemale?.rStatus}}</h6>
                        <h6>Height: {{viewFemale?.height}}</h6>
                        <h6>Education Level: </h6>
                        <h6>Ethnicity: {{viewFemale?.ethnicity}}</h6>
                        <h6>Location:</h6>
                        <h6>Kids:{{viewFemale?.kids}}</h6>

                    </div>
                </div>
                
            </div>
        </div>
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
                .details{
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
                    position: absolute;
                    left: 47%;
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

export class FullDetailsComponent implements OnInit{
    viewFemale: any;
    date = new Date()
    age: any
    
    
    constructor(private auth:AuthService, private route:ActivatedRoute){

    }
    ngOnInit(){

    // get details fromsnapshot params
        this.viewFemale = this.auth.getId(this.route.snapshot.params['name']);
        
        let thisYear = this.date.getFullYear();
        let usersYear = this.viewFemale.birthday.year;
        this.age = thisYear - parseInt( usersYear, 10);
    }

}