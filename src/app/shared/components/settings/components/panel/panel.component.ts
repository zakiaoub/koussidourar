import { Component, Input, signal } from '@angular/core';
import { SettingsComponent } from '@app/shared/components/settings/settings.component';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { TranslationModule } from '../../../../../core/modules/translation.module';
import { CommonModule } from '@angular/common';
import { SidebarModule } from 'primeng/sidebar';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { IconComponent } from "../../../widgets/icon/icon.component";
import { AuthService } from '@app/core/services/auth.service';
import { TooltipModule } from 'primeng/tooltip';
import { SpinnerComponent } from '@app/shared/components/loaders/spinner/spinner.component';
import { CartService } from '@app/core/services/cart.service';
import { CartComponent } from "@app/features/pages/cart/cart.component";
import { SkeletonCartComponent } from "@app/shared/components/loaders/skeleton-cart/skeleton-cart.component";
import { CartFormComponent } from "@app/shared/components/forms/cart-form/cart-form.component";
import { AmountComponent } from '../amount/amount.component';

interface Items {
  label: string;
  route?: string;
  icon: string;
}

@Component({
  selector: 'app-panel',
  imports: [SettingsComponent, TieredMenuModule, TranslationModule, CommonModule, SidebarModule, OverlayBadgeModule, IconComponent, TooltipModule, SpinnerComponent, CartComponent, SkeletonCartComponent, CartFormComponent, AmountComponent],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.css'
})

export class PanelComponent {

  constructor(
    private auth: AuthService,
    public cart: CartService
  ) { }

  @Input() fullName: string;

  cartLength = signal<number>(0)
  isLoading = signal<boolean>(false)
  error = signal<boolean>(false)

  visible: boolean = false;
  isAuth: boolean

  items: Items[] = [
    { label: 'profile', route: "account", icon: "person" },
    { label: 'referrals', route: "referrals", icon: "gift" },
    { label: 'bookings', route: "bookings", icon: "calendar2-check" },
    { label: 'logout', icon: "box-arrow-in-left" },
  ];

  ngOnInit(): void {
    this.isAuth = this.auth.checkAuthentication()
    this.cart.loadCart()
  }

  logOut(): void {
    this.auth.logout();
  }
}
