import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslationModule } from '@modules/translation.module';
@Component({
  selector: 'app-input-field-label',
  imports: [CommonModule, TranslationModule, FormsModule, ReactiveFormsModule],
  templateUrl: './input-field-label.component.html',
  styleUrl: './input-field-label.component.css'
})
export class InputFieldLabelComponent {
    @Input() labelKey!: any; 
    @Input() field!: any;
    @Input() icon!: any;  
    @Input() type!: any
    }
