import { Component, OnInit, OnDestroy } from '@angular/core';


@Component({
    selector: 'app-countdown',
    imports: [],
    templateUrl: './countdown.component.html',
    styleUrl: './countdown.component.css'
})
export class CountdownComponent implements OnInit, OnDestroy {
  
  targetDate: Date = new Date('2025-06-31T23:59:59'); // Remplacez par votre date cible
  days: number = 0;
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  intervalId: any;

  ngOnInit(): void {
    this.startCountdown();
  }

  startCountdown(): void {
    this.updateCountdown(); // Mise à jour initiale
    this.intervalId = setInterval(() => this.updateCountdown(), 1000);
  }

  updateCountdown(): void {
    const now = new Date().getTime();
    const distance = this.targetDate.getTime() - now;

    if (distance < 0) {
      clearInterval(this.intervalId);
      return;
    }

    this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
    this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    this.seconds = Math.floor((distance % (1000 * 60)) / 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

}
