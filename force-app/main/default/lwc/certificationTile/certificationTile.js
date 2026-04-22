import { LightningElement, api } from 'lwc';

export default class CertificationTile extends LightningElement {
  @api cert;

  get formattedDate() {
    if (!this.cert || !this.cert.hed__Test_Date__c) return '';
    const date = new Date(this.cert.hed__Test_Date__c);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  get hasCertData() {
    return this.cert && this.cert.Id && this.cert.Exam_Name__c;
  }

  get imageUrl() {
    if (!this.cert) return '';
    if (this.cert.Content_Key__c) {
        return `/sfsites/c/cms/delivery/media/${this.cert.Content_Key__c}`;
    }
    return this.cert.Image_URL__c;
  }
}