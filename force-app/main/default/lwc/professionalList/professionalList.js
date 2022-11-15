import { LightningElement, wire } from "lwc";
import getAllProfExp from "@salesforce/apex/ExpController.getAllProfExp";

export default class ProfessionalList extends LightningElement {
  @wire(getAllProfExp) profexps;
}
