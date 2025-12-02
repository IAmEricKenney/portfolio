# CMS Image Handler - Usage Documentation

This document provides comprehensive guidance on using the CMS Image Handler LWC component in various tile components and contexts.

## Overview

The `cmsImageHandler` component is designed to display images from Salesforce CMS Workspace using CMS Content Keys stored in record fields. It works seamlessly in both internal Salesforce contexts and Experience Cloud sites.

## Basic Usage Pattern

The component accepts four key attributes:

```html
<c-cms-image-handler 
    record-id="{recordId}"
    field-name="{fieldName}"
    alternative-text="{altText}"
    image-class="{cssClass}">
</c-cms-image-handler>
```

## Usage Examples in Tile Components

### 1. Certification Tile (Existing Implementation)

The certification tile already demonstrates proper usage:

```html
<!-- certificationTile.html -->
<div class="slds-media__figure">
  <c-cms-image-handler 
    record-id={cert.Id}
    field-name="Content_Key__c"
    alternative-text="Certification Logo"
    image-class="slds-avatar slds-avatar_large">
  </c-cms-image-handler>
</div>
```

### 2. Professional Tile

```html
<!-- professionalTile.html -->
<div class="slds-media__figure">
  <c-cms-image-handler 
    record-id={professional.Id}
    field-name="Profile_Image_Key__c"
    alternative-text="Professional Profile Image"
    image-class="slds-avatar slds-avatar_medium">
  </c-cms-image-handler>
</div>
```

### 3. Project Tile

```html
<!-- projectTile.html -->
<div class="slds-media__figure">
  <c-cms-image-handler 
    record-id={project.Id}
    field-name="Project_Image_Key__c"
    alternative-text="Project Thumbnail"
    image-class="slds-image slds-image_cover">
  </c-cms-image-handler>
</div>
```

### 4. Skills Tile

```html
<!-- skillsTile.html -->
<div class="slds-media__figure">
  <c-cms-image-handler 
    record-id={skill.Id}
    field-name="Skill_Icon_Key__c"
    alternative-text="Skill Icon"
    image-class="slds-icon slds-icon_small">
  </c-cms-image-handler>
</div>
```

## Component Attributes Reference

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `recordId` | String | Required | The record ID containing the CMS Content Key |
| `fieldName` | String | "Content_Key__c" | The field name containing the CMS Content Key |
| `alternativeText` | String | "CMS Image" | Alternative text for accessibility |
| `imageClass` | String | "slds-image" | Additional CSS classes for the image |

## Field Configuration

### Recommended Field Names

Different tile components may use different field names for storing CMS Content Keys:

- **Content_Key__c** (default) - Used in certification tiles
- **Profile_Image_Key__c** - Used for professional profile images
- **Project_Image_Key__c** - Used for project thumbnails
- **Skill_Icon_Key__c** - Used for skill icons

### Creating Custom Fields

If you need to create custom fields for CMS Content Keys:

1. Go to Setup → Object Manager
2. Select the object (e.g., Professional__c)
3. Create a new Text field named appropriately (e.g., Profile_Image_Key__c)
4. Set the field type to Text
5. Save the field

## Advanced Usage Patterns

### Dynamic Field Names

You can dynamically set the field name based on conditions:

```html
<c-cms-image-handler 
    record-id={record.Id}
    field-name={imageFieldName}
    alternative-text="Dynamic Image">
</c-cms-image-handler>
```

```javascript
// In your JavaScript controller
get imageFieldName() {
    return this.record.Type__c === 'Certification' ? 'Content_Key__c' : 'Profile_Image_Key__c';
}
```

### Conditional Rendering

You can conditionally render the image handler based on whether a content key exists:

```html
<template if:true={hasContentKey}>
  <c-cms-image-handler 
    record-id={record.Id}
    field-name="Content_Key__c"
    alternative-text="Record Image">
  </c-cms-image-handler>
</template>
<template if:false={hasContentKey}>
  <span>No image available</span>
</template>
```

```javascript
// In your JavaScript controller
get hasContentKey() {
    return this.record.Content_Key__c && this.record.Content_Key__c.length > 0;
}
```

## Best Practices

### 1. Accessibility
Always provide meaningful alternative text:

```html
<c-cms-image-handler 
    record-id={record.Id}
    alternative-text={record.Name + " Image"}>
</c-cms-image-handler>
```

### 2. Responsive Design
Use appropriate CSS classes for responsive images:

```html
<c-cms-image-handler 
    record-id={record.Id}
    image-class="slds-image slds-image_cover">
</c-cms-image-handler>
```

### 3. Error Handling
The component handles errors gracefully, but you can enhance UX:

```html
<template if:true={showImage}>
  <c-cms-image-handler 
    record-id={record.Id}
    field-name="Content_Key__c"
    alternative-text="Record Image">
  </c-cms-image-handler>
</template>
<template if:false={showImage}>
  <div class="slds-text-body_small slds-theme_default">Image not available</div>
</template>
```

## Troubleshooting

### Common Issues and Solutions

#### Issue: Image Not Loading
**Solution**: Check that:
1. The record ID is valid
2. The field contains a valid CMS Content Key
3. The field name is correct
4. The CMS Content Key is accessible in the current context

#### Issue: Incorrect URL Pattern
**Solution**: Verify the URL pattern in the browser's developer tools. The component should generate URLs in the format:
```
/sfsites/c/resource/{contentKey}
```

#### Issue: Missing Alternative Text
**Solution**: Always provide meaningful alternative text for accessibility compliance.

### Debugging Tips

1. Enable browser developer tools to inspect network requests
2. Check console logs for debugging information
3. Verify the record contains the expected field value
4. Test in both internal Salesforce and Experience Cloud contexts

## Performance Considerations

### Lazy Loading
The component uses `loading="lazy"` attribute for natural browser lazy loading.

### Image Optimization
Consider using appropriate image sizes and formats for optimal performance.

### Caching
Experience Cloud sites typically cache CMS assets automatically.

## Security Considerations

1. Ensure CMS Content Keys are properly secured
2. Validate that users have access to the referenced content
3. Follow Salesforce security best practices for field-level security
4. Use appropriate permission sets for CMS access

## Environment Compatibility

The component works in:
- Salesforce Lightning Pages
- Experience Cloud Sites
- Salesforce Console Applications
- Any Salesforce environment with LWC support

## Migration Notes

If migrating from a different image handling approach:
1. Ensure CMS Content Keys are populated in the appropriate fields
2. Update tile components to use the new component
3. Test in both internal and Experience Cloud contexts
4. Verify accessibility attributes are properly set
