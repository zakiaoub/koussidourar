import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { TranslationModule } from '@app/core/modules/translation.module';
import { parseDate } from '@app/core/utils/parseDate.util';
import { RandomItemsPipe } from '@app/shared/pipes/random-items.pipe';
import posts from '@assets/mock-data/blog.json'
import { BlogPostComponent } from "@app/features/blog/components/blog-post/blog-post.component";

@Component({
  selector: 'app-blog-posts-preview',
  imports: [CommonModule, TranslationModule, RandomItemsPipe, BlogPostComponent],
  templateUrl: './blog-posts-preview.component.html',
  styleUrl: './blog-posts-preview.component.css'
})
export class BlogPostsPreviewComponent {

  posts = signal<any>(posts)
  parseDate = parseDate
}
