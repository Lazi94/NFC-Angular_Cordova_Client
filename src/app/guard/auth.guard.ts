import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth'
import { getMatIconFailedToSanitizeUrlError } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private authSvc: AuthService, private router: Router, private Afth : AngularFireAuth){};

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree { 
      
      
  
      if(this.authSvc.isLogged){
        
        return true;
      } 
      this.authSvc.isLogged = false;
      this.router.navigateByUrl('/login');
      return false;
    }
}
