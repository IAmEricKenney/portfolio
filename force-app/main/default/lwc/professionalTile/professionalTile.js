import { LightningElement, api } from 'lwc';

export default class ProfessionalTile extends LightningElement {
    @api profexp;

    get formattedDates() {
        if (!this.profexp || !this.profexp.Start_Date__c) return '';
        const startDate = new Date(this.profexp.Start_Date__c);
        const endDate = this.profexp.End_Date__c ? new Date(this.profexp.End_Date__c) : new Date();
        const startMonth = startDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        const endMonth = endDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        return `${startMonth} to ${endMonth}`;
    }
}
