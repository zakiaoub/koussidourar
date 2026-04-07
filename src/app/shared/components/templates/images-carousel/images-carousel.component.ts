import { Component, HostListener, Input } from '@angular/core';
import { GalleriaModule } from 'primeng/galleria';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ViewEncapsulation } from '@angular/core';
import { IconComponent } from "@app/shared/components/widgets/icon/icon.component";
import { TranslationModule } from '@app/core/modules/translation.module';

@Component({
  selector: 'app-images-carousel',
  imports: [TranslationModule, ButtonModule, GalleriaModule, FormsModule, CommonModule, IconComponent],
  templateUrl: './images-carousel.component.html',
  styleUrl: './images-carousel.component.css',
  encapsulation: ViewEncapsulation.None
})

export class ImagesCarouselComponent {

  @Input() data: any

  displayBasic: boolean | undefined;

  @HostListener('window:keydown', ['$event'])
  onKeydownHandler(event: Event) {
    const keyboardEvent = event as KeyboardEvent;
    if (keyboardEvent.key === 'Escape' && this.displayBasic) {
      this.displayBasic = false;
    }
  }



}
