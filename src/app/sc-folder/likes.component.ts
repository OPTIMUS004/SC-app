import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
    selector: 'likes',
    template: `
            <div *ngIf= "fanciesList.length >= 1">
                <h6>Fancy Corner</h6>
                <div *ngFor = "let fancy of fanciesList">
                    <div class= "card">
                        <div class ="bl-2-tomato">
                            <div>{{fancy.username}}</div>
                            <div>{{fancy.age}}</div>
                        </div>
                    </div>
                </div>
            </div>`
})

export class LikesComponent implements OnInit {
    fanciesList;

    constructor(private auth: AuthService) {}
ngOnInit() {
    this.fanciesList = this.auth.getCurrentUserFavorite();
}

}
