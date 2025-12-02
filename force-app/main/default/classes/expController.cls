public with sharing class ExpController {
    // Record Type Constants
    private static final String PROFESSIONAL_EXPERIENCE_RECORD_TYPE_ID = '0123h000000HxFZAA0';
    private static final String VOLUNTEER_EXPERIENCE_RECORD_TYPE_ID = '0123h000000HxFeAAK';
    
    /**
     * Get all program enrollments with related account information
     * @return List of hed__Program_Enrollment__c records
     */
    @AuraEnabled(Cacheable=true)
    public static hed__Program_Enrollment__c[] getAllProgEnroll() {
        validateAccess(hed__Program_Enrollment__c.SObjectType);
        return [
            SELECT
                Id,
                hed__GPA__c,
                hed__Start_Date__c,
                hed__End_Date__c,
                hed__Account__r.Name,
                hed__Account__r.Website,
                hed__Account__r.Parent.Parent.Name,
                hed__Account__r.Parent.Parent.Website,
                hed__Account__r.Parent.Parent.Image_URL__c,
                hed__Account__r.Parent.Parent.Content_Key__c
            FROM hed__Program_Enrollment__c
            ORDER BY hed__End_Date__c DESC
        ];
    }
    
    /**
     * Get all professional certifications
     * @return List of hed__Test__c records with Professional Certification type
     */
    @AuraEnabled(Cacheable=true)
    public static hed__Test__c[] getAllCerts() {
        validateAccess(hed__Test__c.SObjectType);
        return [
            SELECT
                Id,
                Exam_Name__c,
                hed__Test_Date__c,
                Credential_ID__c,
                Certification_URL__c,
                Issuing_Organization__r.Name,
                Asset_URL__c,
                Image_URL__c,
                Content_Key__c
            FROM hed__Test__c
            WHERE hed__Test_Type__c = 'Professional Certification'
            ORDER BY hed__Test_Date__c DESC
        ];
    }
    
    /**
     * Get test scores for a specific test
     * @param testId The ID of the test to get scores for
     * @return List of hed__Test_Score__c records
     */
    @AuraEnabled(Cacheable=true)
    public static hed__Test_Score__c[] getTestScores(Id testId) {
        validateAccess(hed__Test_Score__c.SObjectType);
        return [
            SELECT Subject_Area__c, Score_Percentage__c, Section_Percentage__c
            FROM hed__Test_Score__c
            WHERE hed__Test__c = :testId
        ];
    }
    
    /**
     * Get all skills assessments
     * @return List of hed__Test__c records with Skills Assessment type
     */
    @AuraEnabled(Cacheable=true)
    public static hed__Test__c[] getAllSkills() {
        validateAccess(hed__Test__c.SObjectType);
        return [
            SELECT
                Id,
                Exam_Name__c,
                hed__Test_Date__c,
                Certification_URL__c,
                Issuing_Organization__r.Name,
                Asset_URL__c,
                Image_URL__c,
                Content_Key__c
            FROM hed__Test__c
            WHERE hed__Test_Type__c = 'Skills Assessment'
            ORDER BY hed__Test_Date__c DESC
        ];
    }
    
    /**
     * Get all professional experience records
     * @return List of Experience__c records with professional record type
     */
    @AuraEnabled(Cacheable=true)
    public static Experience__c[] getAllProfExp() {
        validateAccess(Experience__c.SObjectType);
        return [
            SELECT
                Id,
                Description__c,
                End_Date__c,
                Start_Date__c,
                Job_Title__c,
                Organization__r.Name,
                Organization__r.Website
            FROM Experience__c
            WHERE RecordTypeId = :PROFESSIONAL_EXPERIENCE_RECORD_TYPE_ID
            ORDER BY Sort_Order__c DESC
        ];
    }
    
    /**
     * Get all volunteer experience records
     * @return List of Experience__c records with volunteer record type
     */
    @AuraEnabled(Cacheable=true)
    public static Experience__c[] getAllVolExp() {
        validateAccess(Experience__c.SObjectType);
        return [
            SELECT
                Id,
                Description__c,
                End_Date__c,
                Start_Date__c,
                Job_Title__c,
                Organization__r.Name,
                Organization__r.Website
            FROM Experience__c
            WHERE RecordTypeId = :VOLUNTEER_EXPERIENCE_RECORD_TYPE_ID
            ORDER BY Sort_Order__c DESC
        ];
    }
    
    /**
     * Get all projects
     * @return List of Project__c records
     */
    @AuraEnabled(Cacheable=true)
    public static Project__c[] getAllProjects() {
        validateAccess(Project__c.SObjectType);
        return [
            SELECT Id, Start_Date__c, End_Date__c, Description__c, Name
            FROM Project__c
            ORDER BY End_Date__c DESC
        ];
    }
    
    /**
     * Validate access to a specific object type
     * @param objType The SObjectType to validate access for
     * @throws AuraHandledException if access is denied
     */
    private static void validateAccess(Schema.SObjectType objType) {
        Schema.DescribeSObjectResult describeResult = objType.getDescribe();
        if (!describeResult.isAccessible()) {
            throw new AuraHandledException('Access denied to ' + objType.getDescribe().getName() + ' records');
        }
        // Check for Read access specifically for CRUD validation
        if (!describeResult.isQueryable()) {
            throw new AuraHandledException('Read access denied to ' + objType.getDescribe().getName() + ' records');
        }
    }
    
}