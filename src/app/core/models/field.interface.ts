export interface Field {
  col: string;
  id: string;
  label: string;
  formControlName: string;
  icon?: string;
  type?: string;
  placeholder?: string;
  readonly?: boolean;
  minlength?: number,
  maxlength?: number,
  keyFilter?: string;
  showMessage: boolean;
  toggleMask?: boolean;
  feedback?: boolean;
  rows?: number,
}
