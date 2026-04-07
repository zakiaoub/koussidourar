import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslationModule } from '../../../../core/modules/translation.module';
import { InputTextModule } from 'primeng/inputtext';
import { IconComponent } from "@app/shared/components/widgets/icon/icon.component";
import { KeyFilterModule } from 'primeng/keyfilter';
import { MessageModule } from 'primeng/message';
import { ErrorFieldsComponent } from '../../errors/error-fields/error-fields.component';

@Component({
  selector: 'app-input-field',
  imports: [CommonModule, TranslationModule, FormsModule, ReactiveFormsModule, InputTextModule, IconComponent, KeyFilterModule, MessageModule, ErrorFieldsComponent],
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.css'
})

export class InputFieldComponent {

  Validators = Validators;

  @Input() id!: string;
  @Input() labelKey!: string;
  @Input() controlName!: string;
  @Input() icon!: string;
  @Input() type!: string;
  @Input() placeholder: string = "";
  @Input() readonly: boolean = false;
  @Input() keyFilter: any = "";
  @Input() showMessage: boolean = false;
  @Input() minlength: number = null
  @Input() maxlength: number = null

  @Input() formGroup!: FormGroup;

  @Input() controlPath?: string[] | string;

  get control(): FormControl | null {
    const ctrl = this.controlPath
      ? this.formGroup.get(this.controlPath)
      : this.formGroup.get(this.controlName);

    return ctrl instanceof FormControl ? ctrl : null;
  }

}
