import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Tooltip } from 'primeng/tooltip';
import { StopoverPipe } from '@app/shared/pipes/stopover.pipe';
import { TranslationModule } from '@app/core/modules/translation.module';
import { IconComponent } from "@app/shared/components/widgets/icon/icon.component";

@Component({
  selector: 'app-flight-stopovers',
  imports: [CommonModule, Tooltip, StopoverPipe, TranslationModule, IconComponent],
  templateUrl: './flight-stopovers.component.html',
  styleUrl: './flight-stopovers.component.css'
})
export class FlightStopoversComponent {

  @Input() Itinerary:any
  @Input() airportsName:any
  
}
