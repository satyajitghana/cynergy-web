import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// ParticleJS
import { ParticlesModule } from 'angular-particle';

// Angular Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule} from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';

// App Router Module
import { AppRoutingModule } from './app-routing.module';

// Bootstrap
import { MDBBootstrapModule } from 'angular-bootstrap-md';

// Other Pages to be used in the Router
import { EventsComponent } from './components/events/events.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { CountdownComponent } from './components/countdown/countdown.component';
import { TeamComponent } from './components/team/team.component';
import { HallOfFameComponent } from './components/hall-of-fame/hall-of-fame.component';
import { FaqComponent } from './components/faq/faq.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { RegisterComponent } from './components/register/register.component';

// Reactive forms module
import { ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from './components/alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    EventsComponent,
    HomeComponent,
    AboutComponent,
    CountdownComponent,
    TeamComponent,
    HallOfFameComponent,
    FaqComponent,
    NavbarComponent,
    FooterComponent,
    RegisterComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    ParticlesModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule, // import for the storage features
    AngularFirestoreModule, // import for the database features
    AngularFireAuthModule , // import for the authentication feature
    AppRoutingModule, // Routing Module
    MDBBootstrapModule.forRoot(),
    ReactiveFormsModule // for reactive forms
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
