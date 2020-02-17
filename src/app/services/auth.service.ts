import { Injectable } from '@angular/core';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth'
import { User } from '../model/user.class';
import { getMatIconFailedToSanitizeUrlError } from '@angular/material';
import { FirestoreService } from '../services/firestore.service';
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLogged = new Subject<boolean>();
  public UserEmail: Promise<any>;

  constructor(public afAuth: AngularFireAuth, private FS : FirestoreService) {
    //afAuth.authState.subscribe( user => (this.isLogged = user));

     //this.isLogged =  this.IsLoggedIn();
     this.Name();
   }

    async Name(){
      this.UserEmail = await this.UserName();
      console.log(this.UserEmail)
   }

   async  IsLoggedIn(): Promise<boolean> {
    try {
      await new Promise((resolve, reject) =>
        this.afAuth.auth.onAuthStateChanged(
          user => {
            if (user) {
              // User is signed in.
              resolve(user)
            } else {
              // No user is signed in.
              reject('no user logged in')
            }
          },
          // Prevent console error
          error => reject(error)
        )
      )
      return true
    } catch (error) {
      return false
    }
  }

    async UserName(): Promise<any>{
      try {
        return new Promise((resolve, reject) =>
          this.afAuth.auth.onAuthStateChanged(
            user => {
              if (user) {
                // User is signed in.
                return resolve(user)
                
              } else {
                // No user is signed in.
                reject('no user logged in')
                return null
              }
            },
            // Prevent console error
            error => reject(error)
          )
        )
      } catch (error) {
      }
  }



   async onLogin (user: User){
    try{
      const role = await (await this.FS.getRole(user)).subscribe(items => this.afterGetRole(items, user));
      return this.isLogged;
    } 
    catch{};
    }

    async afterGetRole(role, user){
     if(role["role"] === "admin"){
        try{
          const userLogged =  await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
          if(userLogged){
          } else {
            this.isLogged = true;
          } 
        return userLogged
          }catch(error){
            console.log(error);
          }
    }
    }


    async onRegister (user: User){
      try{
        
        return await this.afAuth.auth.createUserWithEmailAndPassword(user.email + "@tranzorg.hu", user.password);

      } catch (error){
         console.log(error);
      }
    }

    async Logout(){
      this.afAuth.auth.signOut();
    }
}
