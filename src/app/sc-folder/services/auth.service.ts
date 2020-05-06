import { Injectable, EventEmitter } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()

export class AuthService {

  currentUser;
  msgBody: string;
  readonly baseURL = 'https://sc-api-host-test.herokuapp.com/api/users/';
  

  constructor(private http: HttpClient, 
              private toastr: ToastrService) { }

  getUsers() {
    // calculate age of each user and assign chapeone before subscription.

    // tslint:disable-next-line: no-use-before-declare
    return this.http.get(this.baseURL)
    .pipe(
      tap(data=> console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    )
  }
  getId(name) {
    // tslint:disable-next-line: no-use-before-declare
    return users.find(user => user.username === name);
  }
  loginUser(userName: string, password: string) {
    // tslint:disable-next-line: no-use-before-declare
    const credOfUser = { username: userName, password: password}
    return this.http.post('https://sc-api-host-test.herokuapp.com/api/login/', credOfUser)
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
    // tslint:disable-next-line: no-use-before-declare
  //  users.find((user) => {
      /*
      if (user === this.currentUser) {
        user.aboutYou = editedProfile.aboutYou;
        user.kids = editedProfile.kids;
        user.email = editedProfile.email;
        user.rStatus = editedProfile.rStatus;
        user.height = editedProfile.height;
        user.salary = editedProfile.salary;
        user.firstname = editedProfile.firstname;
        user.lastname = editedProfile.lastname;
        user.password = editedProfile.password;
        user.workStatus = editedProfile.workStatus;
        user.username = editedProfile.username;
        user.image = editedProfile.image;
        this.currentUser = user;
      }
      */
     return this.http.patch(`${this.baseURL}/${this.currentUser.username}`, editedProfile).
     subscribe(
       (data) => {
         console.log(data);
         if(data){
           this.currentUser = data;
           return this.currentUser;
         }
       }
     );

  }
  searchUsername(searchTerm) {
    const term = searchTerm.toLocaleLowerCase();
    let result = [];

    // tslint:disable-next-line: no-use-before-declare
    users.forEach(detail => {
      if (detail.username.toLocaleLowerCase() === term) {
        result = result.concat(detail);
      }

    });
    const emitter = new EventEmitter(true);
    setTimeout(() => {
      emitter.emit(result);
    }, 100);
    return emitter;
  }
  updateAgePreference(agePreference) {
    // tslint:disable-next-line: no-use-before-declare
    users.find((user) => {
      if (user.username === this.currentUser.username && user.password === this.currentUser.password) {
        user.preference = agePreference;
        this.currentUser = user;
      }
    });
  }
  deleteLike(user) {
    this.currentUser.favorite.splice(user, 1);
  }
  addLike(user) {

    this.currentUser.favorite.push(user);
    // tslint:disable-next-line: no-use-before-declare
    users.forEach(element => {
      if (element === user) {
        element.proposes.push(this.currentUser);
      }
    });
  }
  userHasLiked(user) {
    if (this.isAuthenticated) {
      return this.currentUser.favorite.some(datum => datum === user);
    } else { return false; }
  }
  getCurrentUserFavorite() {
    return this.currentUser.favorite;
  }
  generateMsgForChap() {
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

      fancyOne = this.currentUser.favorite[0].username;
      fancyOneFullName = `${this.currentUser.favorite[0].firstname} ${this.currentUser.favorite[0].lastname}`;
      fancyTwoFullName = `${this.currentUser.favorite[1].firstname} ${this.currentUser.favorite[1].lastname}`;
      fancyTwo = this.currentUser.favorite[1].username;

      this.msgBody = `Assalamalaykum waramotullah,\n
  Hope this message meets you well.\n
  After carefully looking through the available Fancies.\n
  I fancy the following profile(s).\n
  1. ${fancyOneFullName} with username ${fancyOne}\n
  2. ${fancyTwoFullName} with username ${fancyTwo}\n
  `;
    }

  }
  msgchap(): Observable<any> {
    
    const options = { headers: new HttpHeaders({
      'Content-Type': 'application/json'
  })};
    return this.http.post('https://www.formspree.com/macbrill13@gmail.com', this.msgBody, options)
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

const users = [
  {
    firstname: 'Ayoola',
    lastname: 'Taiwo',
    username: 'integral',
    password: '12345678',
    gender: 'male',
    dob: '12/10/1990',
    age: 0,
    preference: '',
    image: '',
    email: 'tayoola13@yahoo.com',
    height: '1.4',
    bodyType: '',
    rStatus: 'single',
    kids: 'none',
    educationLevel: 'Bachelor',
    ethnicity: 'yoruba',
    religionSect: 'none',
    workStatus: { employed: true, occupation: 'teacher' },
    salary: '10000',
    favorite: [''],
    proposes: [''],
    aboutYou: 'a muslim, would love to be with someone who is ready to start a family'
  },
  {
    firstname: 'Malala',
    lastname: 'Chuks',
    username: 'Wells',
    password: '12345678',
    gender: 'male',
    age: 0,
    preference: '',
    image: '',
    dob: '12/10/1990',
    email: 'tayoola13@yahoo.com',
    height: '1.4',
    bodyType: '',
    rStatus: 'single',
    kids: 'none',
    favorite: [],
    proposes: [''],
    educationLevel: 'Bachelor',
    ethnicity: 'yoruba',
    religionSect: 'none',
    workStatus: { employed: true, occupation: 'teacher' },
    salary: '10000',
    aboutYou: 'a muslim, would love to be with someone who is ready to start a family'
  },
  {
    firstname: 'Babs',
    lastname: 'Oje',
    username: 'Dibu',
    password: '12345678',
    gender: 'male',
    email: 'tayoola13@yahoo.com',
    height: '1.4',
    bodyType: '',
    dob: '12/10/1990',
    age: 0,
    preference: '',
    image: '',
    rStatus: 'single',
    kids: 'none',
    educationLevel: 'Bachelor',
    ethnicity: 'yoruba',
    religionSect: 'none',
    workStatus: { employed: true, occupation: 'teacher' },
    salary: '10000',
    aboutYou: 'a muslim, would love to be with someone who is ready to start a family',
    favorite: [''],
    proposes: [''],
  },
  {
    firstname: 'Muse',
    lastname: 'Bola',
    username: 'bold',
    password: '12345678',
    gender: 'male',
    dob: '12/10/1990',
    email: 'tayoola13@yahoo.com',
    favorite: [''],
    proposes: [''],
    height: '1.4',
    age: 0,
    preference: '',
    image: '',
    bodyType: '',
    rStatus: 'single',
    kids: 'none',
    educationLevel: 'Bachelor',
    ethnicity: 'yoruba',
    religionSect: 'none',
    workStatus: { employed: true, occupation: 'teacher' },
    salary: '10000',
    aboutYou: 'a muslim, would love to be with someone who is ready to start a family'
  },
  {
    firstname: 'Ayoola',
    lastname: 'kehinde',
    username: 'kennyket',
    password: '12345678',
    gender: 'female',
    dob: '12/10/1990',
    email: 'tayoola13@yahoo.com',
    height: '1.4',
    favorite: [''],
    bodyType: '',
    age: 0,
    preference: '',
    image: '',
    proposes: [''],
    rStatus: 'single',
    kids: 'none',
    educationLevel: 'spinster',
    ethnicity: 'yoruba',
    religionSect: 'none',
    workStatus: { employed: true, occupation: 'teacher' },
    salary: '10000',
    aboutYou: 'a muslim, would love to be with someone who is ready to start a family'
  },
  {
    firstname: 'Pitan',
    lastname: 'Charles',
    username: 'SlayQ',
    password: '12345678',
    gender: 'female',
    dob: '12/10/1990',
    email: 'tayoola13@yahoo.com',
    height: '1.4',
    bodyType: '',
    age: 0,
    preference: '',
    image: '',
    rStatus: 'single',
    kids: 'none',
    favorite: [''],
    proposes: [''],
    educationLevel: 'spinster',
    ethnicity: 'yoruba',
    religionSect: 'none',
    workStatus: { employed: true, occupation: 'teacher' },
    salary: '10000',
    aboutYou: 'a muslim, would love to be with someone who is ready to start a family'
  },
  {
    firstname: 'Nonso',
    lastname: 'Alaba',
    username: 'Jeff',
    password: '12345678',
    gender: 'female',
    dob: '12/10/1990',
    email: 'tayoola13@yahoo.com',
    height: '1.4',
    bodyType: '',
    age: 0,
    preference: '',
    image: '',
    favorite: [''],
    proposes: [''],
    rStatus: 'single',
    kids: 'none',
    educationLevel: 'spinster',
    ethnicity: 'yoruba',
    religionSect: 'none',
    workStatus: { employed: true, occupation: 'teacher' },
    salary: '10000',
    aboutYou: 'a muslim, would love to be with someone who is ready to start a family'
  },
  {
    firstname: 'Chukundi',
    lastname: 'Elisa',
    username: 'Georgia',
    password: '12345678',
    gender: 'female',
    dob: '12/10/1990',
    email: 'tayoola13@yahoo.com',
    height: '1.4',
    bodyType: '',
    age: 0,
    preference: '',
    image: '',
    rStatus: 'single',
    kids: 'none',
    favorite: [''],
    proposes: [''],
    educationLevel: 'spinster',
    ethnicity: 'yoruba',
    religionSect: 'none',
    workStatus: { employed: true, occupation: 'teacher' },
    salary: '10000',
    aboutYou: 'a muslim, would love to be with someone who is ready to start a family'
  },
  {
    firstname: 'adrian',
    lastname: 'Donovan',
    username: 'Mississippi',
    password: '12345678',
    gender: 'female',
    dob: '12/10/1990',
    email: 'tayoola13@yahoo.com',
    height: '1.4',
    bodyType: '',
    age: 0,
    preference: '',
    image: '',
    favorite: [''],
    proposes: [''],
    rStatus: 'single',
    kids: 'none',
    educationLevel: 'spinster',
    ethnicity: 'yoruba',
    religionSect: 'none',
    workStatus: { employed: true, occupation: 'teacher' },
    salary: '10000',
    aboutYou: 'a muslim, would love to be with someone who is ready to start a family'
  },
  {
    firstname: 'judy',
    lastname: 'Bobby',
    username: 'Tilda',
    password: '12345678',
    gender: 'female',
    dob: '12/10/1990',
    email: 'tayoola13@yahoo.com',
    height: '1.4',
    age: 0,
    preference: '',
    image: '',
    bodyType: '',
    favorite: [''],
    proposes: [''],
    rStatus: 'single',
    kids: 'none',
    educationLevel: 'spinster',
    ethnicity: 'yoruba',
    religionSect: 'none',
    workStatus: { employed: true, occupation: 'teacher' },
    salary: '10000',
    aboutYou: 'a muslim, would love to be with someone who is ready to start a family'
  },
  {
    firstname: 'Mabinu',
    lastname: 'ayeola',
    username: 'Jordy',
    password: '12345678',
    gender: 'female',
    dob: '12/10/1990',
    email: 'tayoola13@yahoo.com',
    height: '1.4',
    bodyType: '',
    age: 0,
    preference: '',
    image: '',
    favorite: [''],
    proposes: [''],
    rStatus: 'single',
    kids: 'none',
    educationLevel: 'spinster',
    ethnicity: 'yoruba',
    religionSect: 'none',
    workStatus: { employed: true, occupation: 'teacher' },
    salary: '10000',
    aboutYou: 'a muslim, would love to be with someone who is ready to start a family'
  },
  {
    firstname: 'Sekono',
    lastname: 'Goke',
    username: 'baoku',
    password: '12345678',
    gender: 'female',
    dob: '12/10/1990',
    email: 'tayoola13@yahoo.com',
    height: '1.4',
    age: 0,
    preference: '',
    image: '',
    bodyType: '',
    favorite: [''],
    proposes: [''],
    rStatus: 'single',
    kids: 'none',
    educationLevel: 'spinster',
    ethnicity: 'yoruba',
    religionSect: 'none',
    workStatus: { employed: true, occupation: 'teacher' },
    salary: '10000',
    aboutYou: 'a muslim, would love to be with someone who is ready to start a family'
  },
  {
    firstname: 'Toa',
    lastname: 'Ukulele',
    username: 'Founder',
    password: '12345678',
    gender: 'female',
    dob: '12/10/1990',
    email: 'tayoola13@yahoo.com',
    height: '1.4',
    bodyType: '',
    age: 0,
    preference: '',
    image: '',
    favorite: [''],
    proposes: [''],
    rStatus: 'single',
    kids: 'none',
    educationLevel: 'spinster',
    ethnicity: 'yoruba',
    religionSect: 'none',
    workStatus: { employed: true, occupation: 'teacher' },
    salary: '10000',
    aboutYou: 'a muslim, would love to be with someone who is ready to start a family'
  }
];
const chaperones = [
  { username: 'Ay', email: 'macndoe.com' },
  { username: 'By', email: 'integraldoe.com' },
  { username: 'Cy', email: 'brilldoe.com' }
];


