import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslationModule } from '@modules/translation.module';
import airlines from '@data/airlines.json'
import { FilterPipe } from '@app/shared/pipes/filter.pipe';
import { AmountComponent } from '@app/shared/components/settings/components/amount/amount.component';
import { CityImageComponent } from '@app/shared/components/widgets/city-image/city-image.component';
import { Tooltip } from 'primeng/tooltip';
import { StopoverPipe } from '@app/shared/pipes/stopover.pipe';
import { BookingClassPipe } from '@app/shared/pipes/bookingClass.pipe';
import { FormDataService } from '@app/core/services/form-data.service';
import { CheckoutSummaryComponent } from '@app/shared/components/templates/checkout-summary/checkout-summary.component';
import { IconComponent } from "@app/shared/components/widgets/icon/icon.component";
import { Airline } from '@app/core/models/airline.interface';

@Component({
  selector: 'app-checkout-flight-recap',
  imports: [CommonModule, TranslationModule, CheckoutSummaryComponent, AmountComponent, CityImageComponent, FilterPipe, Tooltip, StopoverPipe, BookingClassPipe, IconComponent],
  templateUrl: './checkout-flight-recap.component.html',
  styleUrls: ['./checkout-flight-recap.component.css']
})

export class CheckoutFlightRecapComponent {

  constructor(private formDataService: FormDataService) { }

  airlines: Airline[] = airlines

  @Input() data: any
  @Input() params: any

  ngOnInit(): void {
    this.params = this.formDataService.getData('flightParams').dataPost
  }
}
