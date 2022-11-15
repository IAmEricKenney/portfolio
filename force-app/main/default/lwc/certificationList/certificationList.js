import { LightningElement, wire } from "lwc";
import getAllCerts from "@salesforce/apex/ExpController.getAllCerts";

export default class CertificationList extends LightningElement {
  @wire(getAllCerts) certs;
}
