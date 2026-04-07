import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslationModule } from '../../../../core/modules/translation.module';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { MessageModule } from 'primeng/message';
import { ErrorFieldsComponent } from '../../errors/error-fields/error-fields.component';

@Component({
  selector: 'app-textarea-field',
  imports: [CommonModule, TranslationModule, FormsModule, ReactiveFormsModule, InputTextModule, KeyFilterModule, MessageModule, ErrorFieldsComponent],
  templateUrl: './textarea-field.component.html',
  styleUrl: './textarea-field.component.css'
})

export class TextareaFieldComponent {

  @Input() id!: string;
  @Input() labelKey!: string;
  @Input() controlName!: string;
  @Input() placeholder: string = "";
  @Input() readonly: boolean = false;
  @Input() showMessage: boolean = false;
  @Input() minlength: number = null
  @Input() maxlength: number = null
  @Input() rows: number
  @Input() formGroup!: FormGroup;
  @Input() controlPath?: string[] | string;

  get control(): FormControl | null {
    const ctrl = this.controlPath
      ? this.formGroup.get(this.controlPath)
      : this.formGroup.get(this.controlName);

    return ctrl instanceof FormControl ? ctrl : null;
  }
}
