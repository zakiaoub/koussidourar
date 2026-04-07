import { Component } from '@angular/core';
import { TranslationModule } from '@modules/translation.module';
import { DialogModule } from 'primeng/dialog';
import { InputMaskModule } from 'primeng/inputmask';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IconComponent } from "@app/shared/components/widgets/icon/icon.component";
import { UpdateProfileFormComponent } from '@app/shared/components/forms/update-profile-form/update-profile-form.component';

@Component({
  selector: 'app-account-profil',
  imports: [TranslationModule, DialogModule, ReactiveFormsModule, FormsModule, CommonModule, InputMaskModule, IconComponent, UpdateProfileFormComponent],
  templateUrl: './account-profil.component.html',
  styleUrl: './account-profil.component.css'
})

export class AccountProfilComponent {

  visible: boolean = false;

  showDialog() {
    this.visible = true
  }
}

