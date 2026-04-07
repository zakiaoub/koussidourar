import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslationModule } from '../../../../core/modules/translation.module';
import { ButtonComponent } from '@app/shared/components/widgets/button/button.component';

@Component({
  selector: 'app-flight-rules',
  imports: [CommonModule, TranslationModule, ButtonComponent],
  templateUrl: './flight-rules.component.html',
  styleUrl: './flight-rules.component.css'
})
export class FlightRulesComponent {

  IsClicked: boolean = false

  @Input() data: any

  visibleCount = 12;

  loadMore() {
    this.IsClicked = true
    setTimeout(() => {
      this.visibleCount += 12;
      this.IsClicked = false;
    }, 500);
  }


}
