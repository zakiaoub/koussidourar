import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { Skeleton } from "primeng/skeleton";
import { TranslationModule } from "@app/core/modules/translation.module";

@Component({
  selector: "app-skeleton-booking",
  imports: [CommonModule, Skeleton, TranslationModule],
  templateUrl: "./skeleton-booking.component.html",
  styleUrl: "./skeleton-booking.component.css",
})

export class SkeletonBookingComponent { }
