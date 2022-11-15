import { LightningElement, wire } from "lwc";
import getAllSkills from "@salesforce/apex/ExpController.getAllSkills";

export default class SkillsList extends LightningElement {
  @wire(getAllSkills) skills;
}
