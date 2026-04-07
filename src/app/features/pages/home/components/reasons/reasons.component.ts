import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationModule } from '@app/core/modules/translation.module';
import { IconComponent } from "@app/shared/components/widgets/icon/icon.component";
import * as AOS from 'aos';
import { environment } from 'environments/environment'

interface Data {
  content: string;
  icon: string;
}

@Component({
  selector: 'app-reasons',
  imports: [CommonModule, TranslationModule, IconComponent],
  templateUrl: './reasons.component.html',
  styleUrl: './reasons.component.css'
})

export class ReasonsComponent {

  phone: string = environment.NG_APP_PHONE

  data: Data[] = [
    { content: "more_opportunities", icon: 'rocket-takeoff-fill' },
    { content: "more_visibility", icon: 'eye-fill' },
    { content: "more_income", icon: 'currency-exchange' },
  ]

  ngOnInit(): void {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }
}
