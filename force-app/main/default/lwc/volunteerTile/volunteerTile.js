import { LightningElement, api } from 'lwc';

export default class VolunteerTile extends LightningElement {
    @api volexp;

    get formattedDates() {
        if (!this.volexp || !this.volexp.Start_Date__c) return '';
        const startDate = new Date(this.volexp.Start_Date__c);
        const endDate = this.volexp.End_Date__c ? new Date(this.volexp.End_Date__c) : new Date();
        const startMonth = startDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        const endMonth = endDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        return `${startMonth} to ${endMonth}`;
    }
}
