import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslationModule } from '../../../../core/modules/translation.module';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ToastService } from '../../../../core/services/toast.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule, TranslationModule, ToastModule],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
  providers: [MessageService]
})

export class ToastComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(
    private messageService: MessageService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.toastService.toastTriggered$
      .pipe(takeUntil(this.destroy$))
      .subscribe(toast => {
        this.messageService.add(toast);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
