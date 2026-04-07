import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslationModule } from '@app/core/modules/translation.module';

@Component({
  selector: 'app-line-switch',
  imports: [CommonModule, TranslationModule],
  templateUrl: './line-switch.component.html',
  styleUrl: './line-switch.component.css'
})

export class LineSwitchComponent {

  @Input() activeLine: 'DEPARTURE' | 'RETURN' = 'DEPARTURE';
  @Output() activeLineChange = new EventEmitter<'DEPARTURE' | 'RETURN'>();

  setLine(line: 'DEPARTURE' | 'RETURN') {
    this.activeLine = line;
    this.activeLineChange.emit(this.activeLine);
  }

}
