import { Component, Input, OnInit } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { TranslationModule } from '@app/core/modules/translation.module';
import { CommonModule } from '@angular/common';
import { ProgressBar } from 'primeng/progressbar';

@Component({
  selector: 'app-referral-ad',
  standalone: true,
  imports: [DialogModule, TranslationModule, CommonModule, ProgressBar],
  templateUrl: './referral-ad.component.html',
  styleUrl: './referral-ad.component.css'
})

export class ReferralAdComponent implements OnInit {

  @Input() dailyLimit: boolean = true;

  visible: boolean = false;

  ngOnInit() {
    if (this.dailyLimit) {
      const lastShown = localStorage.getItem('referralDialogLastShown');

      if (!lastShown) {
        this.showDialog();
      } else {
        const lastDate = new Date(lastShown);
        const today = new Date();

        const sameDay =
          lastDate.getFullYear() === today.getFullYear() &&
          lastDate.getMonth() === today.getMonth() &&
          lastDate.getDate() === today.getDate();

        if (!sameDay) {
          this.showDialog();
        }
      }
    } else {
      this.showDialog();
    }
  }

  showDialog(): void {
    this.visible = true;

    if (this.dailyLimit) {
      localStorage.setItem('referralDialogLastShown', new Date().toISOString());
    }
  }
}
