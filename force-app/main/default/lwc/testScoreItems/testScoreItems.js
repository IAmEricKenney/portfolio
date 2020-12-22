import { LightningElement, api, wire } from "lwc";
import getTestScores from "@salesforce/apex/expController.getTestScores";

export default class TestScoreItems extends LightningElement {
  @api test;
  @wire(getTestScores) scores;

  handleClick(event) {
    const selectEvent = new CustomEvent("select", {
      detail: this.test.Id
    });
    // Fire the custom event
    this.dispatchEvent(selectEvent);
  }
}
