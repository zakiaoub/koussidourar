import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { TopBannerComponent } from '@app/shared/components/banner/top-banner/top-banner.component';
import { HttpClient } from '@angular/common/http';
import { finalize } from 'rxjs';
import { BlogPostComponent } from "../../components/blog-post/blog-post.component";
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { IconComponent } from '@app/shared/components/widgets/icon/icon.component';
import { getTag } from '@app/core/utils/get-blog-tag.util';
import { TranslationModule } from '@app/core/modules/translation.module';
import { ErrorRequestComponent } from '@app/shared/components/errors/error-request/error-request.component';
import { SkeletonBlogPostComponent } from '@app/shared/components/loaders/skeleton-blog-post/skeleton-blog-post.component';

@Component({
  selector: 'app-blog-overview',
  imports: [CommonModule, TranslationModule, TopBannerComponent, BlogPostComponent, FormsModule, InputTextModule, SelectModule, IconComponent, ErrorRequestComponent, SkeletonBlogPostComponent],
  templateUrl: './blog-overview.component.html',
  styleUrl: './blog-overview.component.css'
})

export class BlogOverviewComponent {

  constructor(private http: HttpClient) { }

  data = signal<any[]>([])
  isLoading = signal<boolean>(false)
  error = signal<boolean>(false)

  selectedCategory = signal<string>(null)
  searchName = signal<string>('')

  getTag = getTag

  categories = computed(() => {
    const posts = this.data()
    const unique = [...new Set(posts.map(p => p.category))]
    return unique
  })

  filteredPosts = computed(() => {
    return this.data().filter(post => {

      const matchCategory =
        !this.selectedCategory() ||
        post.category === this.selectedCategory()

      const matchName =
        post.title?.toLowerCase()
          .includes(this.searchName().toLowerCase())

      return matchCategory && matchName
    })
  })

  ngOnInit(): void {
    this.getPost()
  }

  getPost() {
    this.isLoading.set(true);

    this.http.get<any[]>('assets/mock-data/blog.json')
      .pipe(
        finalize(() => this.isLoading.set(false))
      )
      .subscribe({
        next: (data) => this.data.set(data),
        error: () => this.error.set(true)
      });
  }
}
