import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-skeleton-blog-post',
  imports: [SkeletonModule, CommonModule],
  templateUrl: './skeleton-blog-post.component.html',
  styleUrl: './skeleton-blog-post.component.css'
})
export class SkeletonBlogPostComponent {

}
