import { Component, OnInit } from '@angular/core';
import { AuthService } from '../sc-folder/services/auth.service';
import { ActivatedRoute, Params } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
    templateUrl:  './user-dashboard.component.html',
    styleUrls: ['./user-dashboard.component.css'],
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
  this.auth.getUsers().subscribe((users: []) => {
    function mapUsers(user) {
      const randomNumber = Math.floor(Math.random() * this.length);
      user.chap = this[randomNumber];
      return { user };
    }
    users.map(mapUsers, this.auth.getChaperones());
    this.users = users
  this.filterUsers = this.users.filter((userInUsers) => {
// set gender of user to know clients to display
if (this.user !== undefined) {
    this.genderOfUser = this.user.gender;
    return userInUsers.gender !== this.genderOfUser;
            }
        });
    return this.users;
  });
}

// function for searchbox
searchSession(searchTerm) {
     //this.auth.searchUsername(searchTerm).subscribe
       // ( matchingUser => {
          //  this.foundSearch = matchingUser;
        //});
    }

// function called by use preference button
usePreferenceToFilter() {
    if (this.user.preference ==='') {
        
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
