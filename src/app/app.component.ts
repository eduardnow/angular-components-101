import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public counterProgress = 0;
  public totalCounter = 15;

  constructor() {}

  updateProgress($event) {
    this.counterProgress =
      ((this.totalCounter - $event) / this.totalCounter) * 100;
  }

  countdownFinished() {
    console.log('countdown has finished');
  }
}
