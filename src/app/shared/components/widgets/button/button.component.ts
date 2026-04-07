import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslationModule } from '@app/core/modules/translation.module';
import { SpinnerComponent } from '../../loaders/spinner/spinner.component';
import { IconComponent } from '@app/shared/components/widgets/icon/icon.component';

@Component({
  selector: 'app-button',
  imports: [CommonModule, TranslationModule, SpinnerComponent, IconComponent],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {

  @Output() action = new EventEmitter<void>();

  buttonFunction() {
    this.action.emit();
  }

  @Input() isLoading: boolean = false
  @Input() type: string
  @Input() title: string
  @Input() icon: string
  @Input() class: string
  @Input() disabled: any
  @Input() isWhite: boolean = true
}
