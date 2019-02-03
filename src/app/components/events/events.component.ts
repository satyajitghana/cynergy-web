import { Component, OnInit } from '@angular/core';

// Events Service
import { EventsService } from '../../services/events.service';

// Models
import { EventDetails } from '../../models/event-details.model';
import { Event } from '../../models/event.model';

import * as firebase from 'firebase';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  constructor(private eventsService: EventsService) {
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
      new Date(2019, 0, 25, 10, 30, 0, 0),
      'Inauguration',
      'Inauguration',
      `Its finally here! the inaugration of the first official coding club of Ramaiah University!`,
      '',
      ['Seminar Hall'],
      [''],
      120,
      'Inauguration'
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

}
