import { LightningElement, api } from 'lwc';

export default class SkillsTile extends LightningElement {
  @api skill;

  get formattedDate() {
    if (!this.skill || !this.skill.hed__Test_Date__c) return '';
    const date = new Date(this.skill.hed__Test_Date__c);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }
}
