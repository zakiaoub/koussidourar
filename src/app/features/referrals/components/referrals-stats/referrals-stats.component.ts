import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationModule } from '../../../../core/modules/translation.module';
import { DashbordCardComponent } from '@app/shared/components/templates/dashbord-card/dashbord-card.component';

@Component({
  selector: 'app-referrals-stats',
  imports: [CommonModule, TranslationModule, DashbordCardComponent],
  templateUrl: './referrals-stats.components.html',
  styleUrl: './referrals-stats.component.css'
})

export class ReferralsStatsComponent {

  @Input() data: any;
  @Input() visible: true
  @Input() fullName: string

}
