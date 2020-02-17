import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { GoogleMapComponent } from './google-map/google-map.component';

import { AgmCoreModule } from '@agm/core';
import { environment } from '../environments/environment';  
import { AngularFirestoreModule  } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';  
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule  } from '@angular/fire/';
import { NgxSpinnerModule } from "ngx-spinner";
import { MatTabsModule, MatSidenavModule, MatIconModule, MatCardModule, MatButtonModule, MatToolbarModule, MatButtonToggleModule   } from '@angular/material';
import { LoginComponent } from './login/login.component';
import { MatInputModule } from '@angular/material/input';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgDragDropModule } from 'ng-drag-drop';
import { AddDataComponent } from './add-data/add-data.component';
import { MapComponent } from './map/map.component';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { AddRoleComponent } from './add-role/add-role.component';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    MapComponent,
    LoginComponent,
    AddDataComponent,
    AddRoleComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: environment.Google.ApiKey
    }),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgxSpinnerModule,
    MatTabsModule,
    MatSidenavModule,
    MatCardModule,
    MatButtonToggleModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    NgbModule,
    DragDropModule
  ],
  exports:[
    MatTabsModule,
    MatSidenavModule,
    AddRoleComponent
  ],
  providers: [MapComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
