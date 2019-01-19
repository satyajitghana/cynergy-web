import { Component, OnInit } from '@angular/core';

// Angular Firestore
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  ngOnInit(): void {
  }

  constructor(db: AngularFirestore) {
    db.firestore.settings({ timestampsInSnapshots: true });
  }

}
