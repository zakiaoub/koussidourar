import { NgModule } from '@angular/core';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MultiSelectModule } from 'primeng/multiselect';
import { MegaMenuModule } from 'primeng/megamenu';
import { MegaMenu } from 'primeng/megamenu';


@NgModule({
  imports: [AutoCompleteModule, MultiSelectModule,MegaMenuModule],
  exports: [AutoCompleteModule, MultiSelectModule, MegaMenuModule]
})
export class PrimeNgModule { }
