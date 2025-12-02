import { LightningElement, wire } from "lwc";
import getAllSkills from "@salesforce/apex/expController.getAllSkills";

export default class SkillsList extends LightningElement {
  @wire(getAllSkills) skills;

  get hasSkills() {
    return this.skills?.data && this.skills.data.length > 0;
  }
}
