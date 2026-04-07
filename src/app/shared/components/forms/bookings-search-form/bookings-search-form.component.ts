import { CommonModule } from '@angular/common';
import { Component, input, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslationModule } from '@app/core/modules/translation.module';
import { InputFieldComponent } from '../../fields/input-field/input-field.component';
import { SelectFieldComponent } from '../../fields/select-field/select-field.component';
import { DatesFieldComponent } from '../../fields/dates-field/dates-field.component';
import { ButtonComponent } from '../../widgets/button/button.component';

@Component({
  selector: 'app-bookings-search-form',
  imports: [CommonModule, TranslationModule, FormsModule, ReactiveFormsModule, InputFieldComponent, SelectFieldComponent, DatesFieldComponent, ButtonComponent],
  templateUrl: './bookings-search-form.component.html',
  styleUrl: './bookings-search-form.component.css'
})

export class BookingsSearchFormComponent {

  constructor(private fb: FormBuilder) { }

  formGroup!: FormGroup;

  @Output() search = new EventEmitter<any>();

  isLoading = input<any>();

  BookingStatusOptions: string[] = [
    'confirmed',
    'cancelled',
  ];

  ngOnInit(): void {
    const currentYear = new Date().getFullYear();
    const firstDay = new Date(currentYear, 0, 1);
    const lastDay = new Date(currentYear, 11, 31);

    this.formGroup = this.fb.group({
      bookingNumber: [''],
      bookingStatus: [],
      dates: [[firstDay, lastDay]],
    });

    this.submit()
  }

  submit() {
    this.search.emit(this.formGroup.value);
  }

}
