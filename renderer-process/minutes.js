const calls = require('./phones')
module.exports  = {
    UKcalls_durationInMinutes:(callsData, lookup_obj)=>{
        var dt = [];
        lookup_obj.forEach(element => {
            dt.push(calls.dataSummary(calls.splitUKPhoneData(callsData, element.phone,element.limit),element.type,element.lookup))
        });
        var summary = dt.reduce((a, b) => a + b, 0)
        return calls.convertToMinutes(summary)
    },  
    
    Internationalcalls_durationInMinutes:(callsData, lookup_obj)=>{
        var dt = [];
        lookup_obj.forEach(element => {
            dt.push(calls.dataSummary(calls.International_PhoneData(callsData, element.limit),element.type,element.lookup))
        });
        var duration = dt.reduce((a, b) => a + b, 0)
       return calls.convertToMinutes(duration)
    },

    numberOfCalls :(callsData, lookup_obj)=>{
        var call_count =[]
        lookup_obj.forEach(element => {
            if(element.phone!=''){
                call_count.push(calls.splitUKPhoneData(callsData, element.phone,element.limit))
            }else{
                call_count.push(calls.International_PhoneData(callsData, element.limit))
            }
        })
        return call_count[0].length
    },

    allUKcalls: (callsData, lookup_obj)=>{
        lookup_obj.forEach(element => {
            var call_count =[]
                call_count.push(calls.splitUKPhoneData(callsData, element.phone,element.limit))
        })
        return call_count
    },

    calculateCost :(callsData, lookup_obj)=>{
        var aCost =[]
        lookup_obj.forEach(element => {
            if(element.phone!=''){
                aCost.push(calls.dataSummary(calls.splitUKPhoneData(callsData, element.phone,element.limit),element.type,element.lookup))
            }else{
                aCost.push(calls.dataSummary(calls.International_PhoneData(callsData,element.limit),element.type,element.lookup))
            }
        })
       var tCost =  aCost.reduce((a, b) => a + b, 0)
        return tCost
    }, 

    fullBill:(callsData, lookup_obj)=>{
        var dt = [];
         lookup_obj.forEach(element => {
            if(element.phone!=''){
             dt.push(calls.splitUKPhoneData(callsData, element.phone,element.limit))
            }else{
                dt.push(calls.International_PhoneData(callsData, element.limit))
            }
         });
         return dt
    }
}