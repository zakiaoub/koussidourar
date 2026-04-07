import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TranslationService } from './translation.service';
import { Toast } from '../models/toast.interface';

@Injectable({ providedIn: 'root' })

export class ToastService {
  private toastTrigger = new Subject<Toast>();
  toastTriggered$ = this.toastTrigger.asObservable();

  constructor(private translationService: TranslationService) { }

  show(message: Toast) {
    this.toastTrigger.next({
      ...message,
      summary: this.translationService.getTranslation(message.summary),
      detail: this.translationService.getTranslation(message.detail),
    });
  }
}
