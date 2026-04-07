import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslationModule } from '@app/core/modules/translation.module';
import { TopBannerComponent } from '@app/shared/components/banner/top-banner/top-banner.component';
import { ImagesCarouselComponent } from '@app/shared/components/templates/images-carousel/images-carousel.component';
import { ProductDescriptionComponent } from '@app/shared/components/templates/product-description/product-description.component';
import posts from '@assets/mock-data/blog.json'
import { ProductAmentiesComponent } from '@app/shared/components/templates/product-amenties/product-amenties.component';
import { getTag } from '@app/core/utils/get-blog-tag.util';
import { IconComponent } from '@app/shared/components/widgets/icon/icon.component';
import { BlogPostRecapComponent } from '../../components/blog-post-recap/blog-post-recap.component';

@Component({
  selector: 'app-blog-details',
  imports: [CommonModule, TranslationModule, TopBannerComponent, ImagesCarouselComponent, ProductDescriptionComponent, BlogPostRecapComponent, ProductAmentiesComponent, IconComponent],
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.css'
})

export class BlogDetailsComponent {

  constructor(private route: ActivatedRoute) { }

  data = signal<any>(null)

  getTag = getTag

  ngOnInit() {
    let id = Number(this.route.snapshot.paramMap.get('id'));

    this.data.set(posts.find(
      item => item.id === id
    ));
  }

}
