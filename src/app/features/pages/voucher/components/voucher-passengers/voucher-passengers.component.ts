import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslationModule } from '@modules/translation.module';
@Component({
  selector: 'app-voucher-passengers',
  imports: [TranslationModule,CommonModule],
  templateUrl: './voucher-passengers.component.html',
  styleUrl: './voucher-passengers.component.css'
})
export class VoucherPassengersComponent {
  @Input()data:any
}
