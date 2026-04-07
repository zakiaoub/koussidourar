import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslationModule } from '../../../../core/modules/translation.module';
import { SelectModule } from 'primeng/select';
import countries from '@assets/json/countries.json'
import { InputMaskModule } from 'primeng/inputmask';
import { SessionService } from '@app/core/services/session.service';
import { ErrorFieldsComponent } from '../../errors/error-fields/error-fields.component';
import { environment } from 'environments/environment'

@Component({
  selector: 'app-phone-field',
  imports: [CommonModule, TranslationModule, FormsModule, ReactiveFormsModule, SelectModule, InputMaskModule, ErrorFieldsComponent],
  templateUrl: './phone-field.component.html',
  styleUrl: './phone-field.component.css'
})

export class PhoneFieldComponent {

  constructor(private sessionService: SessionService) {
    this.selectedCountryCode = this.sessionService.getSession()?.location?.countryCode
    this.currentLang = this.sessionService.getSession()?.lang
  }

  data: any = countries;

  @Input() id!: string;
  @Input() labelKey!: string;
  @Input() formGroup!: FormGroup;
  @Input() controlName!: string;
  @Input() controlPath?: string[] | string;
  @Input() placeholder: string = "";
  @Input() readonly: boolean = false;
  @Input() showMessage: boolean = false;

  selectedCountryCode: string = environment.NG_APP_COUNTRY_CODE;
  currentLang: string = environment.NG_APP_LANG

  get selectedCountry() {
    return this.data.find(c => c.code === this.selectedCountryCode);
  }

  get control(): FormControl | null {
    const ctrl = this.controlPath
      ? this.formGroup.get(this.controlPath)
      : this.formGroup.get(this.controlName);

    return ctrl instanceof FormControl ? ctrl : null;
  }

  get phoneMask(): string {
    return this.selectedCountry?.format?.replace(/X/g, '9') || '999-999-9999';
  }

  get phonePlaceholder(): string {
    return this.selectedCountry?.format || this.placeholder;
  }

}
