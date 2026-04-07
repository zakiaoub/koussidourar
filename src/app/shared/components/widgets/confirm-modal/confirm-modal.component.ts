import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslationModule } from '@app/core/modules/translation.module';
import { DialogModule } from 'primeng/dialog';
import { IconComponent } from "@app/shared/components/widgets/icon/icon.component";
import { ButtonComponent } from '@app/shared/components/widgets/button/button.component';

@Component({
  selector: 'app-confirm-modal',
  imports: [CommonModule, TranslationModule, DialogModule, IconComponent, ButtonComponent],
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.css',
})
export class ConfirmModalComponent {

  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  @Input() icon: string;
  @Input() severity: string = 'success';
  @Input() title: string;
  @Input() caption: string;
  @Input() trigger: string;

  @Output() action = new EventEmitter<void>();

  buttonFunction() {
    this.action.emit();
  }

  closeModal() {
    this.visible = false;
    this.visibleChange.emit(false);
  }
}
