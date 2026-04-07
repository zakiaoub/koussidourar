import { Component, Input } from '@angular/core';
import { TranslationModule } from '../../../core/modules/translation.module';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-choice-reasons',
    imports: [TranslationModule, CommonModule],
    templateUrl: './choice-reasons.component.html',
    styleUrl: './choice-reasons.component.css'
})
export class ChoiceReasonsComponent {

  @Input() data: any;
  @Input() href: any;
}
