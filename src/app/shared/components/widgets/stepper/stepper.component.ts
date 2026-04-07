import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslationModule } from '@app/core/modules/translation.module';
import { StepperModule } from 'primeng/stepper';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-stepper',
  imports: [StepperModule, CommonModule, TranslationModule],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.css',
  providers: [DialogService]
})

export class StepperComponent {

  @Input() currentStep = 1
  @Input() linear: boolean = true;

  steps = [
    'your_selection', 'details', 'traveler_information', 'review_your_booking'
  ]
}
