import { LightningElement, api } from 'lwc';

export default class ProfessionalTile extends LightningElement {
    @api professional;
    get dateRangeString() {
        const endDateText = this.sObject.To_Present__c = true ? 'Present' : this.sObject.End_Date__c;
        return '${this.sObject.Start_Date__c} to ${endDateText}';
     }
}