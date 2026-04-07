
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslationModule } from '@app/core/modules/translation.module'; 

@Component({
   selector: 'app-product-rate-comment',
  imports: [CommonModule, TranslationModule],
  templateUrl: './product-rate-comment.component.html',
  styleUrl: './product-rate-comment.component.css'
})
export class ProductRateCommentComponent {
  @Input() data: any
 @Input() title: string
  @Input() stringReplace?: string=null
}
