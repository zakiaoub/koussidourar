import { Directive, HostListener, Input } from '@angular/core';
import { ToastService } from '@app/core/services/toast.service';

@Directive({
  selector: '[appCopyText]'
})
export class CopyTextDirective {
  @Input('appCopyText') targetId!: string;

  constructor(private toast: ToastService) { } // <-- injecte le service

  @HostListener('click')

  async onClick() {
    if (!this.targetId) return;

    const element = document.getElementById(this.targetId);

    const textToCopy = element.innerText || element.textContent;
    if (!textToCopy) return;

    try {
      await navigator.clipboard.writeText(textToCopy);
      this.toast.show({ severity: 'success', summary: 'success', detail: 'text_copied', life: 3000 });

    } catch (err) {
      this.toast.show({ severity: 'warn', summary: 'failure', detail: 'unable_to_copy_text', life: 3000 });
    }
  }
}
