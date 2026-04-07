import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IconComponent } from '../../widgets/icon/icon.component';
import { MessageModule } from 'primeng/message';
import { TranslationModule } from '@app/core/modules/translation.module';

@Component({
  selector: 'app-error-fields',
  imports: [CommonModule, IconComponent, MessageModule, TranslationModule],
  templateUrl: './error-fields.component.html',
  styleUrl: './error-fields.component.css'
})

export class ErrorFieldsComponent {

  @Input() status: string
  @Input() chars: number
}
