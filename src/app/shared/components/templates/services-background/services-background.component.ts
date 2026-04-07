import { Component, Input, TemplateRef } from '@angular/core';
import { TranslationModule } from '@app/core/modules/translation.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-services-background',
  imports: [TranslationModule, CommonModule],
  templateUrl: './services-background.component.html',
  styleUrl: './services-background.component.css'
})

export class ServicesBackgroundComponent {

  @Input() service: string;
  @Input() title: string;
  @Input() caption: string;
  @Input() demo: string;
  @Input() signup: string;
  @Input() data: any;
  @Input() image: TemplateRef<any>;
  @Input() class: string;
}
