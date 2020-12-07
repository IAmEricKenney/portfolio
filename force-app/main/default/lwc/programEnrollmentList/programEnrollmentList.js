import { LightningElement, wire } from 'lwc';
import getAllProgEnroll from '@salesforce/apex/expController.getAllProgEnroll';

export default class ProgramEnrollmentList extends LightningElement {
	@wire(getAllProgEnroll) programs;
}