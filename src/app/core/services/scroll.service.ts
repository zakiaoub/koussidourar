// scroll.service.ts
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class ScrollService {

    scrollTo(target: string | number) {
        if (typeof target === 'string') {
            const element = document.getElementById(target);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        } else if (typeof target === 'number') {
            window.scrollTo({ top: target, behavior: 'smooth' });
        }
    }

}
