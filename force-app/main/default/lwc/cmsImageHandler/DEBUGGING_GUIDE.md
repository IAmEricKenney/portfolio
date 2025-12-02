# Debugging CMS Image Handler Component

## Common Issues and Solutions

### 1. Images Not Displaying in Browser Console

When images aren't displaying, check the browser console for these specific messages:

#### Missing Record ID
Look for:
```
"No record ID provided to cmsImageHandler"
```
This indicates the component wasn't passed a valid record ID.

#### Missing Content Key
Look for:
```
"No Content Key found on record"
```
This indicates the record doesn't have a value in the specified field.

#### Empty URL Generated
Look for:
```
"Final image URL generated: "
```
This indicates that a URL was generated but it's empty, typically because the Content_Key__c field is empty/null.

#### URL Pattern Issues
Look for logs like:
```
"Using absolute URL pattern:"
"Using relative URL pattern:"
```
These help verify that the URL pattern matches your Experience Cloud configuration.

#### URL Generation Issues
Look for logs like:
```
"Generated image URL from content key:"
"Using URL pattern 1 (primary):"
```
These help verify that the URL is being constructed correctly.

### 2. Experience Cloud Specific Issues

#### URL Pattern Mismatch
Some Experience Cloud implementations use different URL structures:
- Standard pattern: `/sfsites/c/resource/{content-key}`
- Your implementation pattern: `/sfsites/c/cms/delivery/media/{content-key}`

Make sure the URL pattern matches your Experience Cloud CMS configuration.

### 2. Experience Cloud Specific Issues

#### Permission Issues
Make sure the Experience Cloud guest user profile has:
- Read access to the object containing the Content_Key__c field
- Access to the CMS content in Experience Cloud

#### URL Pattern Mismatch
Experience Cloud deployments might use different URL patterns. Common alternatives:
- `/sfsites/c/resource/{content-key}` (Primary)
- `/sfsites/c/{content-key}` (Alternative)
- `/resource/{content-key}` (Direct resource)
- `/sfsites/servlet/servlet.FileDownload?file={content-key}` (File download)

### 3. Record Data Issues

#### Content Key Format
Ensure Content_Key__c field contains:
- Just the key (e.g., "MCP3WWLBOD3ZATLD7T4SSYSTVXWU") 
- OR a full URL that can be parsed (e.g., "https://example.com/cms/media/MCP3WWLBOD3ZATLD7T4SSYSTVXWU?version=1.1")

#### Record ID Format
Ensure record IDs are:
- Valid Salesforce record IDs (15 or 18 character)
- Properly passed to the component

## Debugging Steps

### Step 1: Check Component Initialization
In browser console, look for:
```
"Connected callback called with recordId:"
"cmsImageHandler initialized with recordId:"
```

### Step 2: Verify Record Data Retrieval
Look for:
```
"Wire adapter called with error:"
"Record data retrieved:"
"Field value:"
```

If you see:
```
"No data and no error returned from wire adapter"
```
This indicates the getRecord wire adapter isn't returning data properly.

### Step 3: Examine URL Generation
Look for:
```
"Content key extracted:"
"Generated image URL from content key:"
"Using URL pattern 1 (primary):"
```

### Step 4: Check Network Requests
In browser developer tools, check the Network tab for:
- Requests to the generated image URLs
- Any 403, 404, or CORS errors

## Common Wire Adapter Issues

### 1. Field Not Found
If you see:
```
"Wire adapter called with error: {error details}"
```
This could mean the field name is incorrect or the field doesn't exist on the object.

### 2. Insufficient Permissions
If you see:
```
"No data and no error returned from wire adapter"
```
This might indicate insufficient permissions to read the record or field.

### 3. Invalid Record ID
If the record ID is malformed or doesn't exist, the wire adapter won't return data.

## Troubleshooting Checklist

- [ ] Check that the record ID is valid and accessible
- [ ] Verify the field name matches exactly (case-sensitive)
- [ ] Confirm user has read access to the record and field
- [ ] Check browser console for wire adapter error messages
- [ ] Ensure the component is being used in a context that supports getRecord
- [ ] Test with a simple record and known content key

## Testing with Sample Data

To test the component independently, you can create a simple test page:

1. Create a new Lightning Page or Experience Cloud page
2. Add the cmsImageHandler component with sample record IDs
3. Use known valid record IDs with Content_Key__c populated
4. Monitor the browser console for detailed logs

## Component Properties

The component accepts these properties:

| Property | Description | Required |
|----------|-------------|----------|
| `recordId` | Salesforce record ID containing the CMS Content Key | Yes |
| `fieldName` | Field name containing the CMS Content Key (default: "Content_Key__c") | No |
| `alternativeText` | Alt text for the image (default: "CMS Image") | No |
| `imageClass` | Additional CSS classes for the image (default: "slds-image") | No |

## Troubleshooting Checklist

- [ ] Verify record IDs are valid and accessible
- [ ] Confirm Content_Key__c field has values
- [ ] Check browser console for error messages
- [ ] Validate Experience Cloud permissions
- [ ] Test with simple record IDs and known content keys
- [ ] Check network tab for failed image requests
- [ ] Ensure component is properly exposed in metadata
