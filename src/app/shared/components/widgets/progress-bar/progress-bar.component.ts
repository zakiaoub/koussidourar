import { Component, Input } from '@angular/core';
import { PercentPipe } from '@app/shared/pipes/percent.pipe';

@Component({
  selector: 'app-progress-bar',
  imports: [PercentPipe],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.css'
})
export class ProgressBarComponent {

  @Input() value: number = 50
  @Input() top: number = 100
  @Input() size: number = 5
}
