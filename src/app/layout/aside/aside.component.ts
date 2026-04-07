import { Component, Input } from '@angular/core';
import { LogoComponent } from "../../shared/components/logo/logo.component";
import { CommonModule } from '@angular/common';
import { TranslationModule } from '../../core/modules/translation.module';
import data from "@assets/json/products.json"
import { AuthService } from '@app/core/services/auth.service';
import { Product } from '@app/core/models/products.interface';
import { Profile } from '@app/core/models/profile.interface';

interface Account {
  label: string;
  href?: string;
  icon: string
}

@Component({
  selector: 'app-aside',
  imports: [LogoComponent, CommonModule, TranslationModule],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.css'
})

export class AsideComponent {

  constructor(
    private auth: AuthService
  ) {}

  @Input()profileData: Profile | null = null;;

  isAuth:boolean

  data:Product[] = data

  icons: string[] = [
    'bi bi-airplane',
    'bi bi-building',
    'bi bi-suitcase',
    'bi bi-car-front',
    'bi bi-bicycle'
  ]

  account:Account[] = [
    { label: 'profile', href: "account", icon: "bi bi-person" },
    { label: 'referrals', href: "account/manage-referrals", icon: "bi bi-gift" },
    { label: 'bookings', href: "account/bookings", icon: "bi bi-calendar2-check" },
    { label: 'logout', icon: "bi bi-box-arrow-in-left" },
  ]

  navigate(href: string): void {
    window.location.href = href
  }

  ngOnInit(): void {
    this.isAuth = this.auth.checkAuthentication()
  }

  logOut(): void {
    this.auth.logout();
  }
}
