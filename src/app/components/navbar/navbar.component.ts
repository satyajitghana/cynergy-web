import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  currentUser: any;

  constructor(
    public authService: AuthService,
    private afAuth: AngularFireAuth
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.authService.getCurrentUser(user.email)
        .then(myuser => {
          this.currentUser = myuser;
          console.log(this.currentUser);
        })
        .catch(err => {
          console.log(err);
        });
      }
    });
  }

  ngOnInit() {
  }

}
