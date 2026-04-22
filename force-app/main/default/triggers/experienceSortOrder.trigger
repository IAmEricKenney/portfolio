trigger experienceSortOrder on Experience__c (before insert) {
    
    // 1. Collect all unique RecordTypeIds present in this transaction
    Set<Id> recordTypeIds = new Set<Id>();
    for (Experience__c exp : Trigger.new) {
        if (exp.RecordTypeId != null) {
            recordTypeIds.add(exp.RecordTypeId);
        }
    }

    // 2. Query the MAX Sort Order for these Record Types OUTSIDE the loop
    Map<Id, Integer> maxSortOrderByRt = new Map<Id, Integer>();
    if (!recordTypeIds.isEmpty()) {
        List<AggregateResult> results = [
            SELECT RecordTypeId, MAX(Sort_Order__c) maxOrder 
            FROM Experience__c 
            WHERE RecordTypeId IN :recordTypeIds 
            GROUP BY RecordTypeId
        ];
        
        for (AggregateResult ar : results) {
            Id rtId = (Id)ar.get('RecordTypeId');
            Decimal maxOrder = (Decimal)ar.get('maxOrder');
            maxSortOrderByRt.put(rtId, maxOrder != null ? maxOrder.intValue() : 0);
        }
    }

    // 3. Assign and increment the sort order for each new record
    for (Experience__c exp : Trigger.new) {
        if (exp.RecordTypeId != null) {
            
            // If there were no existing records for this RecordType, initialize to 0
            if (!maxSortOrderByRt.containsKey(exp.RecordTypeId)) {
                maxSortOrderByRt.put(exp.RecordTypeId, 0);
            }
            
            // Increment the order
            Integer nextOrder = maxSortOrderByRt.get(exp.RecordTypeId) + 1;
            exp.Sort_Order__c = nextOrder;
            
            // Update the map so the next record in this bulk insert gets the next number
            maxSortOrderByRt.put(exp.RecordTypeId, nextOrder);
        }
    }
}