import { LightningElement, wire } from "lwc";
import getAllSuperbadges from "@salesforce/apex/ExpController.getAllSuperbadges";

export default class SuperbadgeList extends LightningElement {
  @wire(getAllSuperbadges) sbs;
}
