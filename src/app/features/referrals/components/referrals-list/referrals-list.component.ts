import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { TranslationModule } from '@app/core/modules/translation.module';
import { NoResultsFoundComponent } from '@app/shared/components/errors/no-results-found/no-results-found.component';
import { AmountComponent } from '@app/shared/components/settings/components/amount/amount.component';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-referrals-list',
  imports: [CommonModule, TranslationModule, NoResultsFoundComponent, AmountComponent, TagModule],
  templateUrl: './referrals-list.component.html',
  styleUrl: './referrals-list.component.css'
})

export class ReferralsListComponent {

  data = input<any>(null)
}
