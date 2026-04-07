import { Component } from '@angular/core';
import { TranslationModule } from '@modules/translation.module';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { AuthService } from '@app/core/services/auth.service';
import { environment } from 'environments/environment'
import { FlightsFormFieldsComponent } from '@features/flights/templates/flights-form-fields/flights-form-fields.component';
import { HotelsSearchFormComponent } from '@app/shared/components/forms/hotels-search-form/hotels-search-form.component';
import { AttractionsSearchFormComponent } from '@app/shared/components/forms/attractions-search-form/attractions-search-form.component';
import { TransfersFormFieldsComponent } from '@features/transfers/templates/transfers-form-fields/transfers-form-fields.component';

/**
 * Ancien hero = carrousel Bootstrap + images dans assets/images/ :
 *   home-bg-1.webp, home-bg-2.webp, home-bg-3.webp, home-bg-4.webp, home-bg-5.webp
 * + couche .hero-main__scrim (rgba(0,0,0,0.5)) + zoom CSS sur les slides.
 * Pour restaurer : réimporter CarouselModule (primeng), remettre le HTML carrousel (voir git history).
 */

@Component({
  selector: 'app-main',
  imports: [TranslationModule, CommonModule, DialogModule, FlightsFormFieldsComponent, HotelsSearchFormComponent, AttractionsSearchFormComponent, TransfersFormFieldsComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})

export class MainComponent {

  constructor(
    private auth: AuthService
  ) { }

  extranetHref: string = environment.NG_APP_EXTRANET_LINK

  activeService: 'flights' | 'hotels' | 'attractions' | 'transfers' = 'flights';

  setActiveService(service: 'flights' | 'hotels' | 'attractions' | 'transfers') {
    this.activeService = service;
  }

  isAuth: boolean

  ngOnInit(): void {
    this.isAuth = this.auth.checkAuthentication()
  }
}
