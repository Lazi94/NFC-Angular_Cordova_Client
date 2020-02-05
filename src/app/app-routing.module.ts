import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestComponent } from './test/test.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guard/auth.guard';
import { MapComponent } from './map/map.component';
import { AddDataComponent } from './add-data/add-data.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: 'test',   component: TestComponent},
  { path: 'login', component: LoginComponent},
  { path: 'Users', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'addData', component: AddDataComponent, canActivate: [AuthGuard] },
  { path: 'home', component: MapComponent, canActivate: [AuthGuard] },
  { path: '',  redirectTo: 'home', pathMatch: 'full', canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
