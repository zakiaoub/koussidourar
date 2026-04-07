import { Component ,Input} from '@angular/core';
import { TranslationModule } from '@app/core/modules/translation.module';

@Component({
    selector: 'app-no-results',
    imports: [TranslationModule],
    templateUrl: './no-results.component.html',
    styleUrl: './no-results.component.css'
})
export class NoResultsComponent {


    @Input() text?:string = 'no_results_found_caption'

      ngOnInit(): void {
           
      }
}
