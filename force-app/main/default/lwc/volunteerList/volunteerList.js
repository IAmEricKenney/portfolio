import { LightningElement, wire } from 'lwc';
import getAllVolExp from '@salesforce/apex/expController.getAllVolExp';

export default class VolunteerList extends LightningElement {
    @wire(getAllVolExp) volexps;
}