import { LightningElement, wire } from "lwc";
import getAllProjects from "@salesforce/apex/expController.getAllProjects";

export default class ProjectList extends LightningElement {
  @wire(getAllProjects) projects;
}
