import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionModule } from 'primeng/accordion';
import { TranslationModule } from '../../../../core/modules/translation.module';

@Component({
  selector: 'app-product-destinations',
  imports: [CommonModule, AccordionModule, TranslationModule],
  templateUrl: './product-destinations.component.html',
  styleUrl: './product-destinations.component.css',
  encapsulation: ViewEncapsulation.None
})

export class ProductDestinationsComponent {

  @Input() data: any
  @Input() multiple: boolean = false

}
