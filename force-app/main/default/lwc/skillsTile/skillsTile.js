import { LightningElement, api } from 'lwc';

export default class SkillsTile extends LightningElement {
  @api skill;

  get formattedDate() {
    if (!this.skill || !this.skill.hed__Test_Date__c) return '';
    const date = new Date(this.skill.hed__Test_Date__c);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  get imageUrl() {
    if (!this.skill) return '';
    if (this.skill.Content_Key__c) {
        return `/sfsites/c/cms/delivery/media/${this.skill.Content_Key__c}`;
    }
    return this.skill.Image_URL__c;
  }
}