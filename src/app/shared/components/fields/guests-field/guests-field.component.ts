import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IconComponent } from '@app/shared/components/widgets/icon/icon.component';
import { TranslationModule } from '@app/core/modules/translation.module';
import { SessionService } from '@app/core/services/session.service';
import countries from '@assets/json/countries.json'
import { DialogModule } from 'primeng/dialog';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { environment } from 'environments/environment'

@Component({
  selector: 'app-guests-field',
  imports: [CommonModule, TranslationModule, IconComponent, SelectModule, DialogModule, FormsModule, IftaLabelModule, InputTextModule],
  templateUrl: './guests-field.component.html',
  styleUrl: './guests-field.component.css'
})
export class GuestsFieldComponent {

  constructor(private sessionService: SessionService) {
    this.currentLang = this.sessionService.getSession()?.lang
  }

  countries = countries
  currentLang: string = environment.NG_APP_LANG

  @Input() nationality: string;
  @Input() data: Array<{ name: string; caption: string; value: number; min: number; max: number; ages?: number[] }> = [];
  @Output() nationalityChange = new EventEmitter<string>();

  @Input() visible: boolean = false;

  increment(index: number): void {
    this.data[index].value++;
    if (this.data[index].name === 'childs') {
      this.data[index].ages.push(1);
    }
  }

  decrement(index: number): void {
    if (this.data[index].value > this.data[index].min) {
      this.data[index].value--;
      if (this.data[index].name === 'childs') {
        this.data[index].ages.pop();
      }
    }
  }

  onNationalityChange(newNationality: string) {
    this.nationality = newNationality;
    this.nationalityChange.emit(this.nationality);
  }

  showDialog() {
    this.visible = true;
  }

  closeDialog() {
    this.visible = false;
  }

  getTotal(): number {
    return this.data.reduce((total, item) => total + item.value, 0);
  }

}
