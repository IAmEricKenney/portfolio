import { LightningElement, api } from 'lwc';

export default class CertificationTile extends LightningElement {
  @api cert;

  get formattedDate() {
    if (!this.cert || !this.cert.hed__Test_Date__c) return '';
    const date = new Date(this.cert.hed__Test_Date__c);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  get hasCertData() {
    return this.cert && 
           this.cert.Id && 
           this.cert.Exam_Name__c &&
           this.cert.Issuing_Organization__r?.Name;
  }
}
