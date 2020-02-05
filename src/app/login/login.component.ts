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

  user: User = new User;
  constructor(private authSvc: AuthService, private router: Router, private FS : FirestoreService) { }

  ngOnInit() {
  
  }

  async onLogin(){
    const user = await this.authSvc.onLogin(this.user);
    const UserData = await this.FS.getRole(this.user);
    console.log(UserData);
    if(user){
      this.router.navigateByUrl('/');
    }
  }

}
