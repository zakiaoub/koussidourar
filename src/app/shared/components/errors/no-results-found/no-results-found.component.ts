import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslationModule } from '@app/core/modules/translation.module';

@Component({
  selector: 'app-no-results-found',
  imports: [CommonModule, TranslationModule],
  templateUrl: './no-results-found.component.html',
  styleUrl: './no-results-found.component.css'
})
export class NoResultsFoundComponent {

  @Input() isImage: boolean = true
  @Input() isCaption: boolean = true
  @Input() class = 'col-8 col-sm-6 col-lg-4 col-xl-3'

}
