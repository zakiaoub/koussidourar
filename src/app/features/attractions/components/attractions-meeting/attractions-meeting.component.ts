import { Component, Input } from '@angular/core';
import { TranslationModule } from '@app/core/modules/translation.module';

@Component({
    selector: 'app-attractions-meeting',
    imports: [TranslationModule],
    templateUrl: './attractions-meeting.component.html',
    styleUrl: './attractions-meeting.component.css'
})
export class AttractionsMeetingComponent {

  @Input() data: any

}
