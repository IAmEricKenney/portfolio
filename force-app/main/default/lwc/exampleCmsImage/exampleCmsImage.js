import { LightningElement } from 'lwc';

export default class ExampleCmsImage extends LightningElement {
    // Example record IDs - these would come from your data
    recordId1 = 'a00XXXXXXXXXXXX';
    recordId2 = 'a00YYYYYYYYYYYY';
    recordId3 = 'a00ZZZZZZZZZZZ';
    
    // Alternative text for images
    altText1 = 'Example Image 1';
    altText2 = 'Example Image 2';
    altText3 = 'Example Image 3';
    
    // For debugging - we can add methods to simulate record data
    get debugInfo() {
        return {
            recordId1: this.recordId1,
            recordId2: this.recordId2,
            recordId3: this.recordId3
        };
    }
}
