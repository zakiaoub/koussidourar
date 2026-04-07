import { Component, Input, ViewEncapsulation } from '@angular/core';
import { TranslationModule } from '../../core/modules/translation.module';
import { CommonModule } from '@angular/common';
import { BadgeModule } from 'primeng/badge';
import data from "@assets/json/products.json"
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { IconComponent } from "@app/shared/components/widgets/icon/icon.component";
import { Product } from '@app/core/models/products.interface';
import { UrlService } from '@app/core/services/url.service';

@Component({
    selector: 'app-nav',
    imports: [TranslationModule, CommonModule, BadgeModule, TooltipModule, DialogModule, IconComponent],
    templateUrl: './nav.component.html',
    styleUrl: './nav.component.css',
    encapsulation: ViewEncapsulation.None
})

export class NavComponent {

    currentUrl!: string;

    constructor(private urlService: UrlService) {}
  
    ngOnInit(): void {
      this.urlService.currentUrl$.subscribe(url => {
        this.currentUrl = url;
      });
    }

    data: Product[] = data
    visible: boolean = false;

    showDialog(): void {
        this.visible = true;
    }

    navigate(href: string): void {
        window.location.href = href
    }


}
