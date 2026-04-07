import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationModule } from '@modules/translation.module';
import { AccordionModule } from 'primeng/accordion';
import { SessionService } from '@app/core/services/session.service';
import { IconComponent } from "@app/shared/components/widgets/icon/icon.component";
import { RandomItemsPipe } from '@app/shared/pipes/random-items.pipe';
import { SkeletonFaqComponent } from '@app/shared/components/loaders/skeleton-faq/skeleton-faq.component';
import { ReqService } from '@app/core/services/req.service';
@Component({
  selector: 'app-faq-display',
  standalone: true,
  imports: [AccordionModule, CommonModule, TranslationModule, IconComponent, RandomItemsPipe, SkeletonFaqComponent],
  templateUrl: './faq-display.component.html',
  styleUrl: './faq-display.component.css'
})

export class FaqDisplayComponent {

  constructor(private sessionService: SessionService, private api: ReqService) {
    this.currentLang = this.sessionService.getSession().lang;
  }

  @Input() service?: string | null;

  data = signal<any>(null)
  isLoading = signal<boolean>(false)
  error = signal<boolean>(false)

  currentLang: string;

  ngOnInit(): void {
    this.getFaqData();
  }

  getFaqData() {
    this.isLoading.set(true)
    this.api.get(['faq'].join('/'), []).subscribe({
      next: (response: any) => {
        this.data.set(response?.result)
        this.isLoading.set(false)
      },
      error: () => {
        this.isLoading.set(false)
        this.error.set(true)
      }
    })
  }
}
