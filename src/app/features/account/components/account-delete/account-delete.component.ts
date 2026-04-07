import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Toast } from '@app/core/models/toast.interface';
import { TranslationModule } from '@app/core/modules/translation.module';
import { FormDataService } from '@app/core/services/form-data.service';
import { ToastService } from '@app/core/services/toast.service';
import { IconComponent } from "@app/shared/components/widgets/icon/icon.component";
import { ConfirmModalComponent } from "@app/shared/components/widgets/confirm-modal/confirm-modal.component";
import { ReqService } from '@app/core/services/req.service';

@Component({
  selector: 'app-account-delete',
  imports: [TranslationModule, CommonModule, IconComponent, ConfirmModalComponent],
  templateUrl: './account-delete.component.html',
  styleUrl: './account-delete.component.css'
})
export class AccountDeleteComponent {

  constructor(
    private formDataService: FormDataService,
    private toastService: ToastService,
    private api: ReqService
  ) { }

  visible: boolean = false

  showDeleteAccountModal() {
    this.visible = true
  }

  profile: any

  ngOnInit(): void {
    this.profile = this.formDataService.getData('profile')
  }

  onDeleteAccount(is_delete_request: any) {
    this.visible = false
    is_delete_request = 1 - is_delete_request

    this.api.get(['account', 'deleted', 'request', is_delete_request].join('/')).subscribe({
      next: (response: any) => {
        if (response?.status && response?.code == 200) {

          const params: Toast[] = [
            { severity: 'info', summary: 'success', detail: 'he_account_deletion_request_has_been_sent', life: 3000 },
            { severity: 'success', summary: 'success', detail: 'your_account_deletion_request_has_been_canceled', life: 3000 }
          ]

          this.toastService.show(params[this.profile.is_delete_request]);

          this.profile.is_delete_request = is_delete_request
          this.formDataService.sendData('profile', this.profile)
        } else {

          this.toastService.show({ severity: 'error', summary: 'error', detail: 'error_request', life: 3000 });
        }
      },
      error: () => {
        this.toastService.show({ severity: 'error', summary: 'error', detail: 'error_request', life: 3000 });
      }
    })
  }
}
