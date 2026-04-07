import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslationModule } from '../../../../core/modules/translation.module';
import { InputTextModule } from 'primeng/inputtext';
import { IconComponent } from "@app/shared/components/widgets/icon/icon.component";
import { PasswordModule } from 'primeng/password';
import { ErrorFieldsComponent } from '../../errors/error-fields/error-fields.component';

@Component({
  selector: 'app-password-field',
  imports: [CommonModule, TranslationModule, FormsModule, ReactiveFormsModule, InputTextModule, IconComponent, PasswordModule, ErrorFieldsComponent],
  templateUrl: './password-field.component.html',
  styleUrl: './password-field.component.css'
})

export class PasswordFieldComponent {
  @Input() id!: string;
  @Input() labelKey!: string;
  @Input() formGroup!: FormGroup;
  @Input() controlName!: string;
  @Input() controlPath?: string[] | string;
  @Input() icon!: string;
  @Input() placeholder: string = "";
  @Input() toggleMask: boolean = false;
  @Input() feedback: boolean = false;
  @Input() showMessage: boolean = false;
  @Input() minlength: number = null
  @Input() maxlength: number = null
  
  get control(): FormControl | null {
    const ctrl = this.controlPath
      ? this.formGroup.get(this.controlPath)
      : this.formGroup.get(this.controlName);

    return ctrl instanceof FormControl ? ctrl : null;
  }

}
