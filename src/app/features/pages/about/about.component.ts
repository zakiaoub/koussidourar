import { Component } from '@angular/core';
import { ReviewsComponent } from '../home/components/reviews/reviews.component';
import { CommonModule } from '@angular/common';
import { IconComponent } from "@app/shared/components/widgets/icon/icon.component";
import { TopBannerComponent } from '@app/shared/components/banner/top-banner/top-banner.component';
import { TranslationModule } from '@app/core/modules/translation.module';

interface Data {
    title: string;
    caption: string;
    img: string;
}

@Component({
    selector: 'app-about',
    imports: [TopBannerComponent, TranslationModule, ReviewsComponent, CommonModule, IconComponent],
    templateUrl: './about.component.html',
    styleUrl: './about.component.css'
})
export class AboutComponent {

    data: Data[] = [
        { title: "lodgings", caption: "about_lodgings_caption", img: "hotels-ico" },
        { title: "transports", caption: "about_transports_caption", img: "flights-ico" },
        { title: "activities", caption: "about_activities_caption", img: "attractions-ico" },
        { title: "_packages", caption: "_packages_caption", img: "packages-ico" },
        { title: "and_way_more", caption: "and_way_more_caption", img: "luxury_travel-ico" },
    ]

}
