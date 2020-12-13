import {
    LightningElement,
    api,
    track
} from 'lwc';
export default class ProfessionalTile extends LightningElement {
    @track _professional;
    @api
    @set professional(value) {
        _professional = {
            ...value,
            dateRangeString: `${value.Start_Date__c} to ${value.To_Present__c ? 'Present' : value.End_Date__c}`
        }
        get professional(){
            return _professional;
        }
    }