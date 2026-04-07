import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TranslationModule } from '@app/core/modules/translation.module';
import { CarousleService } from '@app/core/services/carousel-service.service';
import { SessionService } from '@app/core/services/session.service';
import { Avatar } from 'primeng/avatar';
import { AvatarGroup } from 'primeng/avatargroup';
import { CommonModule } from '@angular/common';
import { IconComponent } from "@app/shared/components/widgets/icon/icon.component";
import { RandomItemsPipe } from '@app/shared/pipes/random-items.pipe';

interface ReviewItem {
  id: number;
  name: string;
  title: string;
  image: string;
  review: {
    fr: string;
    en: string;
    es: string;
  };
}

@Component({
  selector: 'app-reviews',
  imports: [TranslationModule, Avatar, AvatarGroup, CommonModule, RandomItemsPipe, IconComponent],
  providers: [CarousleService],
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ReviewsComponent implements OnInit {

  constructor(private sessionService: SessionService) { }

  lang: string

  avatars: string[] = [
    "https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png",
    "https://primefaces.org/cdn/primeng/images/demo/avatar/asiyajavayant.png",
    "https://primefaces.org/cdn/primeng/images/demo/avatar/onyamalimba.png",
    "https://primefaces.org/cdn/primeng/images/demo/avatar/ionibowcher.png",
    "https://primefaces.org/cdn/primeng/images/demo/avatar/xuxuefeng.png"
  ]

  reviews: ReviewItem[] = [
    {
      id: 1,
      name: 'John smith',
      title: 'buyer',
      image: 'https://mannatthemes.com/rizz/default/assets/images/users/avatar-3.jpg',
      review: {
        fr: "Excellent service. En quelques minutes, notre voyage familial  est organisé au moindre coût. C’est juste génial !",
        en: "Excellent service. Our family trip was organized in just a few minutes at the lowest cost. It's just fantastic!",
        es: "Excelente servicio. Nuestro viaje familiar se organizó en tan solo unos minutos al menor coste. ¡Es simplemente fantástico!"

      }
    },
    {
      id: 2,
      name: 'Jennie Nichols',
      title: 'seller',
      image: 'https://mannatthemes.com/rizz/default/assets/images/users/avatar-2.jpg',
      review: {
        fr: "Un boost incroyable pour mes produits de voyage. Je suis très contente pourvu que ça continue.",
        en: "An incredible boost for my travel products. I'm very happy, let's hope it continues.",
        es: "Un impulso increíble para mis productos de viaje. Estoy muy feliz mientras continúe."

      }
    },
    {
      id: 3,
      name: 'Nick simons',
      title: 'tenant',
      image: 'https://mannatthemes.com/rizz/default/assets/images/users/avatar-6.jpg',
      review: {
        fr: "Une augmentation palpable de notre visibilité ! Depuis qu’on est dans le Mall, on est de plus en plus sollicité ! ",
        en: "A tangible increase in our visibility! Since we've been in the Mall, we've been getting more and more in demand !",
        es: "¡Un aumento palpable en nuestra visibilidad! Desde que estamos en el centro comercial, ¡tenemos cada vez más demanda!"
      }
    }
  ]

  ngOnInit() {
    this.lang = this.sessionService.getSession()?.lang
  }
}

