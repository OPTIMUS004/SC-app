import { Injectable, EventEmitter } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http'
import { catchError, tap } from 'rxjs/operators'
import { Observable, of } from 'rxjs'
import { Router } from '@angular/router';

@Injectable()

export class AuthService {

currentUser;
  msgBody: string;
  readonly baseURL = 'http://localhost:3000/users/';
constructor(private http:HttpClient, private router: Router){}
getUsers(){  
  //calculate age of each user before returning
  
    let usersList = users.slice(0);
    let presentYear = new Date().getFullYear();
        usersList.forEach(user => {
          let userYear = user.birthday.year,
              userAge = presentYear - parseInt(userYear, 10);
              user['age']= userAge;
              return usersList;
              
        });
  //Assign each user a chaperone
        function mapUsers(user){
          let randomNumber = Math.floor(Math.random()*this.length);
          user['chap']= this[randomNumber]
          return { user:user }
        }
        usersList.map(mapUsers, chaperones );
        return usersList; 
  }
getId(name) {
      return  users.find( user => user.username === name)
    }
loginUser(userName:string, password:string){

/*
  users.some((user) => {
		if (user.username === userName && user.password === password){
       this.currentUser = user;
       console.log(this.currentUser)
       return this.currentUser
      }else{
        this.currentUser = undefined;
      }
    })
*/
    let userCredential = {"username": userName, "password": password }
    return this.http.post(this.baseURL + 'login', userCredential)
    .subscribe( userData => {
      this.currentUser = userData;
      console.log(userData , this.isAuthenticated())
  if(this.isAuthenticated()){
      this.router.navigate([`/user/${this.currentUser.username}`])
      console.log("User is valid:"+ this.isAuthenticated())
  }else{
      console.log(this.isAuthenticated()+" user is invalid");
      alert("Invalid username or Password")

  } 
  return this.currentUser, this.isAuthenticated();
}); 
    
  }

logout(){
    this.currentUser = undefined;
  }
saveNewUser(username, gender, birthday, email, password){
  let newUser = {
  firstname: "",
  lastname: "",
  favorite: [],
  proposes:[""],
  username: username,
  password: password,
  gender: gender,
  birthday: birthday ,
  email: email,
  height:"",
  bodyType:"",
  rStatus: "",
  kids: "",
  educationLevel:"",
  ethnicity:"",
  religionSect: "",
  workStatus:{employed:false, occupation:""},
  salary:"",
  aboutYou:"",
  chaperone: ""
 }
 this.http.post(this.baseURL, newUser).subscribe()
 users.push(newUser);
 this.loginUser(newUser.username, newUser.password)


}
EditProfile(editedProfile)
  {
    users.find((user)=>{
      if(user===this.currentUser){
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
        user['image'] = editedProfile.image
        this.currentUser = user;
      }
      })
}
searchUsername(searchTerm){
let term = searchTerm.toLocaleLowerCase();
let result = [];

users.forEach( detail =>{ if(detail.username.toLocaleLowerCase() == term)
  result = result.concat(detail)  

    })
    var emitter = new EventEmitter(true);
    setTimeout(()=>{
      emitter.emit(result);
    }, 100);
    return emitter
}
updateAgePreference(agePreference){
  users.find((user)=>{
    if(user.username === this.currentUser.username && user.password === this.currentUser.password){
        user['preference'] = agePreference;
        this.currentUser = user;
    }
  })
}
deleteLike(user){
	this.currentUser.favorite.splice(user,1)
}
addLike(user){

  this.currentUser.favorite.push(user);
  users.forEach(element => {
    if(element === user){
      element.proposes.push(this.currentUser);
    }
  });
}
userHasLiked(user){
	if(this.isAuthenticated){
	return this.currentUser.favorite.some( datum => datum === user )
	}else{ return false; }
}
getCurrentUserFavorite(){
  return this.currentUser.favorite
}
generateMsgForChap(){
  let fancyOne = "";
  let fancyOneFullName = "";
  let fancyTwo = "";
  let fancyTwoFullName = "";
  if(this.currentUser.favorite.length == "undefined" 
  || this.currentUser.favorite.length == "null"
  || this.currentUser.favorite.length == 0){
    alert("Select fancies")
  }else if((this.currentUser.favorite.length > 2)){
    alert("You can only pick two fancies");
  }else{
    console.log(this.currentUser.favorite);
    fancyOne = this.currentUser.favorite[0]['username'] ;
    fancyOneFullName = `${this.currentUser.favorite[0]['firstname']} ${this.currentUser.favorite[0]['lastname']}`;
    fancyTwoFullName = `${this.currentUser.favorite[1]['firstname']} ${this.currentUser.favorite[1]['lastname']}`;
    fancyTwo = this.currentUser.favorite[1]['username'];
    
    this.msgBody = `Assalamalaykum waramotullah,\n
  Hope this message meets you well.\n
  After carefully looking through the available Fancies.\n
  I fancy the following profile(s).\n
  1. ${fancyOneFullName} with username ${fancyOne}\n
  2. ${fancyTwoFullName} with username ${fancyTwo}\n 
  `;
  }
  
}

msgchap(){
  const options = { headers: new HttpHeaders({
    'Content-Type':'applicstion/json', 
    'Accept': 'application/x-www-form-urlencoded'
  })}
  console.log(this.msgBody)
  
  return this.http.post('www.formspree.io/macbrill13@gmail.com', this.msgBody, options)

}

isAuthenticated(){
      
      return !!this.currentUser;
    }
  
}

const users = [
                {
                 firstname: "Ayoola",
                 lastname: "Taiwo",
                 username: "integral",
                 password: "12345678",
                 gender: "male",
                 birthday: {day: "12", month:"12", year:"2004"},
                 email: "tayoola13@yahoo.com",
                 height:"1.4",
                 bodyType:"",
                 rStatus: "single",
                 kids: "none",
                 educationLevel:"Bachelor",
                 ethnicity:"yoruba",
                 religionSect: "none",
                 workStatus:{employed: true, occupation: 'teacher' },
                 salary:"10000",
                 favorite:[""],
                 proposes:[""],
                 aboutYou:"a muslim, would love to be with someone who is ready to start a family"
                },
                {
                 firstname: "Malala",
                 lastname: "Chuks",
                 username: "Wells",
                 password: "12345678",
                 gender: "male",
                 birthday: {day: "12", month:"12", year:"2004"},
                 email: "tayoola13@yahoo.com",
                 height:"1.4",
                 bodyType:"",
                 rStatus: "single",
                 kids: "none",
                 favorite:[],
                 proposes:[""],
                 educationLevel:"Bachelor",
                 ethnicity:"yoruba",
                 religionSect: "none",
                 workStatus:{employed: true, occupation: 'teacher' },
                 salary:"10000",
                 aboutYou:"a muslim, would love to be with someone who is ready to start a family"
                },
                {
                 firstname: "Babs",
                 lastname: "Oje",
                 username: "Dibu",
                 password: "12345678",
                 gender: "male",
                 birthday: {day: "12", month:"12", year:"2004"},
                 email: "tayoola13@yahoo.com",
                 height:"1.4",
                 bodyType:"",
                 rStatus: "single",
                 kids: "none",
                 educationLevel:"Bachelor",
                 ethnicity:"yoruba",
                 religionSect: "none",
                 workStatus:{employed: true, occupation: 'teacher' },
                 salary:"10000",
                 aboutYou:"a muslim, would love to be with someone who is ready to start a family",
                 favorite:[""],
                 proposes:[""],
                },
                {
                 firstname: "Muse",
                 lastname: "Bola",
                 username: "bold",
                 password: "12345678",
                 gender: "male",
                 birthday: {day: "12", month:"12", year:"2004"},
                 email: "tayoola13@yahoo.com",
                 favorite:[""],
                 proposes:[""],
                 height:"1.4",
                 bodyType:"",
                 rStatus: "single",
                 kids: "none",
                 educationLevel:"Bachelor",
                 ethnicity:"yoruba",
                 religionSect: "none",
                 workStatus:{employed: true, occupation: 'teacher' },
                 salary:"10000",
                 aboutYou:"a muslim, would love to be with someone who is ready to start a family"
                },
                {
                firstname: "Ayoola",
                lastname: "kehinde",
                username: "kennyket",
                password: "12345678",
                gender: "female",
                birthday: {day: "12", month:"12", year:"1996"},
                email: "tayoola13@yahoo.com",
                height:"1.4",
                favorite:[""],
                bodyType:"",
                proposes:[""],
                rStatus: "single",
                kids: "none",
                educationLevel:"spinster",
                ethnicity:"yoruba",
                religionSect: "none",
                workStatus:{employed: true, occupation: 'teacher' },
                salary:"10000",
                aboutYou:"a muslim, would love to be with someone who is ready to start a family"
               },
               {
                firstname: "Pitan",
                lastname: "Charles",
                username: "SlayQ",
                password: "12345678",
                gender: "female",
                birthday: {day: 2+2, month:"12", year:"1994"},
                email: "tayoola13@yahoo.com",
                height:"1.4",
                bodyType:"",
                rStatus: "single",
                kids: "none",
                favorite:[""],
                proposes:[""],
                educationLevel:"spinster",
                ethnicity:"yoruba",
                religionSect: "none",
                workStatus:{employed: true, occupation: 'teacher' },
                salary:"10000",
                aboutYou:"a muslim, would love to be with someone who is ready to start a family"
               },
               {
               firstname: "Nonso",
               lastname: "Alaba",
               username: "Jeff",
               password: "12345678",
               gender: "female",
               birthday: {day: 2+2, month:"12", year:"1990"},
               email: "tayoola13@yahoo.com",
               height:"1.4",
               bodyType:"",
               favorite:[""],
               proposes:[""],
               rStatus: "single",
               kids: "none",
               educationLevel:"spinster",
               ethnicity:"yoruba",
               religionSect: "none",
               workStatus:{employed: true, occupation: 'teacher' },
               salary:"10000",
               aboutYou:"a muslim, would love to be with someone who is ready to start a family"
              },
              {
              firstname: "Chukundi",
              lastname: "Elisa",
              username: "Georgia",
              password: "12345678",
              gender: "female",
              birthday: {day: 2+2, month:"12", year:"2001"},
              email: "tayoola13@yahoo.com",
              height:"1.4",
              bodyType:"",
              rStatus: "single",
              kids: "none",
              favorite:[""],
              proposes:[""],
              educationLevel:"spinster",
              ethnicity:"yoruba",
              religionSect: "none",
              workStatus:{employed: true, occupation: 'teacher' },
              salary:"10000",
              aboutYou:"a muslim, would love to be with someone who is ready to start a family"
             },
             {
                firstname: "adrian",
                lastname: "Donovan",
                username: "Mississippi",
                password: "12345678",
                gender: "female",
                birthday: {day: 2+2, month:"12", year:"1980"},
                email: "tayoola13@yahoo.com",
                height:"1.4",
                bodyType:"",
                favorite:[""],
                proposes:[""],
                rStatus: "single",
                kids: "none",
                educationLevel:"spinster",
                ethnicity:"yoruba",
                religionSect: "none",
                workStatus:{employed: true, occupation: 'teacher' },
                salary:"10000",
                aboutYou:"a muslim, would love to be with someone who is ready to start a family"
               },
               {
                
                firstname: "judy",
                lastname: "Bobby",
                username: "Tilda",
                password: "12345678",
                gender: "female",
                birthday: {day: 2+2, month:"12", year:"2004"},
                email: "tayoola13@yahoo.com",
                height:"1.4",
                bodyType:"",
                favorite:[""],
                proposes:[""],
                rStatus: "single",
                kids: "none",
                educationLevel:"spinster",
                ethnicity:"yoruba",
                religionSect: "none",
                workStatus:{employed: true, occupation: 'teacher' },
                salary:"10000",
                aboutYou:"a muslim, would love to be with someone who is ready to start a family"
               },
               {
                firstname: "Mabinu",
                lastname: "ayeola",
                username: "Jordy",
                password: "12345678",
                gender: "female",
                birthday: {day: 2+2, month:"12", year:"2004"},
                email: "tayoola13@yahoo.com",
                height:"1.4",
                bodyType:"",
                favorite:[""],
                proposes:[""],
                rStatus: "single",
                kids: "none",
                educationLevel:"spinster",
                ethnicity:"yoruba",
                religionSect: "none",
                workStatus:{employed: true, occupation: 'teacher' },
                salary:"10000",
                aboutYou:"a muslim, would love to be with someone who is ready to start a family"
               },
               {
                firstname: "Sekono",
                lastname: "Goke",
                username: "baoku",
                password: "12345678",
                gender: "female",
                birthday: {day: 2+2, month:"12", year:"2004"},
                email: "tayoola13@yahoo.com",
                height:"1.4",
                bodyType:"",
                favorite:[""],
                proposes:[""],
                rStatus: "single",
                kids: "none",
                educationLevel:"spinster",
                ethnicity:"yoruba",
                religionSect: "none",
                workStatus:{employed: true, occupation: 'teacher' },
                salary:"10000",
                aboutYou:"a muslim, would love to be with someone who is ready to start a family"
               },
               {
                firstname: "Toa",
                lastname: "Ukulele",
                username: "Founder",
                password: "12345678",
                gender: "female",
                birthday: {day: 2+2, month:"12", year:"2004"},
                email: "tayoola13@yahoo.com",
                height:"1.4",
                bodyType:"",
                favorite:[""],
                proposes:[""],
                rStatus: "single",
                kids: "none",
                educationLevel:"spinster",
                ethnicity:"yoruba",
                religionSect: "none",
                workStatus: {employed: true, occupation: 'teacher' },
                salary:"10000",
                aboutYou:"a muslim, would love to be with someone who is ready to start a family"
               }
        ]
const chaperones = [
          {username: "Ay", email:"macndoe.com"},
          {username: "By", email:"integraldoe.com"},
          {username: "Cy", email:"brilldoe.com"}
        ]

    