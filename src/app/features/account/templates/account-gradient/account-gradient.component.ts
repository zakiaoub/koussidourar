import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LogoComponent } from "@app/shared/components/logo/logo.component";

@Component({
  selector: 'app-account-gradient',
  imports: [CommonModule, LogoComponent],
  templateUrl: './account-gradient.component.html',
  styleUrl: './account-gradient.component.css'
})
export class AccountGradientComponent {

}
