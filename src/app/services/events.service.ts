import { Injectable } from '@angular/core';

// Angular FireStore
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

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

  // Collection Parameters
  el_col = 'EventsList';
  ed_col = 'EventDetails';

  constructor(private db: AngularFirestore) {
    this.dbref = db;
    this.elref = db.collection(this.el_col);
    this.edref = db.collection(this.ed_col);
  }

  // Returns all the documents in EventsList
  getEventsList() {
    return this.elref.valueChanges();
  }

  // Returns the Event Details of a specific ID
  getEventWithID(id) {
    return this.edref.doc(id).valueChanges();
  }
}
