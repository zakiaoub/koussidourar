import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslationModule } from '@app/core/modules/translation.module';

@Component({
  selector: 'app-voucher-footer',
  imports: [TranslationModule, CommonModule],
  templateUrl: './voucher-footer.component.html',
  styleUrl: './voucher-footer.component.css'
})
export class VoucherFooterComponent {

  @Input() date: any

}
