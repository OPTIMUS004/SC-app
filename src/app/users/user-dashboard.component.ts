import { Component, OnInit } from '@angular/core';
import { AuthService } from '../sc-folder/services/auth.service';
import { ActivatedRoute, Params } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
    templateUrl:  './user-dashboard.component.html',
        styles: [`
                .flex-container{
                    display: flex;
                    flex-direction:row;
                }
                .right-panel{
                    background: #bbb;
                }
                .content-three{
                    background-color: #bbb;
                    padding-top: 20px;
                }
                .content-two{
                    display: flex;
                    justify-content: center;
                    float:left;
                    margin: 10px 15px;
                    padding-top: 20px;
                }
                .logo{
                    padding:0;
                }
                img{
                    max-width: 80px;
                    max-height: 90px;
                }
                .username{
                    color: #17a2b8;
                }
                .user-sig{
                    padding-top: 5px;
                }
                .holder{
                    background: #eee;
                }
                .head-line{
                    display: flex;
                    flex-flow: row wrap;
                    margin-top: 10px;
                    background-color: #fff;
                    justify-content: space-between;
                    align-items: center;
                }
                .user-info{
                    display: flex;
                    flex-flow: row wrap;
                    justify-content: center;
                    align-items: center;
                }
                a:hover{
                    cursor: pointer;
                }
                .btn, .form-control{
                    border-radius: 0;
                }
        `],
        animations: [trigger ('fadeInOut', [
            state('void', style({opacity: 0
            })),
            transition('void<=>*', animate(2000))
        ]
        )]
})

export class UserDashboardComponent implements OnInit {
    user;
    users: any;
    filterUsers: {};
    genderOfUser: any;
    searchTerm  = '';
    foundSearch = [''];
    likes = false;

	constructor(public auth: AuthService, private route: ActivatedRoute) {

	}
	ngOnInit() {
// route to user's page using snapshot
  this.route.params.forEach((params: Params) => {
    this.auth.getId(params.name);
  });
// get current user's credentials
  this.user = this.auth.currentUser;

// get list of all users
  this.users = this.auth.getUsers();
  this.filterUsers = this.users.filter((userInUsers) => {

// set gender of user to know clients to display
if (this.user !== undefined) {
    this.genderOfUser = this.user.gender;
    return userInUsers.gender !== this.genderOfUser;
            }
        });
    }
// function for searchbox
searchSession(searchTerm) {
     this.auth.searchUsername(searchTerm).subscribe
        ( matchingUser => {
            this.foundSearch = matchingUser;
        });
    }

// function called by use preference button
usePreferenceToFilter() {
    if (this.user.preference) {
        if (this.user.preference.ageRange.youngerSet && this.user.preference.ageRange.youngestSet) {
            this.filterUsers = this.users.filter((userInUsers) => {
                if ( userInUsers.age >= 18 && userInUsers.age <= 30 ) {
                    return this.genderOfUser !== userInUsers.gender;

                }
            });
        } else if (this.user.preference.ageRange.youngerSet && this.user.preference.ageRange.oldSet) {
            this.filterUsers = this.users.filter((userInUsers) => {
                if ( userInUsers.age >= 25 && userInUsers.age <= 35 ) {
                    return this.genderOfUser !== userInUsers.gender;
                }
            });
        } else if (this.user.preference.ageRange.oldSet && this.user.preference.ageRange.olderSet) {
            this.filterUsers = this.users.filter((userInUsers) => {
                if ( userInUsers.age >= 30 ) {
                    return this.genderOfUser !== userInUsers.gender;
                }
            });
        } else if (this.user.preference.ageRange.oldSet && this.user.preference.ageRange.olderSet
        && this.user.preference.ageRange.youngerSet) {
            this.filterUsers = this.users.filter((userInUsers) => {
                if ( userInUsers.age >= 25 ) {
                    return this.genderOfUser !== userInUsers.gender;
                }
            });
        } else if (this.user.preference.ageRange.oldSet) {
            this.filterUsers = this.users.filter((userInUsers) => {
                if ( userInUsers.age >= 30 && userInUsers.age <= 35 ) {
                    return this.genderOfUser !== userInUsers.gender;
                }
            });
        } else if (this.user.preference.ageRange.olderSet) {
            this.filterUsers = this.users.filter((userInUsers) => {
                if ( userInUsers.age >= 35 ) {
                    return this.genderOfUser !== userInUsers.gender;
                }
            });
        } else if (this.user.preference.ageRange.youngerSet) {
            this.filterUsers = this.users.filter((userInUsers) => {
                if ( userInUsers.age >= 25  && userInUsers.age <= 30 ) {
                    return this.genderOfUser !== userInUsers.gender;
                }
            });
        } else if (this.user.preference.ageRange.youngestSet) {
            this.filterUsers = this.users.filter((userInUsers) => {
                if ( userInUsers.age >= 18 && userInUsers.age <= 25 ) {
                    return this.genderOfUser !== userInUsers.gender;
                }
            });
        }
    } else {
        alert('You\'ve not set your preference');
      }
    }

   // Update currentUsers Favorite list

toggleFavorite(user) {
		if (this.userHasLiked(user)) {
			this.auth.deleteLike(user);
		} else {
			this.auth.addLike(user);
		}
	}
userHasLiked(user) {
		return this.auth.userHasLiked(user);
	}

}
