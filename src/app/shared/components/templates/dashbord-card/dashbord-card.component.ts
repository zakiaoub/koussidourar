import { CommonModule } from '@angular/common';
import { Component, input, Input } from '@angular/core';
import { TranslationModule } from '@app/core/modules/translation.module';
import { IconComponent } from '../../widgets/icon/icon.component';
import { SpinnerComponent } from '../../loaders/spinner/spinner.component';

@Component({
  selector: 'app-dashbord-card',
  imports: [CommonModule, TranslationModule, IconComponent, SpinnerComponent],
  templateUrl: './dashbord-card.component.html',
  styleUrl: './dashbord-card.component.css'
})

export class DashbordCardComponent {

  @Input() label: string
  @Input() icon: string
  @Input() color: string = 'main-text'
  @Input() value: string | number
  isLoading = input<boolean>(false)
}
