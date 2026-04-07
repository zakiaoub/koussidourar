import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IconComponent } from '@app/shared/components/widgets/icon/icon.component';
import { TranslationModule } from '@app/core/modules/translation.module';
import { PercentPipe } from '@app/shared/pipes/percent.pipe';
import { ProgressBar } from "primeng/progressbar";
import { FixedPipe } from '@app/shared/pipes/fixed.pipe';

@Component({
  selector: 'app-referrals-progress',
  imports: [TranslationModule, CommonModule, IconComponent, PercentPipe, ProgressBar, FixedPipe],
  templateUrl: './referrals-progress.component.html',
  styleUrl: './referrals-progress.component.css'
})
export class ReferralsProgressComponent {

  @Input() data: any;

}
