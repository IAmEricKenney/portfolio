import { LightningElement, wire } from "lwc";
import getAllVolExp from "@salesforce/apex/ExpController.getAllVolExp";

export default class VolunteerList extends LightningElement {
  @wire(getAllVolExp) volexps;
}
