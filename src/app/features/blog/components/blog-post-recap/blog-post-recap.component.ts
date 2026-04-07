import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { TranslationModule } from '@app/core/modules/translation.module';
import { IconComponent } from '@app/shared/components/widgets/icon/icon.component';

@Component({
  selector: 'app-blog-post-recap',
  imports: [CommonModule, TranslationModule, IconComponent],
  templateUrl: './blog-post-recap.component.html',
  styleUrl: './blog-post-recap.component.css'
})
export class BlogPostRecapComponent {

  duration = input<string>(null)
  created_at = input<string>(null)
}
