import { Injectable, EventEmitter } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()

export class AuthService {

  currentUser;
  msgBody: object;
  readonly baseURL = 'https://sc-api-host-test.herokuapp.com/api';   // http://localhost:3000/api 
  
  constructor(private http: HttpClient, 
              private toastr: ToastrService) { }

  getUsers() {
    return this.http.get(`${this.baseURL}/users`)
    .pipe(
      tap(data=> console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError))
  }

  getId(name) {
    return this.http.get(`${this.baseURL}/users/${name}`)
    .pipe(
      tap(data => console.log(data)),
      catchError(this.handleError))
  }

  loginUser(userName: string, password: string) {
    const credOfUser = { username: userName, password: password}
    return this.http.post(`${this.baseURL}/login`, credOfUser)
    .pipe(
      tap(data => console.log(data)),
      catchError(this.handleError)
    )
  }

  logout() {
    this.currentUser = undefined;
  }

  saveNewUser(userInput) {
    const currentYear = new Date().getFullYear();
        const userYear = new Date(userInput.dob).getFullYear();
        console.log(new Date(userYear).getFullYear());
        const userAge = currentYear - userYear;

    const newUser= {
            firstname: userInput.firstname,
            lastname: userInput.lastname,
            username: userInput.username,
            password: userInput.password,
            gender: userInput.gender,
            dob: userInput.dob,
            image: '',
            email: userInput.email,
            height: '',
            weight: '',
            bodyType: '',
            age: userAge,
            preference: '',
            rStatus: 'single',
            genotype: '',
            bloodGroup: '',
            kids: '',
            educationLevel: '',
            ethnicity: '',
            sect: '',
            workStatus: { employed: true, occupation: '' },
            favorite: [''],
            proposals: [''],
            aboutYou: '',
            expectancy: '',
            outlook: ''
    };
    return this.http.post(this.baseURL, newUser).subscribe()
  }
  EditProfile(editedProfile) {
     return this.http.patch(`${this.baseURL}/patch/${this.currentUser._id}`, editedProfile)
     .pipe(
      tap(data => console.log(data, `${this.baseURL}/users/${this.currentUser.username}`)),
      catchError(this.handleError))
    }
  searchUsername(searchTerm) {
    const term = searchTerm.toLocaleLowerCase();
    let result = [];
  }
  updateAgePreference(agePreference) {
    this.currentUser.preference = agePreference;
 }
  deleteLike(user) {
    this.currentUser.favorite.splice(user, 1);
  }
  addLike(user) {
    this.currentUser.favorite[0]==='' ? this.currentUser.favorite=[] : this.currentUser.favorite.push(user);
    this.currentUser.proposes.push(this.currentUser);
  }
  userHasLiked(user) {
    if (this.isAuthenticated()) {
      return this.currentUser.favorite.some(datum => datum === user);
    } else { return false; }
  }
  getCurrentUserFavorite() {
    return this.currentUser.favorite;
  }
  generateMsgForChap() {
    console.log(this.currentUser.favorite);
    let fancyOne = '';
    let fancyOneFullName = '';
    let fancyTwo = '';
    let fancyTwoFullName = '';
    if (this.currentUser.favorite.length === 'undefined'
      || this.currentUser.favorite.length === 'null'
      || this.currentUser.favorite.length === 0) {
        this.toastr.warning("Select fancies");
    } else if ((this.currentUser.favorite.length > 2)) {
      this.toastr.warning('You can only pick two fancies');
    } else {
      console.log(this.currentUser.favorite);
      fancyOne = this.currentUser.favorite[0].username;
      fancyOneFullName = `${this.currentUser.favorite[0].firstname} ${this.currentUser.favorite[0].lastname}`;
      fancyTwoFullName = `${this.currentUser.favorite[1].firstname} ${this.currentUser.favorite[1].lastname}`;
      fancyTwo = this.currentUser.favorite[1].username;

      this.msgBody = {
       username: this.currentUser.username,

       msg: 
       `Assalamalaykum waramotullah,<br/>
  Hope this message meets you well.<br/>
  After carefully looking through the available Fancies.<br/>
  I fancy the following profile(s).<br/>
  1. ${fancyOneFullName} with username ${fancyOne}<br/>
  2. ${fancyTwoFullName} with username ${fancyTwo}<br/>
  `,
      chap: this.currentUser.chap
}
    }

  }
  msgchap(): Observable<any> {
    
    const options = { headers: new HttpHeaders({
      'Content-Type': 'application/json'
  })};
    return this.http.post(`${this.baseURL}/send`, this.msgBody)
    .pipe(
      tap( data => console.log('All: ' +  JSON.stringify(data))),
      catchError(this.handleError)
    )
  }
  isAuthenticated() {

    return !!this.currentUser;
  }
  private handleError(err: HttpErrorResponse){
    let errorMessage = '';
    if (err.error instanceof ErrorEvent){
      errorMessage = `An Error occured: ${err.error.message}`;
    }else{
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage)
    return throwError(errorMessage);
  }
  getChaperones() {
    return chaperones
  }

}

const chaperones = [
  { username: 'Ay', email: 'macndoe.com' },
  { username: 'By', email: 'integraldoe.com' },
  { username: 'Cy', email: 'brilldoe.com' }
];


