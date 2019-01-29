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

  addEvent(): void {

    const eventToAdd: Event = this.eventsService.constructEvent(
      new Date(),
      'EventName',
      'EventTopic',
      'Description',
      'Logs',
      ['MAT01'],
      ['VID01'],
      30,
      'TYPE',
      true
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
      'PastTYPE',
      true
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

}
