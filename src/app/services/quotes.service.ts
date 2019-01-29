import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

// import the Quote model
import { Quote } from '../models/quote';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuotesService {

  // Database Reference
  dbref: AngularFirestore;

  // Quotes Reference
  qtref: AngularFirestoreCollection;

  // Collection Parameters
  qt_col = 'Quotes';

  // Placeholder for the list of quotes
  allQuotes: Observable<any[]>;

  constructor(private db: AngularFirestore) {
    this.dbref = db;
    this.qtref = db.collection(this.qt_col);
  }

  getQuotes() {
    return this.qtref.valueChanges();
  }

  getRandomQuote(): any {
    // const quotes = this.getQuotes();
    // this.getQuotes().subscribe(data => {
    //   console.log(data[Math.floor(Math.random() * data.length)]);
    //   // return data[Math.floor(Math.random() * data.length)];
    // });
    return this.qtref.ref.get()
      .then(snapshot => {
        return snapshot.docs.map(data => data.data());
      })
      .then(data => {
        return data[Math.floor(Math.random() * data.length)];
      })
      .catch(err => {
        console.log('Error Occured', err);
      });
  }
}
