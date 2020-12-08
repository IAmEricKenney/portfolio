public with sharing class expController {
    @AuraEnabled(Cacheable=true)
    public static hed__Program_Enrollment__c[] getAllProgEnroll() {
        return [
            SELECT
                Id,
                hed__End_Date__c,
                hed__GPA__c,
                Program_Name__c,
                hed__Start_Date__c,
                School_Name__c,
                Program_URL__c
            FROM hed__Program_Enrollment__c
            ORDER BY hed__End_Date__c DESC
        ];

    }
    @AuraEnabled(Cacheable=true)
    public static hed__Test__c[] getAllCerts(){
        return [
            SELECT  
                Id,
                Exam_Name__c,
                Organization__c,
                hed__Test_Date__c,
                Credential_ID__c,
                Certification_URL__c,
                Asset_URL__c
            FROM hed__Test__c
            WHERE hed__Test_Type__c = 'Professional Certification'
            ORDER BY hed__Test_Date__c DESC
        ];
    }
    @AuraEnabled(Cacheable=true)
    public static hed__Test__c[] getAllSkills(){
        return [
            SELECT  
                Id,
                Exam_Name__c,
                Organization__c,
                hed__Test_Date__c,
                Certification_URL__c,
                Asset_URL__c
            FROM hed__Test__c
            WHERE hed__Test_Type__c = 'Skills Assessment'
            ORDER BY hed__Test_Date__c DESC
        ];
    }
    @AuraEnabled(Cacheable=true)
    public static Experience__c[] getAllProfExp(){
        return [
            SELECT
                Id,
                Description__c,
                End_Date__c,
                Organization__c,
                Start_Date__c,
                Title__c,
                To_Present__c  
            FROM Experience__c
            WHERE Experience__c.RecordTypeId = '0123h000000HxFZAA0'
            ORDER BY End_Date__c DESC
        ];
    }
    @AuraEnabled(Cacheable=true)
    public static Experience__c[] getAllVolExp(){
        return [
            SELECT
                Id,
                Description__c,
                End_Date__c,
                Organization__c,
                Start_Date__c,
                Title__c,
                To_Present__c  
            FROM Experience__c
            WHERE Experience__c.RecordTypeId = '0123h000000HxFeAAK'
            ORDER BY End_Date__c DESC
        ];
    }
}