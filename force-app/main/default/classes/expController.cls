public with sharing class ExpController {
    private static final String PROFESSIONAL_EXPERIENCE_RECORD_TYPE_ID = '0123h000000HxFZAA0';
    private static final String VOLUNTEER_EXPERIENCE_RECORD_TYPE_ID = '0123h000000HxFeAAK';
    
    @AuraEnabled(Cacheable=true)
    public static hed__Program_Enrollment__c[] getAllProgEnroll() {
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
            WITH USER_MODE
            ORDER BY hed__End_Date__c DESC
        ];
    }
    
    @AuraEnabled(Cacheable=true)
    public static hed__Test__c[] getAllCerts() {
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
            WITH USER_MODE
            ORDER BY hed__Test_Date__c DESC
        ];
    }

    @AuraEnabled(Cacheable=true)
    public static hed__Test__c[] getAllSkills() {
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
            WITH USER_MODE
            ORDER BY hed__Test_Date__c DESC
        ];
    }

    @AuraEnabled(Cacheable=true)
    public static Experience__c[] getAllProfExp() {
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
            WITH USER_MODE
            ORDER BY Sort_Order__c DESC NULLS FIRST
        ];
    }

    @AuraEnabled(Cacheable=true)
    public static Experience__c[] getAllVolExp() {
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
            WITH USER_MODE
            ORDER BY Sort_Order__c DESC
        ];
    }
    
    @AuraEnabled(Cacheable=true)
    public static Project__c[] getAllProjects() {
        return [
            SELECT Id, Start_Date__c, End_Date__c, Description__c, Name
            FROM Project__c
            WITH USER_MODE
            ORDER BY End_Date__c DESC
        ];
    }
}