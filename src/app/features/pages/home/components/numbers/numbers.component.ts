import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationModule } from '@app/core/modules/translation.module';
import { IconComponent } from '@app/shared/components/widgets/icon/icon.component';

interface Data {
  label: string;
  caption: string;
  icon: string
}

@Component({
  selector: 'app-numbers',
  imports: [CommonModule, TranslationModule, IconComponent],
  templateUrl: './numbers.component.html',
  styleUrls: ['./numbers.component.css'],
  providers: []
})

export class NumbersComponent {

  data: Data[] = [
    { label: "+25", caption: "years_of_experience", icon: "trophy-fill" },
    { label: "+1M", caption: "hotels_around_the_world", icon: "building-fill" },
    { label: "24/7", caption: "team_available_for_you", icon: "headset" },
    { label: "4.6", caption: "average_rating_by_customers", icon: "gem" },
  ]
}
