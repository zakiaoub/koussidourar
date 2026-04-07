import { Component, Input } from '@angular/core';
import { TranslationModule } from '@app/core/modules/translation.module';
import { CommonModule } from '@angular/common';
import { ImgComponent } from '@app/shared/components/widgets/img/img.component';
import { getTag } from '@app/core/utils/get-blog-tag.util';
import { IconComponent } from '@app/shared/components/widgets/icon/icon.component';

@Component({
  selector: 'app-blog-post',
  imports: [TranslationModule, CommonModule, ImgComponent, IconComponent],
  templateUrl: './blog-post.component.html',
  styleUrl: './blog-post.component.css'
})

export class BlogPostComponent {

  @Input() _id: number
  @Input() title: string
  @Input() image: string
  @Input() created_at: Date
  @Input() category: string

  getTag = getTag
}
