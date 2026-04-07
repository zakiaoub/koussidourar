import { Component, OnInit, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { SkeletonResultsComponent } from "@app/shared/components/loaders/skeleton-results/skeleton-results.component";
import { HotelCardComponent } from "../../templates/hotel-card/hotel-card.component";
import { HotelFlexComponent } from "../../templates/hotel-flex/flex-hotel.component";
import { HotelsSearchFormComponent } from "@app/shared/components/forms/hotels-search-form/hotels-search-form.component";
import { ReqService } from "@app/core/services/req.service";
import { ErrorRequestComponent } from "@app/shared/components/errors/error-request/error-request.component";
import { AppProductAvailsComponent } from "@app/shared/components/templates/app-product-avails/app-product-avails.component";
import { ExpiredRequestComponent } from "@app/shared/components/errors/expired-request/expired-request.component";

@Component({
  selector: "app-hotels-results",
  standalone: true,
  imports: [
    CommonModule,
    SkeletonResultsComponent,
    ErrorRequestComponent,
    AppProductAvailsComponent,
    ExpiredRequestComponent
  ],
  templateUrl: "./hotels-results.component.html",
  styleUrls: ["./hotels-results.component.css"],
})

export class HotelsResultsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private api: ReqService
  ) { }

  data = signal<any>(null)
  isLoading = signal<boolean>(false)
  error = signal<boolean>(false)

  searchToken: string;
  service: string = "hotel";
  serviceApi: string = "hotel";

  componentsService: any = {
    componentForm: HotelsSearchFormComponent,
    grid: HotelCardComponent,
    top: HotelCardComponent,
    flex: HotelFlexComponent,
  };

  ngOnInit(): void {
    this.searchToken = this.route.snapshot.paramMap.get("searchToken");
    this._init();
  }

  _init() {

    this.isLoading.set(true)

    this.api.get([this.serviceApi, "list", this.searchToken, 1].join("/")).subscribe({
      next: (response: any) => {
        this.data.set(response?.result);
        localStorage.setItem("exchangeRate", response?.result?.exchangeRate);
        this.isLoading.set(false);
      },
      error: () => {
        this.error.set(true)
        this.isLoading.set(false);
      }
    })
  }
}
