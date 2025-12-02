import { LightningElement, api } from 'lwc';

export default class ProjectTile extends LightningElement {
  @api project;

  get formattedDates() {
    if (!this.project || !this.project.Start_Date__c) return '';
    const startDate = new Date(this.project.Start_Date__c);
    const endDate = this.project.End_Date__c ? new Date(this.project.End_Date__c) : new Date();
    const startMonth = startDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    const endMonth = endDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    return `${startMonth} to ${endMonth}`;
  }
}
