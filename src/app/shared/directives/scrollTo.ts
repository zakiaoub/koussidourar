import { Directive, HostListener, Input } from '@angular/core';
import { ScrollService } from '@app/core/services/scroll.service';

@Directive({
  selector: '[appScrollTo]'
})
export class ScrollToDirective {
  @Input('appScrollTo') target!: string | number;

  constructor(private scrollService: ScrollService) {}

  @HostListener('click')
  onClick() {
    this.scrollService.scrollTo(this.target);
  }
}
