import { Component } from '@angular/core';
import { LogoComponent } from "@app/shared/components/logo/logo.component";
import { CommonModule } from '@angular/common';
import { TranslationModule } from '@app/core/modules/translation.module';
import { IconComponent } from "@app/shared/components/widgets/icon/icon.component";
import { NewsletterComponent } from '@app/shared/components/templates/newsletter/newsletter.component';
import { TooltipModule } from 'primeng/tooltip';
import { environment } from 'environments/environment'

interface FooterData {
  title?: string;
  icon?: string;
  link?: string;
  content?: string;
  img?: string;
}

@Component({
  selector: 'app-footer',
  imports: [LogoComponent, CommonModule, TranslationModule, IconComponent, NewsletterComponent, TooltipModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})

export class Footer {

  currentYear: number = new Date().getFullYear();

  appName: string = environment.NG_APP_NAME

  support: FooterData[] = [
    { title: "need_to_call_us", content: environment.NG_APP_PHONE, img: "headset" },
    { title: "send_us_a_message", content: environment.NG_APP_MAIL, img: "chat-left-text-fill" },
    { title: "our_location", content: environment.NG_APP_ADDRESS, img: "geo-alt-fill" },
  ]

  company: FooterData[] = [
    { title: "about_us", link: "about" },
    { title: "contact_us", link: "contact" },
    { title: "faq", link: "faq" },
    { title: "community_blog", link: "blog" },
  ]

  services: FooterData[] = [
    { title: "suppliers", link: environment.NG_APP_EXTRANET_LINK },
    { title: "tenants", link: "tenants" },
    { title: "affiliates", link: "affiliates" },
  ]
  usefulLinks: FooterData[] = [
    { title: "privacy_policy", link: "policy" },
    { title: "terms", link: "terms" },
    { title: "cookies", link: "cookies" },
  ]

  networks: FooterData[] = [
    {
      icon: "facebook",
      link: environment.NG_APP_FACEBOOK
    },
    {
      icon: "instagram",
      link: environment.NG_APP_INSTAGRAM
    },
    {
      icon: "youtube",
      link: environment.NG_APP_YOUTUBE
    },
    {
      icon: "x",
      link: environment.NG_APP_TWITTER
    },
    {
      icon: "tiktok",
      link: environment.NG_APP_TIKTOK
    }
  ]
}
