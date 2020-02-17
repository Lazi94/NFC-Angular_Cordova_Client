import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/User.class';
import { AuthService } from '../services/auth.service';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  fail: Boolean = false;
  user: User = new User;
  constructor(private authSvc: AuthService, private router: Router, private FS : FirestoreService) { }

  ngOnInit() {
  
  }



  async getIslogged(){
    return await this.authSvc.isLogged
  }

  async onLogin(){
    this.user.email = this.user.email + "@tranzorg.hu";
    await this.authSvc.onLogin(this.user);
    const logged = this.getIslogged()

    console.log(logged);

    if(this.authSvc.isLogged){
      this.router.navigateByUrl('/');
    } else {
      this.fail = true;
    }
  }

}
