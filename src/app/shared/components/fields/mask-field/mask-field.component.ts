import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslationModule } from '../../../../core/modules/translation.module';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { IconComponent } from "@app/shared/components/widgets/icon/icon.component";
import { ErrorFieldsComponent } from '../../errors/error-fields/error-fields.component';

@Component({
  selector: 'app-mask-field',
  imports: [CommonModule, TranslationModule, FormsModule, ReactiveFormsModule, InputTextModule, InputMaskModule, IconComponent, ErrorFieldsComponent],
  templateUrl: './mask-field.component.html',
  styleUrl: './mask-field.component.css'
})
export class MaskFieldComponent {

  @Input() id!: string;
  @Input() labelKey!: string;
  @Input() formGroup!: FormGroup;
  @Input() controlName!: string;
  @Input() controlPath?: string[] | string;
  @Input() icon!: string;
  @Input() type!: string;
  @Input() mask: string = "";
  @Input() placeholder: string = "";
  @Input() slotChar: string = "";
  @Input() readonly: boolean = false;
  @Input() showMessage: boolean = false;

  get control(): FormControl | null {
    const ctrl = this.controlPath
      ? this.formGroup.get(this.controlPath)
      : this.formGroup.get(this.controlName);

    return ctrl instanceof FormControl ? ctrl : null;
  }
}
