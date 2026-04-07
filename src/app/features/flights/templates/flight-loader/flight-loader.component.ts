import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Skeleton } from 'primeng/skeleton';

@Component({
  selector: 'app-flight-loader',
  imports: [Skeleton, CommonModule],
  templateUrl: './flight-loader.component.html',
  styleUrl: './flight-loader.component.css'
})
export class FlightLoaderComponent {

}
