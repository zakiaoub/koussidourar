import { Injectable } from '@angular/core';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

@Injectable({
  providedIn: 'root',
})
export class PrintService {

  constructor() { }

  private generatePdf(elementId: string, options: { orientation?: 'p' | 'l'; format?: 'a4' | 'letter' } = {}, save: boolean = false) {
    const element = document.getElementById(elementId);
    if (!element) return;

    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: options.orientation || 'p',
        unit: 'mm',
        format: options.format || 'a4',
      });

      const margin = 10;
      const imgWidth = 210 - 2 * margin;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', margin, margin, imgWidth, imgHeight);

      if (save) {
        pdf.save('document.pdf');
      } else {
        const pdfURL = pdf.output('bloburl');
        window.open(pdfURL, '_blank');
      }
    });
  }

  print(elementId: string, options: { orientation?: 'p' | 'l'; format?: 'a4' | 'letter' } = {}) {
    this.generatePdf(elementId, options, false);
  }

  toPdf(elementId: string, options: { orientation?: 'p' | 'l'; format?: 'a4' | 'letter' } = {}) {
    this.generatePdf(elementId, options, true);
  }
}
