import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IconComponent } from '@app/shared/components/widgets/icon/icon.component';
import { TranslationModule } from '@app/core/modules/translation.module';
import { SessionService } from '@app/core/services/session.service';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DialogModule } from 'primeng/dialog';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import countries from '@assets/json/countries.json'
import { environment } from 'environments/environment'

@Component({
  selector: 'app-rooms-field',
  imports: [CommonModule, DialogModule, TranslationModule, FormsModule, InputTextModule, IftaLabelModule, AutoCompleteModule, IconComponent, SelectModule],
  templateUrl: './rooms-field.component.html',
  styleUrl: './rooms-field.component.css'
})
export class RoomsFieldComponent {

  constructor(private sessionService: SessionService) {
    this.currentLang = this.sessionService.getSession()?.lang
  }

  countries = countries
  currentLang: string = environment.NG_APP_LANG

  @Input() visible: boolean = false;
  @Input() nationality: string;
  @Input() rooms: Array<{ adult: number; child: number; childAge: any[] }>;
  @Output() roomsChange = new EventEmitter<any[]>();

  @Output() nationalityChange = new EventEmitter<string>();


  OnRoomsChange() {
    this.roomsChange.emit(this.rooms);
  }

  onNationalityChange(newNationality: string) {
    this.nationality = newNationality;
    this.nationalityChange.emit(this.nationality);
  }

  addRoom() {
    this.rooms.push({
      adult: 1,
      child: 0,
      childAge: []
    });
    this.OnRoomsChange();
  }

  removeRoom(index: number) {
    if (this.rooms.length > 1) {
      this.rooms.splice(index, 1);
    }
    this.OnRoomsChange();
  }

  incrementAdults(room: any) {
    room.adult++;
    this.OnRoomsChange();
  }

  decrementAdults(room: any) {
    room.adult--;
    this.OnRoomsChange();
  }

  incrementChilds(room: any) {
    room.child++;
    room.childAge.push(1);
    this.OnRoomsChange();
  }

  decrementChilds(room: any) {
    room.child--;
    room.childAge.pop();
    this.OnRoomsChange();
  }

  showDialog() {
    this.visible = true;
  }

  closeDialog() {
    this.visible = false;
  }

  get totalRooms(): number {
    return this.rooms?.length || 0;
  }

  get totalGuests(): number {
    return this.rooms?.reduce((total, room) => total + room.adult + room.child, 0) || 0;
  }

}
