import { Injectable } from '@angular/core';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth'
import { User } from '../model/user.class';
import { getMatIconFailedToSanitizeUrlError } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLogged: any = false;

  constructor(public afAuth: AngularFireAuth) {
    afAuth.authState.subscribe( user => (this.isLogged = user));

     this.isLogged =  this.IsLoggedIn();
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

   async onLogin (user: User){
    try{
      const userLogged =  await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
        if(userLogged){
            this.isLogged = true;

        }
      return userLogged
    }catch(error){
      console.log(error);
    };
    }

    async getRole(){

    }

    async onRegister (user: User){
      try{
         return await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);

      } catch (error){
         console.log(error);
      }
    }

    async Logout(){
      this.afAuth.auth.signOut();
    }
}
