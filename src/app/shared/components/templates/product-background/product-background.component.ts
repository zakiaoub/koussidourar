import { Component, Input, TemplateRef } from '@angular/core';
import { TranslationModule } from '../../../../core/modules/translation.module';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-product-background',
  imports: [TranslationModule, CommonModule],
  templateUrl: './product-background.component.html',
  styleUrl: './product-background.component.css',
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('800ms ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('800ms ease-out', style({ opacity: 0 }))
      ])
    ])
  ]
})

export class ProductBackgroundComponent {

  @Input() images: string[] = []

  @Input() template: TemplateRef<any>;
  @Input() title: string
  @Input() caption: string
  @Input() class: string
  @Input() service: string
  @Input() background: string

  currentIndex = 0;
  intervalId!: any;

  ngOnInit() {
    this.intervalId = setInterval(() => {
      this.currentIndex =
        (this.currentIndex + 1) % this.images.length;
    }, 6000);
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
}
