# CMS Image Handler

A Lightning Web Component designed to display images using CMS Content Keys from record fields that work both internally in Salesforce and in Experience Cloud sites.

## Overview

This component generates dynamic URLs for CMS Content Keys stored in record fields, allowing you to display images from Salesforce CMS in both internal Salesforce contexts and Experience Cloud sites seamlessly.

## Features

- Generates proper URLs for Experience Cloud sites using `/sfsites/c/resource/{content-key}` pattern
- Works in both internal Salesforce contexts and Experience Cloud sites
- Responsive design with proper image sizing
- Loading and error handling
- Customizable styling through attributes
- Accessible with proper alt text support
- Works with any record field containing a CMS Content Key

## Usage

### Basic Usage

```html
<c-cms-image-handler 
    record-id="a00XXXXXXXXXXXX"
    field-name="Content_Key__c">
</c-cms-image-handler>
```

### Advanced Usage

```html
<c-cms-image-handler 
    record-id="a00XXXXXXXXXXXX"
    field-name="Content_Key__c"
    alternative-text="Custom image description"
    image-class="custom-css-class">
</c-cms-image-handler>
```

## Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `recordId` | String | Required | The record ID containing the CMS Content Key |
| `fieldName` | String | "Content_Key__c" | The field name containing the CMS Content Key |
| `alternativeText` | String | "CMS Image" | Alternative text for accessibility |
| `imageClass` | String | "slds-image" | Additional CSS classes for the image |

## Implementation Details

### URL Generation

The component retrieves the CMS Content Key from the specified record field and generates URLs in the format:
```
/sfsites/c/resource/{contentKey}
```

This URL pattern works for:
- Experience Cloud sites
- Internal Salesforce contexts (when properly configured)

### Content Key Format

The `contentKey` should be the CMS Content Key (e.g., "MCP3WWLBOD3ZATLD7T4SSYSTVXWU") rather than a full URL. If the field contains a full URL (like "https://example.com/cms/media/MCP3WWLBOD3ZATLD7T4SSYSTVXWU?version=1.1"), the component will extract the content key from the URL automatically.

### Enhanced Debugging

The component includes comprehensive debugging capabilities:
- Console logs for debugging record retrieval and URL generation
- Detailed error messages for troubleshooting
- Validation for missing record IDs and fields

### Error Handling

The component handles:
- Missing record IDs
- Records without the specified field
- Invalid URLs
- Image loading errors

### Styling

The component uses SLDS classes for consistent styling and includes:
- Responsive image sizing
- Loading spinner during image load
- Error message display
- Rounded corners for better aesthetics

## Best Practices

1. Always provide a meaningful `alternativeText` for accessibility
2. Test the component in both internal Salesforce contexts and Experience Cloud sites
3. Ensure the record contains a valid CMS Content Key in the specified field
4. Use appropriate image sizes for performance
5. Consider caching strategies for frequently accessed images

## Requirements

- Salesforce org with Experience Cloud enabled
- Records with the specified field containing valid CMS Content Keys
- Lightning Web Components enabled

## Support

For issues or feature requests, please contact your Salesforce administrator.
