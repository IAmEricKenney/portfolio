trigger experienceSortOrder on Experience__c (before insert) {
    Integer sortOrder = 0;
    List<AggregateResult> groupedResults = new List<AggregateResult>();
    for( Experience__c exps: Trigger.new){
        
        if (exps.RecordTypeId == '0123h000000HxFZAA0') {
            groupedResults = [SELECT MAX(Sort_Order__c)so FROM Experience__c 
                              WHERE RecordTypeId ='0123h000000HxFZAA0'];
        } else { 
            groupedResults = [SELECT MAX(Sort_Order__c)so FROM Experience__c 
                              WHERE RecordTypeId = '0123h000000HxFeAAK'];
        }
    }
    for (AggregateResult ar : groupedResults)  
    {
        if (String.valueOf(ar.get('so')) == null)
        {
            sortOrder = 0;
        }
        else
        {
            sortOrder = Integer.valueOf(String.valueOf(ar.get('so')));
        }
    }
    for( Experience__c exp: Trigger.new){
        exp.Sort_Order__c = sortOrder + 1;
    }
}