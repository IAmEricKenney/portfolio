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

    // New getter to drill down into the parent Account for the image
    get imageUrl() {
        // Safely navigate the relationship tree using optional chaining
        const schoolAccount = this.program?.hed__Account__r?.Parent?.Parent;
        
        if (!schoolAccount) return '';

        // Prioritize the relative CMS Content Key path
        if (schoolAccount.Content_Key__c) {
            return `/sfsites/c/cms/delivery/media/${schoolAccount.Content_Key__c}`;
        }
        
        // Fallback to the absolute URL field
        return schoolAccount.Image_URL__c;
    }
}