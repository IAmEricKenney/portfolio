import { LightningElement, api } from 'lwc';

export default class ProgramEnrollmentTile extends LightningElement {
    @api program;

    get formattedDates() {
        if (!this.program || !this.program.hed__Start_Date__c) return '';
        const startDate = new Date(this.program.hed__Start_Date__c);
        const endDate = this.program.hed__End_Date__c ? new Date(this.program.hed__End_Date__c) : new Date();
        const startMonth = startDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        const endMonth = endDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        return `${startMonth} to ${endMonth}`;
    }

    get hasGPA() {
        return this.program && this.program.hed__GPA__c !== null && this.program.hed__GPA__c !== undefined && this.program.hed__GPA__c !== '';
    }

    get formattedGPA() {
        if (!this.hasGPA) return '';
        return this.program.hed__GPA__c.toFixed(3);
    }
}
