import { Routes } from '@angular/router';
import { HomeComponent } from './features/pages/home/home.component';
import { AboutComponent } from './features/pages/about/about.component';
import { BlogComponent } from './features/blog/blog.component';
import { ContactComponent } from './features/pages/contact/contact.component';
import { NotfoundComponent } from './features/pages/notfound/notfound.component';
import { FaqComponent } from './features/pages/faq/faq.component';
import { TenantsComponent } from './features/pages/tenants/tenants.component';
import { TermsComponent } from './features/pages/terms/terms.component';
import { PolicyComponent } from './features/pages/policy/policy.component';
import { AuthGuard } from "@app/core/guards/auth.guard";
import { LoginComponent } from './features/pages/login/login.component';
import { RecoverPasswordComponent } from './features/pages/recover-password/recover-password.component';
import { ForgotPasswordComponent } from './features/pages/forgot-password/forgot-password.component';
import { ActivateAccountComponent } from './features/pages/activate-account/activate-account.component';
import { GuestGuard } from './core/guards/guest.guard copy';
import { FlightsComponent } from './features/flights/flights.component';
import { HotelsComponent } from './features/hotels/hotels.component';
import { AttractionsComponent } from './features/attractions/attractions.component';
import { TransfersComponent } from './features/transfers/transfers.component';
import { PaymentComponent } from './features/pages/payment/payment.component';
import { CartComponent } from './features/pages/cart/cart.component';
import { ConfirmComponent } from './features/pages/cart/confirm/confirm.component';
import { AccountComponent } from './features/account/account.component';
import { CookiesComponent } from './features/pages/cookies/app-cookies.component';
import { BookingsComponent } from './features/bookings/bookings.component';
import { SignupComponent } from './features/pages/signup/signup.component';
import { ReferralsHomeComponent } from './features/referrals/views/referrals-home/referrals-home.component';
import { AffiliatesComponent } from './features/affiliates/affiliates.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', redirectTo: "" },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'policy', component: PolicyComponent },
  { path: 'cookies', component: CookiesComponent },
  { path: 'tenants', component: TenantsComponent },
  { path: 'affiliates', component: AffiliatesComponent },
  { path: 'login', component: LoginComponent, canActivate: [GuestGuard] },
  { path: 'recover-password/:token', component: RecoverPasswordComponent, canActivate: [GuestGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [GuestGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [GuestGuard] },
  { path: 'activate/:activateCode/account', component: ActivateAccountComponent, canActivate: [GuestGuard] },

  {
    path: 'blog',
    children: [
      { path: '', component: BlogComponent, data: { component: 'home' } },
      { path: ':id', component: BlogComponent, data: { component: 'details' } },
    ]
  },
  {
    path: 'referrals',
    children: [
      { path: '', component: ReferralsHomeComponent, data: { component: 'home' } },
    ]
  },

  {
    path: 'account',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: AccountComponent, data: { component: 'home' } },
    ]
  },

  {
    path: 'bookings',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: BookingsComponent, data: { component: 'home' } },
      { path: 'details/:number', component: BookingsComponent, data: { component: 'details' } },
    ]
  },

  {
    path: 'flights',
    canActivate: [],
    children: [
      { path: '', component: FlightsComponent, data: { component: 'home' } },
      { path: 'results/:searchToken/:day/:month/:year', component: FlightsComponent, data: { component: 'results' } },
      { path: ':searchToken/:carrierCode/:day/:month/:year/:rateKey', component: FlightsComponent, data: { component: 'details' } },
      { path: ':carrierCode/checkout/:searchToken/:carrierCode/:day/:month/:year/:rateKey/:rateCategory', component: FlightsComponent, data: { component: 'checkout' } }
    ]
  },
  {
    path: 'hotels',
    canActivate: [],
    children: [
      { path: '', component: HotelsComponent, data: { component: 'home' } },
      { path: 'results/:searchToken', component: HotelsComponent, data: { component: 'results' } },
      { path: ':country_code/:roomsCount/:adultCount/:childCount/:nights/:hotelId/:searchToken', component: HotelsComponent, data: { component: 'details' } },
      { path: ':hotelId/checkout/:country_code/:searchToken/:hotelId/:rateKey', component: HotelsComponent, data: { component: 'checkout' } }
    ]
  },

  {
    path: 'attractions',
    canActivate: [],
    children: [
      {
        path: "",
        component: AttractionsComponent,
        data: { component: "home" },
      },
      {
        path: "results/:searchToken",
        component: AttractionsComponent,
        data: { component: "results" },
      },
      {
        path: ":searchToken/:year/:month/:day/:adult/:child/:activityCode/:numberOfDay/:rateKey",
        component: AttractionsComponent,
        data: { component: "details" },
      },
      {
        path: "checkout/:activityCode/:searchToken/:rateKey",
        component: AttractionsComponent,
        data: { component: "checkout" },
      },
    ]
  },


  {
    path: 'transfers',
    canActivate: [],
    children: [
      { path: '', component: TransfersComponent, data: { component: 'home' } },
      { path: 'results/:searchToken', component: TransfersComponent, data: { component: 'results' } },
      { path: ':searchToken/:rateKey', component: TransfersComponent, data: { component: 'details' } },
      { path: 'checkout/:searchToken/:rateKey', component: TransfersComponent, data: { component: 'checkout' } }
    ]
  },
  {
    path: 'payment',
    canActivate: [],
    children: [
      { path: 'fail/:transactionId', component: PaymentComponent, data: { component: 'fail' } },
      { path: 'success/:transactionId', component: PaymentComponent, data: { component: 'success' } }
    ]
  },

  { path: '404', component: NotfoundComponent },
  { path: '**', redirectTo: '/404' },
];