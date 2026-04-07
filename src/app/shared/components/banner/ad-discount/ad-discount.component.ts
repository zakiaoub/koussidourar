import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslationModule } from '@app/core/modules/translation.module';
import { IconComponent } from "@app/shared/components/widgets/icon/icon.component";
import { AuthService } from '@app/core/services/auth.service';

@Component({
  selector: 'app-ad-discount',
  imports: [CommonModule, TranslationModule, IconComponent],
  templateUrl: './ad-discount.component.html',
  styleUrl: './ad-discount.component.css'
})

export class AdDiscountComponent {

  constructor( private auth: AuthService){

  }

  isAuth:boolean


  ngOnInit(){
   this.isAuth = this.auth.checkAuthentication()
  }

  @Input() layout: string

}
