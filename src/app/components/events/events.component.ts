import { Component, OnInit } from '@angular/core';

// Events Service
import { EventsService } from '../../services/events.service';

// Models
import { EventDetails } from '../../models/event-details.model';
import { Event } from '../../models/event.model';

import * as firebase from 'firebase';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FirebaseAuth } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  constructor(
    private eventsService: EventsService,
    private authSerice: AuthService,
    private afAuth: AngularFireAuth) {
  }

  ngOnInit(): void {
  }

  getEvents(): void {
    console.log('List of Events : ');
    this.eventsService.getEventsList().subscribe(data => {
      for (const iterator of data) {
        console.log(iterator);
      }
    });
  }

  /* Example for an Event */
  // const eventToAdd: Event = this.eventsService.constructEvent(
  //   new Date(2019, 1, 1, 10, 30, 0, 0),
  //   'Intro to CP ',
  //   'EventTopic',
  //   'Description',
  //   'Logs', // Log
  //   ['MAT01'], // Materials
  //   ['VID01'], // Video Link
  //   30, // Duration
  //   'TYPE', // Type
  //   true
  // );

  addEvent(): void {

    const eventToAdd: Event = this.eventsService.constructEvent(
      new Date(2019, 2, 7, 19, 0, 0, 0),
      'Web Development Session 2',
      'Web Development',
      `The first step to building your Portfolio`,
      'None',
      [''],
      [''],
      120,
      'Workshop'
    );

    this.eventsService.addEvent(eventToAdd)
      .then(() => console.log('Event Added'))
      .catch(console.log);
  }

  getEventDetails(): void {
    console.log('Event Details');
    this.eventsService.getEventDetails().subscribe(data => {
      for (const iterator of data) {
        console.log(iterator);
      }
    });
  }

  addPastEvent(): void {
    const eventToAdd: Event = this.eventsService.constructEvent(
      new Date(),
      'PastEventName',
      'PastEventTopic',
      'PastDescription',
      'PastLogs',
      ['PastMAT01'],
      ['PastVID01'],
      30,
      'PastTYPE'
    );

    this.eventsService.addPastEvent(eventToAdd)
      .then(() => console.log('Event Added'))
      .catch(console.log);
  }

  getPastEvents(): void {
    console.log('Past List of Events : ');
    this.eventsService.getPastEvents().subscribe(data => {
      for (const iterator of data) {
        console.log(iterator);
      }
    });
  }

  getUpcomingEvent(): void {
    console.log('Upcoming Event : ');
    this.eventsService.getNextUpcomingEvent()
      .then(console.log);
  }

  getPastTwoEvents(): void {
    console.log('Past Two Events : ');
    this.eventsService.getPastTwoEvents()
      .then(console.log);
  }

  testCloudFunction(): void {
    console.log('testing cloud function : ');
    const addMessage = firebase.functions().httpsCallable('addAdmin');
    addMessage()
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.log(error);
      });
  }

  testAuthentication(): void {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.authSerice.getCurrentUser(user.email)
          .then(console.log)
          .catch(console.log);
      }
    });
  }

  addAttendance(): void {
    this.eventsService.updateUserEvent('satyajitghana8@gmail.com', 'E01');
  }

}
