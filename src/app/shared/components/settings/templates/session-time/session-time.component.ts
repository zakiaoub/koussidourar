import { Component, Input } from '@angular/core';
import { TranslationModule } from '@app/core/modules/translation.module';
import { CommonModule } from '@angular/common';
import { SessionService } from '@app/core/services/session.service';

@Component({
  selector: 'app-session-time',
  imports: [TranslationModule, CommonModule],
  templateUrl: './session-time.component.html',
  styleUrl: './session-time.component.css'
})
export class SessionTimeComponent {

  constructor(private sessionService: SessionService) {
  }

  @Input() type: string
  @Input() count: any
  @Input() service?: string
  remainingTime: any

  ngOnInit(): void {
    this.sessionService.getRemainingTimeObservable().subscribe(time => {
      this.remainingTime = time;
    });
  }
}
