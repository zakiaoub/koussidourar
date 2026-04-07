import { Component } from '@angular/core';
import { TranslationModule } from '@modules/translation.module';
import { NewsletterFormComponent } from '../../forms/newsletter-form/newsletter-form.component';

@Component({
    selector: 'app-coming-soon',
    imports: [TranslationModule, NewsletterFormComponent],
    templateUrl: './coming-soon.component.html',
    styleUrl: './coming-soon.component.css'
})
export class ComingSoonComponent {

}
