import { LightningElement, wire } from "lwc";
import getAllProfExp from "@salesforce/apex/expController.getAllProfExp";

export default class ProfessionalList extends LightningElement {
  @wire(getAllProfExp) profexps;

  get hasProfExps() {
    return this.profexps?.data && this.profexps.data.length > 0;
  }
}
