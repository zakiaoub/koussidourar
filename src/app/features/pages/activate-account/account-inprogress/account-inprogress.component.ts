import { Component, Input } from '@angular/core';
import { ProgressBar } from "primeng/progressbar";
import { IconComponent } from "@app/shared/components/widgets/icon/icon.component";
import { TranslationModule } from '@modules/translation.module';
import { CommonModule } from '@angular/common';


interface Data  {
  icon:string;
  label:string;
  caption:string;
}

@Component({
  selector: 'app-account-inprogress',
  imports: [ProgressBar, IconComponent, TranslationModule, CommonModule],
  templateUrl: './account-inprogress.component.html',
  styleUrl: './account-inprogress.component.css'
})

export class AccountInprogressComponent {

  @Input() appMail: string

  data:Data[] = [
    { icon: "envelope", label: "check_your_email_inbox", caption: "check_your_email_inbox_caption" },
    { icon: "exclamation-circle-fill", label: "remember_to_check_your_spam_folder", caption: "remember_to_check_your_spam_folder_caption" },
    { icon: "headset", label: "need_help", caption: "need_help_caption" },
  ]

}
