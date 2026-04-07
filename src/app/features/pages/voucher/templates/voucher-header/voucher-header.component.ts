import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslationModule } from '@modules/translation.module';
import { LogoComponent } from "@app/shared/components/logo/logo.component";
 
@Component({
  selector: 'app-voucher-header',
  imports: [CommonModule, TranslationModule, LogoComponent],
  templateUrl: './voucher-header.component.html',
  styleUrl: './voucher-header.component.css'
})
export class VoucherHeaderComponent {

  @Input() data:any 
}
