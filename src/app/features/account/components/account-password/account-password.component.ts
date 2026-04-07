import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { TranslationModule } from '@modules/translation.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconComponent } from "@app/shared/components/widgets/icon/icon.component";
import { UpdatePasswordFormComponent } from '@app/shared/components/forms/update-password-form/update-password-form.component';

@Component({
  selector: 'app-account-password',
  imports: [DialogModule, CommonModule, TranslationModule, FormsModule, ReactiveFormsModule, IconComponent, UpdatePasswordFormComponent],
  templateUrl: './account-password.component.html',
  styleUrl: './account-password.component.css'
})

export class AccountPasswordComponent {

  visible = false;

  showDialog() {
    this.visible = true
  }
}
