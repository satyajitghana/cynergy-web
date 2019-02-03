import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  currentUser: any;
  usernameQR: string;

  constructor(
    public authService: AuthService,
    private afAuth: AngularFireAuth
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.authService.getCurrentUser(user.email)
        .then(myuser => {
          this.currentUser = myuser[0];
          this.usernameQR = this.currentUser.username;
          console.log(this.currentUser);
        })
        .catch(err => {
          console.log(err);
        });
      }
    });
  }

  ngOnInit() {  }

}
