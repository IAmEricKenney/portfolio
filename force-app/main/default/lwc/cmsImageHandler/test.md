# Testing CMS Image Handler Component

## Manual Testing Approach

Since we're in a restricted environment without full testing capabilities, here's how the component should be tested:

### 1. Component Structure Validation

Verify all required files exist:
- `cmsImageHandler.js` - Main component logic
- `cmsImageHandler.html` - Template
- `cmsImageHandler.css` - Styles
- `cmsImageHandler.js-meta.xml` - Metadata
- `README.md` - Documentation
- `cypress.config.js` - Test configuration

### 2. Functionality Testing

#### Test Case 1: Valid Record with Content Key
- Input: `recordId="valid_record_id"` with `Content_Key__c` field populated with a CMS Content Key (e.g., "MCP3WWLBOD3ZATLD7T4SSYSTVXWU")
- Expected: URL generated as `/sfsites/c/resource/{content_key_value}`
- Expected: No error state
- Expected: Loading state transitions to loaded

#### Test Case 2: Record Without Content Key Field
- Input: `recordId="valid_record_id"` without `Content_Key__c` field
- Expected: Error state activated
- Expected: Error message: "No Content Key found on record"

#### Test Case 3: Invalid Record ID
- Input: `recordId="invalid_record_id"`
- Expected: Error state activated
- Expected: Error message with details about invalid record

#### Test Case 4: Missing Record ID
- Input: `recordId=""` or `undefined`
- Expected: Error state activated
- Expected: Error message about missing record ID

#### Test Case 5: Full URL in Field
- Input: `recordId="valid_record_id"` with `Content_Key__c` field containing a full URL (e.g., "https://example.com/cms/media/MCP3WWLBOD3ZATLD7T4SSYSTVXWU?version=1.1")  
- Expected: URL extracted and processed correctly
- Expected: No error state
- Expected: Loading state transitions to loaded

### 3. UI Testing

#### Visual Tests
- Loading spinner appears during image load
- Error message displays when no content key found
- Image displays with proper alt text
- Responsive behavior on different screen sizes
- CSS classes applied correctly

### 4. Integration Testing

#### Test in Experience Cloud
- Deploy to Experience Cloud site
- Verify URL generation works in site context
- Verify image renders properly with valid record data

#### Test in Salesforce Org
- Use in Record Page context
- Verify URL generation works in internal Salesforce
- Verify image renders properly with valid record data

## Automated Testing (Recommended)

For a complete testing strategy, consider:

1. **Unit Tests**: Using Jest or similar for component logic
2. **Integration Tests**: Using Selenium or Cypress for end-to-end testing
3. **Visual Regression Tests**: To ensure UI consistency

## Debugging Tips

When images aren't displaying, check the browser console for:

1. **Missing Record ID**: Look for "No record ID provided" messages
2. **Missing Content Key**: Look for "No Content Key found on record" messages  
3. **URL Generation Issues**: Look for generated URLs in the console
4. **Record Retrieval Errors**: Look for error messages from the getRecord wire adapter

## Deployment Checklist

- [ ] All component files created
- [ ] Component properly exposed in metadata
- [ ] Component tested in sandbox environment
- [ ] Component documented with README
- [ ] Component validated for Experience Cloud compatibility
