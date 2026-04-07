import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationModule } from '@app/core/modules/translation.module';
import { AttractionCardComponent } from "../../templates/attraction-card/attraction-card.component";
import { ReqService } from '@app/core/services/req.service';

@Component({
  selector: 'app-attraction-others',
  imports: [CommonModule, TranslationModule, AttractionCardComponent],
  templateUrl: './attraction-others.component.html',
  styleUrl: './attraction-others.component.css'
})

export class AttractionOthersComponent {

  constructor( private api: ReqService) { }

  @Input() activityCode: string
  @Input() searchToken: string

  data = signal<any>(null)
  isLoading = signal<boolean>(false)
  error = signal<boolean>(false)

  ngOnInit() {
    this.getOtherOptions()
  }

  getOtherOptions() {
    this.isLoading.set(true)

    this.api.get(['activity', 'others', this.searchToken, this.activityCode].join('/')).subscribe({
      next: (response: any) => {
        this.data.set(response?.result?.avails?.slice(0, 6));
        this.isLoading.set(false);
      },
      error: () => {
        this.error.set(true)
        this.isLoading.set(false);
      }
    })
  }
}
