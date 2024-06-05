import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  generateInvoice(order: any) {
    const doc = new jsPDF() as any;

    // Add border to the page
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    doc.setDrawColor(0, 0, 0); // Black color for the border
    doc.rect(10, 10, pageWidth - 20, pageHeight - 20); // Draw the rectangle border

    // Invoice Header
    doc.setFont('helvetica', 'bold');

    // Invoice Header
    // Set font style for the invoice number (centered and bold)
    doc.setFontSize(18);
    const invoiceNumberText = 'Order N°: ' + order.id;
    const invoiceNumberWidth = doc.getStringUnitWidth(invoiceNumberText) * doc.internal.getFontSize() / doc.internal.scaleFactor;


    const invoiceNumberX = (pageWidth - invoiceNumberWidth) / 2;
    doc.text(invoiceNumberText, invoiceNumberX, 20);

    // Date (left-aligned)
    doc.setFontSize(16);
    doc.setFont('helvetica', 'normal');
    // Set font style for the date (left-aligned)
    doc.text('Date: ' + new Date().toLocaleDateString(), 14, 30);
    doc.text('', 14, 40);
    // Invoice Header (left-aligned)
    doc.text('Client Code: ' + order.businessId, 14, 40);
    doc.text('Client: ' + order.name, 14, 50);
    doc.text('Email: ' + order.email, 14, 60);
    doc.text('Contact Number: ' + order.contactNumber, 14, 70);

    // Consultation Table
    doc.autoTable({
      head: [['Service', 'Description', 'Qty', 'Unit Price', 'VAT', 'Total']],
      body: order.consultationServices.map((service: any) => [
        service.consultationName,
        service.consultationDescription,
        '1', // Assuming quantity is always 1 for simplicity
        service.price,
        '19%', // Assuming VAT is 19%
        (service.price * 1.19).toFixed(2)
      ]),
      startY: 80,
      styles: {
        fontSize: 10, // Table font size
        font: 'helvetica',
        overflow: 'linebreak',
        fillColor: [255, 255, 255], // White background for cells
        textColor: [0, 0, 0] // Black text color
      },
      headStyles: {
        fillColor: [101, 98, 98], // Table header color
        textColor: [255, 255, 255] // White text color for headers
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245] // Light gray background for alternate rows
      }
    });
    doc.setFont('helvetica', 'italic');

    // Summary
    const totalAmount = order.consultationServices.reduce((sum: any, service: any) => sum + service.price * 1.19, 0).toFixed(2);
    doc.text('', 14, 40);

    doc.text('P TTC: ' + totalAmount, 14, (doc as any).autoTable.previous.finalY + 30);
    doc.text('Amount in words: ' + this.numberToWords(parseFloat(totalAmount)), 14, (doc as any).autoTable.previous.finalY + 40);
    doc.text('Signature', 14, (doc as any).autoTable.previous.finalY + 50);

    // Save the PDF
    doc.save('tiepOrder.pdf');
  }

//try words
  numberToWords(number: number): string {
    const units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    const thousands = ['', 'Thousand', 'Million', 'Billion', 'Trillion'];

    function convertToWords(num: number): string {
      if (num === 0) return 'Zero';
      let result = '';
      let index = 0;

      do {
        const chunk = num % 1000;
        if (chunk !== 0) {
          result = convertToHundreds(chunk) + thousands[index] + ' ' + result;
        }
        num = Math.floor(num / 1000);
        index++;
      } while (num > 0);

      return result.trim();
    }

    function convertToHundreds(num: number): string {
      let result = '';

      if (num >= 100) {
        result += units[Math.floor(num / 100)] + ' Hundred ';
        num %= 100;
      }

      if (num >= 20) {
        result += tens[Math.floor(num / 10)] + ' ';
        num %= 10;
      } else if (num >= 10) {
        return result + teens[num - 10] + ' ';
      }

      if (num > 0) {
        result += units[num] + ' ';
      }

      return result;
    }

    return convertToWords(number);
  }

}
