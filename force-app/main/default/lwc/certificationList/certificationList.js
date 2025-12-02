import { LightningElement, wire } from "lwc";
import getAllCerts from "@salesforce/apex/expController.getAllCerts";

export default class CertificationList extends LightningElement {
  @wire(getAllCerts) certs;

  get hasCerts() {
    return this.certs?.data && this.certs.data.length > 0;
  }
}
