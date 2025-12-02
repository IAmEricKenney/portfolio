import { LightningElement, wire } from "lwc";
import getAllProjects from "@salesforce/apex/ExpController.getAllProjects";

export default class ProjectList extends LightningElement {
  @wire(getAllProjects) projects;

  get hasProjects() {
    return this.projects?.data && this.projects.data.length > 0;
  }
}
