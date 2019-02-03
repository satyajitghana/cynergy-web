import { Component, OnInit, Inject } from '@angular/core';

import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-google-form',
  templateUrl: './google-form.component.html',
  styleUrls: ['./google-form.component.scss']
})
export class GoogleFormComponent implements OnInit {

  constructor(private router: Router, @Inject(DOCUMENT) private document: any) { }

  ngOnInit() {
    // this.router.navigate(['/join314159265']);

    this.document.location.href = 'https://goo.gl/forms/sKRxoNUuK5TLDS163';
  }

}
