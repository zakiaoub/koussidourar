import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslationModule } from '@app/core/modules/translation.module';

@Component({
  selector: 'app-affiliates-ranking',
  imports: [CommonModule, TranslationModule],
  templateUrl: './affiliates-ranking.component.html',
  styleUrl: './affiliates-ranking.component.css'
})

export class AffiliatesRankingComponent {

  data: any = [
    {
      name: "Travis Howard",
      rank: "gold",
      image: "https://mui.com/static/images/avatar/2.jpg",
      earnings: 30747.05,
    },
    {
      name: "Cindy Baker",
      rank: "silver",
      image: "https://mui.com/static/images/avatar/3.jpg",
      earnings: 10273.87,
    },
    {
      name: "Remy Sharp",
      rank: "bronze",
      image: "https://mui.com/static/images/avatar/1.jpg",
      earnings: 8172.00,
    }
  ]
}
