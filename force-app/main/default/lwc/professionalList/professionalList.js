import { LightningElement, wire } from 'lwc';
import getPastProfExp from '@salesforce/apex/expController.getPastProfExp';
import getPresentProfExp from '@salesforce/apex/expController.getPresentProfExp';

export default class ProfessionalList extends LightningElement {
    @wire (getPastProfExp) pastprofs;
    @wire (getPresentProfExp) presprofs;
}