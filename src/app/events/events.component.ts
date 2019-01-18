import { Component, OnInit } from '@angular/core';

// Events Service
import { EventsService } from '../services/events.service';

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

  getEvent(): void {

  }

}
