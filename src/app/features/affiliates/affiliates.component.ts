import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '@app/core/services/auth.service';
import { TopBannerComponent } from '@app/shared/components/banner/top-banner/top-banner.component';
import { ServicesBackgroundComponent } from '@app/shared/components/templates/services-background/services-background.component';
import { AffiliatesRankingComponent } from './components/affiliates-ranking/affiliates-ranking.component';
import { AffiliatesLevelsComponent } from './components/affiliates-levels/affiliates-levels.component';
import { LoginBannerComponent } from '@app/shared/components/banner/login-banner/login-banner.component';
import { ComingSoonComponent } from '@app/shared/components/errors/coming-soon/coming-soon.component';

@Component({
  selector: 'app-affiliates',
  imports: [CommonModule, TopBannerComponent, ServicesBackgroundComponent, AffiliatesRankingComponent, AffiliatesLevelsComponent, LoginBannerComponent, ComingSoonComponent],
  templateUrl: './affiliates.component.html',
  styleUrl: './affiliates.component.css'
})
export class AffiliatesComponent {

  constructor(
    private auth: AuthService
  ) { }

  isAuth: boolean

  ngOnInit(): void {
    this.isAuth = this.auth.checkAuthentication()
  }

  data: any = [
    { title: "share_your_experience", caption: "share_your_experience_caption", img: "assets/icons/interface/share.png" },
    { title: "collect_the_winnings", caption: "collect_the_winnings_caption", img: "assets/icons/interface/deal.png" },
  ]

  steps: any = [
    { id: 1, title: "register", content: "register_partners_content" },
    { id: 2, title: "refer", content: "refer_content" },
    { id: 3, title: "your_gold_child_registers", content: "your_gold_child_registers_caption" },
  ]

}
