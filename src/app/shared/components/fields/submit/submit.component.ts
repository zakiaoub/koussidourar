import { Component, Input } from '@angular/core';
import { TranslationModule } from '../../../../core/modules/translation.module';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SpinnerComponent } from "../../loaders/spinner/spinner.component";
import { IconComponent } from "@app/shared/components/widgets/icon/icon.component";

@Component({
  selector: 'app-submit',
  imports: [TranslationModule, CommonModule, ProgressSpinnerModule, SpinnerComponent, IconComponent],
  templateUrl: './submit.component.html',
  styleUrl: './submit.component.css'
})

export class SubmitComponent {

  @Input() isLoading: boolean = false
  @Input() disabled: any
}
