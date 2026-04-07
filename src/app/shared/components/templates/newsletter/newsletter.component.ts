import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationModule } from '@modules/translation.module';
import { NewsletterFormComponent } from "../../forms/newsletter-form/newsletter-form.component";

@Component({
  selector: 'app-newsletter',
  standalone: true,
  imports: [
    CommonModule,
    TranslationModule,
    NewsletterFormComponent
  ],
  templateUrl: './newsletter.component.html',
  styleUrl: './newsletter.component.css'
})

export class NewsletterComponent {

}
