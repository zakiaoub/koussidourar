import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslationModule } from '@app/core/modules/translation.module';
import { ReferralsStatsComponent } from '../../components/referrals-stats/referrals-stats.component';
import { ReferralsProgressComponent } from '../../components/referrals-progress/referrals-progress.component';
import { ReferralsLinkComponent } from '../../components/referrals-link/referrals-link.component';
import { TopBannerComponent } from '@app/shared/components/banner/top-banner/top-banner.component';
import { FormDataService } from '@app/core/services/form-data.service';
import { Profile } from '@app/core/models/profile.interface';
import { environment } from '@env/environment';
import { QRCodeComponent } from 'angularx-qrcode';
import { ReferralsListComponent } from '../../components/referrals-list/referrals-list.component';

@Component({
  selector: 'app-referrals-home',
  imports: [CommonModule, TranslationModule, TopBannerComponent, ReferralsStatsComponent, ReferralsProgressComponent, ReferralsLinkComponent, QRCodeComponent, ReferralsListComponent],
  templateUrl: './referrals-home.component.html',
  styleUrl: './referrals-home.component.css'
})

export class ReferralsHomeComponent {

  constructor(private formDataService: FormDataService) { }

  profileData: Profile | null = null;;

  ngOnInit(): void {
    this.profileData = this.formDataService.getData('profile')
  }

  referralLink: string = environment.NG_APP_REFERRAL_LINK

  data: any = {
    "rank": "bronze",
    "referrals": 18,
    "earnings": 6200,
    "pendingPayouts": 350,
    "coupons": 2,
    "nextRankEarnings": 10000,
    "goldLevel": 30000,
    "friends": [{
      "id": 1,
      "name": "Hansiain Stranaghan",
      "phone": "172-350-7183",
      "date": "11/16/2025",
      "bookings": 47,
      "amount": 24.99,
      "status": false
    }, {
      "id": 2,
      "name": "Verna Inett",
      "phone": "545-209-9966",
      "date": "2/5/2026",
      "bookings": 27,
      "amount": 199.99,
      "status": true
    }, {
      "id": 3,
      "name": "Joletta Sellor",
      "phone": "691-939-7920",
      "date": "12/11/2025",
      "bookings": 20,
      "amount": 29.99,
      "status": true
    }, {
      "id": 4,
      "name": "Tanhya Vogel",
      "phone": "255-400-5617",
      "date": "6/1/2025",
      "bookings": 64,
      "amount": 22.99,
      "status": true
    }, {
      "id": 5,
      "name": "Ted Teeney",
      "phone": "825-572-0487",
      "date": "9/1/2025",
      "bookings": 54,
      "amount": 129.99,
      "status": false
    }, {
      "id": 6,
      "name": "Maisey Luckin",
      "phone": "469-874-4955",
      "date": "4/3/2025",
      "bookings": 31,
      "amount": 4.29,
      "status": true
    }, {
      "id": 7,
      "name": "Dix Gerard",
      "phone": "379-474-5751",
      "date": "12/28/2025",
      "bookings": 98,
      "amount": 2.49,
      "status": false
    }, {
      "id": 8,
      "name": "Madeline Farnworth",
      "phone": "972-431-9597",
      "date": "8/25/2025",
      "bookings": 91,
      "amount": 24.99,
      "status": true
    }, {
      "id": 9,
      "name": "Adan Drowsfield",
      "phone": "774-422-6811",
      "date": "5/28/2025",
      "bookings": 19,
      "amount": 39.99,
      "status": false
    }, {
      "id": 10,
      "name": "Joya Howells",
      "phone": "338-656-0859",
      "date": "4/24/2025",
      "bookings": 21,
      "amount": 3.99,
      "status": false
    }]
  }
}
