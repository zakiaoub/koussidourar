import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewEncapsulation, OnInit } from '@angular/core';
import { AmountComponent } from '@app/shared/components/settings/components/amount/amount.component';
import { CarouselModule } from 'primeng/carousel';
import airlines from '@data/airlines.json'
import { FilterPipe } from '@app/shared/pipes/filter.pipe';
import { TranslationModule } from '@modules/translation.module';
import { ActivatedRoute } from '@angular/router';
import { IconComponent } from "@app/shared/components/widgets/icon/icon.component";
import { Tooltip } from 'primeng/tooltip';
import { Airline } from '@app/core/models/airline.interface';

@Component({
  selector: 'app-flights-calendar',
  imports: [CommonModule, AmountComponent, CarouselModule, FilterPipe, TranslationModule, IconComponent, Tooltip],
  templateUrl: './flights-calendar.component.html',
  styleUrl: './flights-calendar.component.css',
  encapsulation: ViewEncapsulation.None
})

export class FlightsCalendarComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  @Input() data: any;
  @Input() day: any;
  @Input() month: any;
  @Input() year: any;
  @Input() searchToken: any;
  
  @Output() dateChanged = new EventEmitter<{ day: any; month: any; year: any }>();

  airlines:Airline[] = airlines

  selectedDate: string | null = null;

  currentIndex: number = 0;

  dateStripItems: Array<{ key: string; value: any }> = [];

  ngOnInit() {
    this.day = this.route.snapshot.paramMap.get('day');
    this.month = this.route.snapshot.paramMap.get('month');
    this.year = this.route.snapshot.paramMap.get('year');
    this.selectedDate = this.year + '-' + this.month + '-' + this.day
    this.searchToken = this.route.snapshot.paramMap.get('searchToken');

    this.buildDateStrip();
  }

  ngOnChanges() {
    this.buildDateStrip();
  }

  private buildDateStrip() {
    const itemsObj = this.data?.items;
    if (!itemsObj) {
      this.dateStripItems = [];
      return;
    }

    const entries = Object.entries(itemsObj)
      .map(([key, value]) => ({ key, value }))
      .sort((a, b) => new Date(a.key).getTime() - new Date(b.key).getTime());

    if (!entries.length) {
      this.dateStripItems = [];
      return;
    }

    const selected = this.selectedDate;
    const selectedIndex = selected ? entries.findIndex(e => e.key === selected) : -1;

    if (selectedIndex === -1) {
      this.dateStripItems = entries.slice(0, 7);
      return;
    }

    const start = Math.max(0, selectedIndex - 3);
    const end = Math.min(entries.length, start + 7);
    const adjustedStart = Math.max(0, end - 7);
    this.dateStripItems = entries.slice(adjustedStart, end);
  }

  selectDate(dateString: string) {
    this.selectedDate = dateString;
    const date = dateString.split('-');
    const day = date[2];
    const month = date[1]
    const year = date[0];
    window.history.pushState({ "html": '', "pageTitle": '' }, "", ['/flights', 'results', this.searchToken, day, month, year].join('/'));

    this.buildDateStrip();

    setTimeout(() => {
      this.dateChanged.emit({ day, month, year });
    }, 1000);
  }
}
