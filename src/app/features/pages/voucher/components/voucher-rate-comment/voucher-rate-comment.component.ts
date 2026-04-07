import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslationModule } from '@modules/translation.module';
@Component({
  selector: 'app-voucher-rate-comment',
  imports: [TranslationModule,CommonModule],
  templateUrl: './voucher-rate-comment.component.html',
  styleUrl: './voucher-rate-comment.component.css'
})
export class VoucherRateCommentComponent {
  @Input()data:any 
}
