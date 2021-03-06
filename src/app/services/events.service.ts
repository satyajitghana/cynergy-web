import { Injectable } from '@angular/core';

// Angular FireStore
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

// Models

import { EventDetails } from '../models/event-details.model';
import { Event } from '../models/event.model';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  items: Observable<any[]>;
  item: Observable<any>;

  // Database Reference
  dbref: AngularFirestore;
  // EventsList Reference
  elref: AngularFirestoreCollection;
  // EventDetails Reference
  edref: AngularFirestoreCollection;
  // PastEvents Reference
  peref: AngularFirestoreCollection;

  // Collection Parameters
  el_col = 'EventsList';
  ed_col = 'EventDetails';
  pe_col = 'PastEvents';

  constructor(private db: AngularFirestore) {
    this.dbref = db;
    this.elref = db.collection(this.el_col);
    this.edref = db.collection(this.ed_col);
    this.peref = db.collection(this.pe_col);
  }

  // Creates an event for the parameters given and returns the Event Object
  constructEvent(
    date: Date,
    eventName: string,
    eventTopic: string,
    description: string,
    logs: string,
    materials: string[],
    videos: string[],
    duration: number,
    type: string,
    ): Event {

      const newEventDetails: EventDetails = {
        description: description,
        logs: logs,
        materials: materials,
        videos: videos
      };

      const newEvent: Event = {
        date: date,
        eventName: eventName,
        eventTopic: eventTopic,
        details: newEventDetails,
        duration: duration,
        type: type,
        timeStamp: <any>firebase.firestore.FieldValue.serverTimestamp()
      };

      return newEvent;
  }

  /* Old Methods - needs to be updated */

  // Returns all the documents in EventsList

  // addEvent(ev: Event) {
  //   return this.elref.add(ev);
  // }

  // Adds the event details to the EventDetail collection
  // addEventDetail(ed: EventDetails) {
  //   return this.edref.add(ed);
  // }


  /* New Methods */

  /* Getter Methods*/

  // Returns the list of events
  getEventsList() {
    return this.elref.valueChanges();
  }

  // Not Required
  // Returns the Event Details of a specific ID
  // getEventWithID(id) {
  //   return this.edref.doc(id).valueChanges();
  // }

  // Returns all the event details
  getEventDetails() {
    return this.edref.valueChanges();
  }

  // Returns the list of PastEvents
  getPastEvents() {
    return this.peref.valueChanges();
  }

  // Gets the next Upcoming Event
  getNextUpcomingEvent() {
    const query = this.elref.ref.where('date', '>=', new Date()).orderBy('date').limit(1);
    const result = query.get()
    .then(querySnapshot => {
      return querySnapshot.docs.map(documentSnapshot => documentSnapshot.data());
    })
    .then(documents => {
      return documents[0];
    })
    .catch(console.log);

    return result;
  }

  // to fetch the id of the upcoming event
  getNextUpcomingEventId() {
    const query = this.elref.ref.where('date', '>=', new Date()).orderBy('date').limit(1);
    const result = query.get()
    .then(querySnapshot => {
      // console.log(querySnapshot.docs);
      // return querySnapshot.docs.map(documentSnapshot => documentSnapshot.data());
      return querySnapshot.docs[0].id;
    })
    // .then(documents => {
    //   console.log(documents);
    //   return documents[0];
    // })
    .catch(console.log);

    return result;
  }

  // Gets the PAST two events
  getPastTwoEvents() {
    const query = this.elref.ref.where('date', '<', new Date()).orderBy('date', 'desc').limit(2);
    const result =  query.get()
      .then(querySnapshot => {
        return querySnapshot.docs.map(documentSnapshot => documentSnapshot.data());
      })
      .catch(console.log);

    return result;
  }

  /* Add Methods */

  // Adds the Event, use constructEvent to create an event first
  addEvent(event: Event) {
    return this.edref.add(event.details)
    .then(docref => {
      /* Thought of referencing the event details, but it's okay
         for our current sort of work, not much API request are going
         to be made - shadowleaf (satyajit_ghana) */
      // event.details = docref;
      return this.elref.add(event);
    })
    .catch(err => {
      console.log('Error Adding Event:', err);
    });
  }

  // Adds an Event to the Past Event, usually we'll move the event
  // after expiring to the PastEvents
  addPastEvent(event: Event) {
    return this.edref.add(event.details)
    .then(docref => {
      /* Thought of referencing the event details, but it's okay
         for our current sort of work, not much API request are going
         to be made - shadowleaf (satyajit_ghana) */
      // event.details = docref;
      return this.peref.add(event);
    })
    .catch(err => {
      console.log('Error Adding Event:', err);
    });
  }

  updateUserEvent(email: string, eventid: string) {
    return this.dbref.collection('Users').doc(email).collection('events_attended').doc(eventid).set({attended: true})
      .then(() => {
        console.log('Added Successfully');
        return 'Added Successfully';
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  }
}
