import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslationModule } from '@app/core/modules/translation.module';
import { InputTextModule } from 'primeng/inputtext';
import countries from '@assets/json/countries.json'
import { IconComponent } from "@app/shared/components/widgets/icon/icon.component";
import { SelectModule } from 'primeng/select';
import { SessionService } from '@app/core/services/session.service';
import { ErrorFieldsComponent } from '../../errors/error-fields/error-fields.component';
import { environment } from 'environments/environment'

@Component({
  selector: 'app-countries-field',
  imports: [CommonModule, TranslationModule, FormsModule, ReactiveFormsModule, InputTextModule, IconComponent, SelectModule, ErrorFieldsComponent],
  templateUrl: './countries-field.component.html',
  styleUrl: './countries-field.component.css'
})

export class CountriesFieldComponent {

  constructor(private sessionService: SessionService) {
    this.currentLang = this.sessionService.getSession()?.lang
  }

  currentLang: string = environment.NG_APP_LANG

  countries = countries

  @Input() id!: string;
  @Input() labelKey!: string;
  @Input() formGroup!: FormGroup;
  @Input() controlName!: string;
  @Input() controlPath?: string[] | string;
  @Input() icon!: string;
  @Input() type!: string;
  @Input() showMessage: boolean = false;

  get control(): FormControl | null {
    const ctrl = this.controlPath
      ? this.formGroup.get(this.controlPath)
      : this.formGroup.get(this.controlName);

    return ctrl instanceof FormControl ? ctrl : null;
  }
}
