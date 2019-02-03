import { Component, OnInit, AfterViewInit } from '@angular/core';

// stuff for the Particle.JS
import particle_config from '../config-files/particles_config';
declare var TweenMax: any;
declare var Quart: any;
declare var $: any;

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit, AfterViewInit {

  title = 'Cynergy';

  myParams: object = {};
  width = 100;
  height = 100;

  Countdown: any;

  // for some damn reason January is the 0th month
  launchDate = new Date(2019, 0, 30, 17, 0, 0, 0);

  constructor() { }


  ngOnInit(): void {
    this.myParams = particle_config;
    this.calculateTimerValues();
  }

  ngAfterViewInit() {
    // Let's go !
    this.Countdown.init();
  }

  calculateTimerValues(): void {
    const difference = new Date(this.launchDate.getTime() - (new Date()).getTime());
    // const hours = difference.getHours();
    // const minutes = difference.getMinutes();
    const seconds = difference.getSeconds();
    const diffMs = this.launchDate.getTime() - (new Date()).getTime(); // milliseconds between now & launch
    const diffDays = Math.floor(diffMs / 86400000); // days
    const diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
    const diffMins = Math.floor(((diffMs % 86400000) % 3600000) / 60000); // minutes
    // console.log('days : ' + diffDays, 'hours : ' + diffHrs, 'minutes : ' + diffMins, 'milliseconds : ' + diffMs);
    this.createTimer(diffDays, diffHrs, diffMins, seconds);
  }

  createTimer(days_diff, hours_diff, minutes_diff, seconds_diff): void {
    // Create Countdown
    this.Countdown = {

      // Backbone-like structure
      $el: $('.countdown'),

      // Params
      countdown_interval: null,
      total_seconds: 0,

      // Initialize the countdown
      init: function () {

        // DOM
        this.$ = {
          days: this.$el.find('.bloc-time.days .figure'),
          hours: this.$el.find('.bloc-time.hours .figure'),
          minutes: this.$el.find('.bloc-time.min .figure'),
          seconds: this.$el.find('.bloc-time.sec .figure')
        };

        this.values = {
          days: days_diff,
          hours: hours_diff,
          minutes: minutes_diff,
          seconds: seconds_diff,
        };

        // Initialize total seconds
        // tslint:disable-next-line:max-line-length
        this.total_seconds = this.values.days * 24 * 60 * 60 + this.values.hours * 60 * 60 + (this.values.minutes * 60) + this.values.seconds;

        // Animate countdown to the end
        this.count();
      },

      count: function () {

        const that = this,
          $day_1 = this.$.days.eq(0),
          $day_2 = this.$.days.eq(1),
          $hour_1 = this.$.hours.eq(0),
          $hour_2 = this.$.hours.eq(1),
          $min_1 = this.$.minutes.eq(0),
          $min_2 = this.$.minutes.eq(1),
          $sec_1 = this.$.seconds.eq(0),
          $sec_2 = this.$.seconds.eq(1);

        this.countdown_interval = setInterval(function () {

          if (that.total_seconds > 0) {

            --that.values.seconds;

            if (that.values.minutes >= 0 && that.values.seconds < 0) {

              that.values.seconds = 59;
              --that.values.minutes;
            }

            if (that.values.hours >= 0 && that.values.minutes < 0) {

              that.values.minutes = 59;
              --that.values.hours;
            }

            if (that.values.days >= 0 && that.values.hours < 0) {
              that.values.hours = 24;
              --that.values.days;
            }

            // Update DOM values
            // Days
            that.checkHour(that.values.days, $day_1, $day_2);

            // Hours
            that.checkHour(that.values.hours, $hour_1, $hour_2);

            // Minutes
            that.checkHour(that.values.minutes, $min_1, $min_2);

            // Seconds
            that.checkHour(that.values.seconds, $sec_1, $sec_2);

            --that.total_seconds;
          } else {
            clearInterval(that.countdown_interval);
          }
        }, 1000);
      },

      animateFigure: function ($el, value) {

        const $top = $el.find('.top'),
          $bottom = $el.find('.bottom'),
          $back_top = $el.find('.top-back'),
          $back_bottom = $el.find('.bottom-back');

        // Before we begin, change the back value
        $back_top.find('span').html(value);

        // Also change the back bottom value
        $back_bottom.find('span').html(value);

        // Then animate
        TweenMax.to($top, 0.8, {
          rotationX: '-180deg',
          transformPerspective: 300,
          ease: Quart.easeOut,
          onComplete: function () {

            $top.html(value);

            $bottom.html(value);

            TweenMax.set($top, {
              rotationX: 0
            });
          }
        });

        TweenMax.to($back_top, 0.8, {
          rotationX: 0,
          transformPerspective: 300,
          ease: Quart.easeOut,
          clearProps: 'all'
        });
      },

      checkHour: function (value, $el_1, $el_2) {

        const val_1 = value.toString().charAt(0),
          val_2 = value.toString().charAt(1),
          fig_1_value = $el_1.find('.top').html(),
          fig_2_value = $el_2.find('.top').html();

        if (value >= 10) {

          // Animate only if the figure has changed
          if (fig_1_value !== val_1) { this.animateFigure($el_1, val_1); }
          if (fig_2_value !== val_2) { this.animateFigure($el_2, val_2); }
        } else {

          // If we are under 10, replace first figure with 0
          if (fig_1_value !== '0') { this.animateFigure($el_1, 0); }
          if (fig_2_value !== val_1) { this.animateFigure($el_2, val_1); }
        }
      }
    };
  }

}
