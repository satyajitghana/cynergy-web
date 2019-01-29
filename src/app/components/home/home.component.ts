import { Component, OnInit } from '@angular/core';

// import Quotes Service
import { QuotesService } from '../../services/quotes.service';

// Quote Model
import { Quote } from '../../models/quote';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  quote: Quote = new Quote();

  constructor(private quotesService: QuotesService, private router: Router) { }

  ngOnInit() {

    // Get a Random Quote from the Database
    this.quotesService.getRandomQuote()
      .then(data => {
        this.quote = new Quote(data.text, data.author);
      });
  }

  register() {
    this.router.navigate(['/register']);
  }

}
