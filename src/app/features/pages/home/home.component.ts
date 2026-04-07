import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslationModule } from "@app/core/modules/translation.module";
import { Meta, Title } from "@angular/platform-browser";
import { MainComponent } from "@app/layout/main/main.component";
import { ReasonsComponent } from "./components/reasons/reasons.component";
import { ReferralComponent } from "./components/referral/referral.component";
import { ReviewsComponent } from "./components/reviews/reviews.component";
import { BlogPostsPreviewComponent } from "./components/blog-posts-preview/blog-posts-preview.component";
import { CookiesBannerComponent } from "@app/shared/components/banner/cookies-banner/cookies-banner.component";
import { environment } from 'environments/environment'
import { GoogleAuthService } from "@app/core/services/google.auth.service";
import { AuthService } from "@app/core/services/auth.service";

interface Data {
  label: string;
  caption: string;
  background: string;
  image: string;
  trigger: string;
  href: string;
}

@Component({
  selector: "app-home",
  imports: [
    MainComponent,
    ReasonsComponent,
    ReferralComponent,
    ReviewsComponent,
    CommonModule,
    TranslationModule,
    BlogPostsPreviewComponent,
    CookiesBannerComponent
  ],
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent {
  constructor(private meta: Meta, private title: Title, private googleAuth: GoogleAuthService, private auth: AuthService) { }

  data: Data[] = [
    {
      label: "travelers",
      caption: "travelers_caption",
      background: "lower-bg-gradient",
      image: "assets/images/buyers-img.webp",
      trigger: "signup",
      href: "/signup",
    },
    {
      label: "professionals",
      caption: "sellers_join_caption",
      background: "main-bg-gradient",
      image: "assets/images/sellers-img.webp",
      trigger: "become_seller",
      href: environment.NG_APP_EXTRANET_LINK,
    },
  ];

  ngOnInit(): void {
    this.title.setTitle("Mall of travels, the best platform to book or sell your travels.");
    this.meta.addTags([
      {
        name: "description",
        content:
          "Discover the best travel deals, hotels, flights and all-inclusive holidays worldwide.",
      },
      {
        name: "keywords",
        content:
          "travel, hotel, cheap flight, all-inclusive stay, car rental, vacation, tour",
      },
      { name: "robots", content: "index, follow" },
    ]);

    if (!this.auth.checkAuthentication()) {
      this.googleAuth.init()
    }
  }
}
