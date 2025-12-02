import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';

export default class CmsImageHandler extends LightningElement {
    @api recordId;
    @api fieldName = 'Content_Key__c';
    @api alternativeText = 'CMS Image';
    @api imageClass = 'slds-image';
    
    // State variables
    imageUrl = '';
    isLoading = true;
    isError = false;
    errorMessage = '';
    contentKey = '';

    connectedCallback() {
        // Validate that we have a recordId
        console.log('Connected callback called with recordId:', this.recordId);
        if (!this.recordId) {
            this.isError = true;
            this.isLoading = false;
            this.errorMessage = 'No record ID provided';
            console.warn('No record ID provided to cmsImageHandler');
        } else {
            console.log('cmsImageHandler initialized with recordId:', this.recordId);
        }
    }

    @wire(getRecord, { recordId: '$recordId', fields: '$fieldNames' })
    wiredRecord({ error, data }) {
        console.log('Wire adapter called with error:', error, 'data:', data);
        if (data) {
            // Debug logging
            console.log('Record data retrieved:', data);
            console.log('Field name:', this.fieldName);
            console.log('Field value from data.fields:', data.fields[this.fieldName]);
            console.log('Field value from data.fields[this.fieldName]?.value:', data.fields[this.fieldName]?.value);
            
            // Check if the field exists in the data
            if (data.fields && data.fields[this.fieldName]) {
                console.log('Field exists in data.fields');
                const fieldValue = data.fields[this.fieldName].value;
                console.log('Direct field value access:', fieldValue, 'typeof:', typeof fieldValue);
                
                // Check for empty or whitespace-only strings
                if (fieldValue === null || fieldValue === undefined || fieldValue === '') {
                    console.log('Field value is empty/null/undefined');
                    this.contentKey = '';
                } else {
                    this.contentKey = fieldValue;
                }
            } else {
                console.log('Field NOT found in data.fields');
                this.contentKey = '';
            }
            
            console.log('Content key assigned:', this.contentKey);
            this.generateImageUrl();
        } else if (error) {
            console.error('Error from getRecord wire adapter:', error);
            this.handleError(error);
        } else {
            console.log('No data and no error returned from wire adapter');
        }
    }

    get fieldNames() {
        console.log('Field names getter called with fieldName:', this.fieldName);
        return [this.fieldName];
    }

    generateImageUrl() {
        // If no content key is provided, we can't generate a URL
        console.log('generateImageUrl called with contentKey:', this.contentKey, 'typeof:', typeof this.contentKey, 'is truthy:', !!this.contentKey);
        if (!this.contentKey) {
            this.imageUrl = '';
            this.isLoading = false;
            this.isError = true;
            this.errorMessage = 'No Content Key found on record. Please verify the field "' + this.fieldName + '" contains a value for record ID: ' + this.recordId;
            console.warn('No content key found for record ID:', this.recordId, 'field:', this.fieldName, 'contentKey value:', this.contentKey, 'contentKey type:', typeof this.contentKey);
            return;
        }

        // Log the content key value for debugging
        console.log('Processing content key:', this.contentKey, 'type:', typeof this.contentKey);

        try {
            // For Experience Cloud sites, the CMS Content Key should be used to construct the URL
            // Different CMS implementations might use different URL patterns
            // Based on the working URL pattern from user feedback:
            // https://eric-kenney-portfolio-dev-ed.my.site.com/sfsites/c/cms/delivery/media/MCKWWKLYHMFRAKVO7735CJDS23V4
            
            // Check if contentKey looks like a full URL
            if (this.contentKey.startsWith('http://') || this.contentKey.startsWith('https://')) {
                // If it's already a full URL, use it directly
                this.imageUrl = this.contentKey;
                console.log('Using full URL directly:', this.imageUrl);
            } else {
                // Extract the content key from a potential full URL (like the one in feedback)
                // This handles cases where the field might contain a full URL instead of just the key
                const urlPattern = /\/([A-Z0-9]+)\?/;
                const match = this.contentKey.match(urlPattern);
                const actualContentKey = match ? match[1] : this.contentKey;
                
                // Validate that we have a content key after processing
                if (!actualContentKey || actualContentKey.trim() === '') {
                    this.imageUrl = '';
                    this.isLoading = false;
                    this.isError = true;
                    this.errorMessage = 'Invalid Content Key format';
                    console.warn('Invalid content key format for record ID:', this.recordId, 'field:', this.fieldName, 'contentKey value:', this.contentKey);
                    return;
                }
                
                // For Experience Cloud with CMS delivery media, use the correct pattern
                // The working pattern is: /sfsites/c/cms/delivery/media/{content-key}
                // We'll construct an absolute URL using the current origin to maintain compatibility
                const baseUrl = window.location.origin || '';
                if (baseUrl) {
                    // Construct absolute URL for Experience Cloud CMS
                    this.imageUrl = `${baseUrl}/sfsites/c/cms/delivery/media/${actualContentKey}`;
                    console.log('Using absolute URL pattern:', this.imageUrl);
                } else {
                    // Fallback to relative URL if we can't determine the base
                    this.imageUrl = `/sfsites/c/cms/delivery/media/${actualContentKey}`;
                    console.log('Using relative URL pattern:', this.imageUrl);
                }
                
                // Log the final URL structure for verification
                console.log('URL structure verification - Base:', baseUrl, 'Key:', actualContentKey, 'Final URL:', this.imageUrl);
            }
            
            this.isError = false;
            this.isLoading = false;
            console.log('Final image URL generated:', this.imageUrl);
        } catch (error) {
            this.handleError(error);
        }
    }

    /**
     * Handles image loading error
     */
    handleError(error) {
        this.isError = true;
        this.isLoading = false;
        this.errorMessage = error.message || 'Failed to load image';
        console.error('Image loading error:', error);
        
        // If we have a record ID but no URL, it's likely a content key issue
        if (this.recordId && !this.imageUrl) {
            console.warn('Image failed to load - likely due to missing or invalid content key for record:', this.recordId);
        }
    }

    /**
     * Handles successful image loading
     */
    handleLoad() {
        this.isLoading = false;
        this.isError = false;
        console.log('Image loaded successfully');
    }

    /**
     * Returns the image URL with proper fallback handling
     */
    get displayImageUrl() {
        // Return the generated URL or empty string if not available
        console.log('Display image URL requested:', this.imageUrl);
        return this.imageUrl || '';
    }

    /**
     * Returns CSS classes for the image element
     */
    get imageClasses() {
        return `slds-image ${this.imageClass}`.trim();
    }
}
