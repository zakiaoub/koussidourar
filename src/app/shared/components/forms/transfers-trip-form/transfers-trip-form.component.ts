import { CommonModule } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Field } from '@app/core/models/field.interface';
import { ReqService } from '@app/core/services/req.service';
import { ToastService } from '@app/core/services/toast.service';
import fields from '@assets/fields/trip.json'
import { InputFieldComponent } from '../../fields/input-field/input-field.component';
import { ButtonComponent } from '../../widgets/button/button.component';

@Component({
  selector: 'app-transfers-trip-form',
  imports: [CommonModule, InputFieldComponent, FormsModule, ReactiveFormsModule, ButtonComponent],
  templateUrl: './transfers-trip-form.component.html',
  styleUrl: './transfers-trip-form.component.css'
})

export class TransfersTripFormComponent {

  constructor(private fb: FormBuilder, private api: ReqService, private toast: ToastService) { }

  tripForm!: FormGroup;

  fields: Field[] = fields

  @Input() searchToken: string
  @Input() RateKey: string

  isLoading = signal<Record<string, boolean>>({});

  ngOnInit(): void {
    this.tripForm = this.fb.group({
      departureTripNumber: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(6)]),
      arrivalTripNumber: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(6)])
    });
  }

  onSubmit(RateKey: string) {
    if (this.tripForm.invalid) {
      this.tripForm.markAllAsTouched();
      return;
    }

    this.isLoading.update(prev => ({ ...prev, [RateKey]: true }));

    let travelCode = {
      "0": { "Code": this.tripForm.get('departureTripNumber')?.value },
      "1": { "Code": this.tripForm.get('arrivalTripNumber')?.value },
    };

    const payload = { travelCode };

    this.api.post(['transfer', 'checkrate', this.searchToken, RateKey].join('/'), payload).subscribe({
      next: () => {
        window.location.href = ['/transfers', this.searchToken, RateKey].join('/');
        this.isLoading.update(prev => ({ ...prev, [RateKey]: false }));
      },
      error: () => {
        this.toast.show({ severity: 'error', summary: 'error', detail: 'error_request', life: 3000 });
        this.tripForm.reset()
        this.isLoading.update(prev => ({ ...prev, [RateKey]: false }));
      }
    })
  }
}
