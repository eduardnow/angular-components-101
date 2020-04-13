import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { TimerService } from './timer.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
  providers: [TimerService]
})
export class TimerComponent implements OnInit, OnDestroy {
  @Output() onComplete = new EventEmitter<void>();
  @Input() init: number = 20;
  private countdownEndSubscription: Subscription = null;
  private countdownSubscription: Subscription = null;
  public countdown: number = 0;

  constructor(public timerService: TimerService) { }

  get progress() {
    return (this.init - this.countdown) / this.init * 100;
  }

  ngOnInit(): void {
    this.timerService.restartCountdown(this.init);

    this.countdownEndSubscription = this.timerService.countdownEnd$.subscribe(() => {
      this.onComplete.emit();
    });

    this.countdownSubscription = this.timerService.countdown$.subscribe((data) => {
      this.countdown = data;
    });
  }

  ngOnDestroy(): void {
    this.timerService.destroy();

    this.countdownEndSubscription.unsubscribe();
    this.countdownSubscription.unsubscribe();
  }
}
