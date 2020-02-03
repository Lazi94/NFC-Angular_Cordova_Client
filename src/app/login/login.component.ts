import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/User.class';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User;
  constructor(private authSvc: AuthService, private router: Router) { }

  ngOnInit() {
  
  }

  async onLogin(){
    const user = await this.authSvc.onLogin(this.user);
    if(user){
      this.router.navigateByUrl('/');
    }
  }

}
