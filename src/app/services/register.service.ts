import { Injectable } from '@angular/core';

// Angular FireStore
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  // Database Reference
  dbref: AngularFirestore;

  // Collection Reference
  rgref: AngularFirestoreCollection;

  // Collection Parameters
  rg_col = 'RegisteredPeople';

  constructor(private db: AngularFirestore) {
    this.dbref = db;
    this.rgref = db.collection(this.rg_col);
  }

  registerUser(user) {
    if (user.regno === undefined) {
      return;
    }
    return this.rgref.doc(user.regno).set({
      name: user.name,
      email: user.email,
      regno: user.regno
    });
  }
}
