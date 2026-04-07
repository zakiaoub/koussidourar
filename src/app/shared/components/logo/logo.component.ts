import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslationModule } from '@app/core/modules/translation.module';
import { ImageModule } from 'primeng/image';

@Component({
    selector: 'app-logo',
    imports: [CommonModule, ImageModule, TranslationModule],
    templateUrl: './logo.component.html',
    styleUrl: './logo.component.css'
})
export class LogoComponent {

    @Input() isWhite:boolean = false
    
    goHome(): void {
        window.location.href = '/'
    }

}
