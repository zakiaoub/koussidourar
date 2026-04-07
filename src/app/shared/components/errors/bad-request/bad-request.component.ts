import { Component} from '@angular/core';
import { TranslationModule } from '../../../../core/modules/translation.module';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-bad-request',
    imports: [TranslationModule, CommonModule],
    templateUrl: './bad-request.component.html',
    styleUrl: './bad-request.component.css'
})

export class BadRequestComponent {

}
