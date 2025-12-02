import { LightningElement, wire } from "lwc";
import getAllProgEnroll from "@salesforce/apex/ExpController.getAllProgEnroll";

export default class ProgramEnrollmentList extends LightningElement {
  @wire(getAllProgEnroll) programs;

  get hasPrograms() {
    return this.programs?.data && this.programs.data.length > 0;
  }
}
