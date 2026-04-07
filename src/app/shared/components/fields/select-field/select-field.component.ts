import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslationModule } from '../../../../core/modules/translation.module';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-select-field',
  imports: [CommonModule, TranslationModule, FormsModule, ReactiveFormsModule, InputTextModule, SelectModule],
  templateUrl: './select-field.component.html',
  styleUrl: './select-field.component.css'
})

export class SelectFieldComponent {

  @Input() labelKey!: string;
  @Input() formGroup!: FormGroup;
  @Input() controlName!: string;
  @Input() controlPath?: string[] | string;
  @Input() placeholder: string = "";
  @Input() options: string[] = [];
  @Input() editable: boolean = false
  @Input() filter: boolean = false

  get control(): FormControl | null {
    const ctrl = this.controlPath
      ? this.formGroup.get(this.controlPath)
      : this.formGroup.get(this.controlName);

    return ctrl instanceof FormControl ? ctrl : null;
  }

}
