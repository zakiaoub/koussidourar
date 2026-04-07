import { Component, input, Output, EventEmitter, signal } from '@angular/core';
import { TranslationModule } from '@app/core/modules/translation.module';
import { IconComponent } from '../../widgets/icon/icon.component';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../widgets/button/button.component';

@Component({
  selector: 'app-error-request',
  imports: [TranslationModule, IconComponent, CommonModule, ButtonComponent],
  templateUrl: './error-request.component.html',
  styleUrl: './error-request.component.css'
})
export class ErrorRequestComponent {

  @Output() action = new EventEmitter<void>();
  color = input<string>('red-text');
  icon = input<string>('exclamation-triangle-fill');
  label = input<string>('error_request_title');
  caption = input<string>('error_request');
  isLoading = signal<boolean>(false)

  buttonFunction() {
    this.action.emit();
  }

  onReload(): void {
    this.isLoading.set(true)
    setTimeout(() => {
      this.isLoading.set(false)
      location.reload()
    }, 1000);
  }
}
