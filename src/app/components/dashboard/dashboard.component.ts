import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { EventsService } from 'src/app/services/events.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  currentUser: any;
  usernameQR: string;
  eventQR: string = null;
  upcomingEvent: any;
  attendance: any;
  total_events: any;

  constructor(
    public authService: AuthService,
    private afAuth: AngularFireAuth,
    private eventService: EventsService,
    private db: AngularFirestore
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.authService.getCurrentUser(user.email)
        .then(myuser => {
          this.currentUser = myuser;
          this.usernameQR = this.currentUser.username;
          this.eventService.getNextUpcomingEventId()
            .then(data => {
              console.log('Upcoming Event ID : ', data);
              this.eventQR = this.currentUser.email + '/' + data;
              console.log(this.eventQR);
            });
          console.log(this.currentUser);
        })
        .catch(err => {
          console.log(err);
        });
        this.db.collection('Users').doc(user.email).collection('attendance').doc('attendance_count').ref
          .get()
          .then(data => {
            console.log(data.data());
            this.attendance = data.data().attendance_count;
          })
          .catch(console.log);
      }
    });
    this.eventService.getNextUpcomingEvent()
      .then(data => {
        this.upcomingEvent = data;
      })
      .catch(console.log);
    this.db.collection('EventsList').ref.get().then(snapshot => this.total_events = snapshot.size);
  }

  ngOnInit() {  }

}
