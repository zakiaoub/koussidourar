import { Component, OnInit, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { SkeletonResultsComponent } from "@app/shared/components/loaders/skeleton-results/skeleton-results.component";
import { FlightsFormFieldsComponent } from "../../templates/flights-form-fields/flights-form-fields.component";
import { FlightFlexComponent } from "../../templates/flight-flex/flight-flex.component";
import { ReqService } from "@app/core/services/req.service";
import { ErrorRequestComponent } from "@app/shared/components/errors/error-request/error-request.component";
import { AppProductAvailsComponent } from "@app/shared/components/templates/app-product-avails/app-product-avails.component";
import { ExpiredRequestComponent } from "@app/shared/components/errors/expired-request/expired-request.component";

@Component({
  selector: "app-flights-results",
  standalone: true,
  imports: [
    CommonModule,
    SkeletonResultsComponent,
    ErrorRequestComponent,
    AppProductAvailsComponent,
    ExpiredRequestComponent
  ],
  templateUrl: "./flights-results.component.html",
  styleUrl: "./flights-results.component.css",
})

export class FlightsResultsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private api: ReqService
  ) { }

  data = signal<any>(null)
  isLoading = signal<boolean>(false)
  error = signal<boolean>(false)

  searchToken: string;
  currentPage: number = 1;
  service: string = "flight";
  serviceApi: string = "flight";
  day: any;
  month: any;
  year: any;

  componentsService: any = {
    componentForm: FlightsFormFieldsComponent,
    flex: FlightFlexComponent,
  };

  ngOnInit(): void {
    this.searchToken = this.route.snapshot.paramMap.get("searchToken");
    this.day = this.route.snapshot.paramMap.get("day");
    this.month = this.route.snapshot.paramMap.get("month");
    this.year = this.route.snapshot.paramMap.get("year");
    this._init();
  }

  _init() {

    this.isLoading.set(true)

    this.api.get([this.serviceApi, "list", this.searchToken, this.day, this.month, this.year, 1].join("/")).subscribe({
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
