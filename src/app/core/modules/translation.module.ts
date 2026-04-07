import { NgModule } from '@angular/core';
import { TranslationService } from '@app/core/services/translation.service';
import { TranslationPipe } from '@app/shared/pipes/translation.pipe';

@NgModule({
  imports: [TranslationPipe],
  providers: [TranslationService],
  exports: [TranslationPipe]
})
export class TranslationModule {}
