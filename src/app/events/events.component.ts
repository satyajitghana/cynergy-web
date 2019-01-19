import { Component, OnInit } from '@angular/core';

// Events Service
import { EventsService } from '../services/events.service';

// Models
import { EventDetails } from '../models/event-details.model';
import { Event } from '../models/event.model';

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
        console.log(iterator, 'Event Details : ');
        this.eventsService.getEventWithID(iterator.ID.id).subscribe(console.log);
      }
    });
  }

  addEvent(): void {
    const toAddE: EventDetails = {
      Description: 'Tjhjgghdescription',
      Logs: 'And thja log',
      Materials: ['Mathgials ? '],
      Videos: ['VIgO1']
    };
    const toAdd: Event = {
      EstDuration: 2,
      EventName: 'YOOOO',
      EventTopic: 'HEYYY',
      ID: toAddE,
      Type: 'DP',
      isUpcoming: true,
      timeStamp: <any>firebase.firestore.FieldValue.serverTimestamp()
    };

    this.eventsService.addEvent(toAdd).then(() => console.log('EventDetails Added')).catch(console.log);
  }

  addEventDetails(): void {
    const toAdd: EventDetails = {
      Description: 'This is a description',
      Logs: 'And this is a log',
      Materials: ['Materials ? '],
      Videos: ['VIDEO1']
    };

    this.eventsService.addEventDetail(toAdd).then(() => console.log('EventDetails Added')).catch(console.log);
  }

  getEventDetails(): void {
    console.log('Event Details');
    this.eventsService.getEventDetails().subscribe(data => {
      for (const iterator of data) {
        console.log(iterator);
      }
    });
  }

}
