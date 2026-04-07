import { Component, Input, OnInit, signal } from "@angular/core";
import { CommonModule } from '@angular/common';
import { TranslationModule } from "@app/core/modules/translation.module";
import { PaginatorModule } from 'primeng/paginator';
import { ButtonComponent } from "@app/shared/components/widgets/button/button.component";
import { IconComponent } from "@app/shared/components/widgets/icon/icon.component";
import { ReqService } from "@app/core/services/req.service";
import { NoResultsFoundComponent } from "@app/shared/components/errors/no-results-found/no-results-found.component";
import { ScrollService } from "@app/core/services/scroll.service";
import { ErrorRequestComponent } from "@app/shared/components/errors/error-request/error-request.component";
import { ToastService } from "@app/core/services/toast.service";
import { SkeletonRoomsComponent } from "@app/shared/components/loaders/skeleton-rooms/skeleton-rooms.component";
import { AmountComponent } from "@app/shared/components/settings/components/amount/amount.component";

@Component({
  selector: 'app-hotels-rooms',
  standalone: true,
  imports: [CommonModule, TranslationModule, PaginatorModule, ButtonComponent, IconComponent, AmountComponent, NoResultsFoundComponent, ErrorRequestComponent, SkeletonRoomsComponent],
  templateUrl: './hotels-rooms.component.html',
  styleUrl: './hotels-rooms.component.css'
})

export class HotelsRoomsComponent implements OnInit {

  constructor(private api: ReqService, private scroll: ScrollService, private toast: ToastService) { }

  @Input() id: number;
  @Input() searchToken: string;
  data = signal<Record<string, any[]>>({});
  isLoading = signal<boolean>(false)
  error = signal<boolean>(false)

  isSubmiting = signal<Record<string, boolean>>({});

  rows = signal<number>(10);
  first = signal<number>(0);

  get paginatedRooms() {
    const rooms = Object.entries(this.data()['rooms'] || {});
    const start = this.first();
    const end = start + this.rows();
    return rooms.slice(start, end);
  }

  onPageChange(event: any) {
    this.isLoading.set(true)
    this.first.set(event.first);
    this.rows.set(event.rows);
    this.scroll.scrollTo('rooms-availability');
    setTimeout(() => {
      this.isLoading.set(false)
    }, 2000);
  }

  ngOnInit() {
    this.getRooms()
  }

  getRooms() {
    this.isLoading.set(true)

    this.api.get(['hotel', 'rooms', this.id, this.searchToken].join('/')).subscribe({
      next: (response: any) => {
        this.data.set(response?.result);
        this.isLoading.set(false);
      },
      error: () => {
        this.error.set(true)
        this.isLoading.set(false);
      }
    })
  }

  onSubmit(rateKey: string) {
    this.isSubmiting.update(prev => ({ ...prev, [rateKey]: true }));

    this.api.get(['hotel', 'checkrate', this.id, this.searchToken, rateKey].join('/')).subscribe({
      next: () => {
        this.isSubmiting.update(prev => ({ ...prev, [rateKey]: false }));
        window.location.href = ['hotels', this.data()['hotel']['id'], 'checkout', this.data()['hotel']['country_code'], this.searchToken, this.data()['hotel']['id'], rateKey].join('/');
      },
      error: () => {
        this.toast.show({ severity: 'error', summary: 'we_are_sorry', detail: 'rooms_not_saved', life: 3000 });
        this.isSubmiting.update(prev => ({ ...prev, [rateKey]: false }));
      }
    })
  }
}
