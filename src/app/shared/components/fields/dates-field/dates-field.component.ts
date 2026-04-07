import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslationModule } from '@app/core/modules/translation.module';
import { InputTextModule } from 'primeng/inputtext';
import { IconComponent } from "@app/shared/components/widgets/icon/icon.component";
import { DatePicker } from 'primeng/datepicker';

@Component({
  selector: 'app-dates-field',
  imports: [CommonModule, TranslationModule, FormsModule, ReactiveFormsModule, InputTextModule, IconComponent, DatePicker],
  templateUrl: './dates-field.component.html',
  styleUrl: './dates-field.component.css'
})

export class DatesFieldComponent {

  @Input() labelKey!: string;
  @Input() formGroup!: FormGroup;
  @Input() formControlName!: string;
  @Input() controlPath?: string[] | string;
  @Input() icon!: string;
  @Input() type!: string;
  @Input() readonly: boolean = false;
  @Input() placeholder: string = "";
  @Input() numberOfMonths: number = 2;

  get control(): FormControl | null {
    const ctrl = this.controlPath
      ? this.formGroup.get(this.controlPath)
      : this.formGroup.get(this.formControlName);

    return ctrl instanceof FormControl ? ctrl : null;
  }

}
