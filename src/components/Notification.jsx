function Notification {

    const fetchActivityLog = async () => {
        const res = await fetch(
          `${baseURL}?filterByFormula={babyName}='${babyName}'&maxRecords=5&sort%5B0%5D%5Bfield%5D=dateTime&sort%5B0%5D%5Bdirection%5D=desc`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization:
                "Bearer patIefr5XHGrnjTal.ced0d2650e64835dc3f518858af97636f2d6498768decfc77447f76b11ca4e06",
            },
          }
        );
        const fetchedActivityLog = await res.json();
    
        //sample o/p:
        // records :[
        //  {
        //   "id": "recDzh8osP7Ttuxil",
        //   "createdTime": "2023-11-18T07:51:54.000Z",
        //   "fields": {
        //     "playType": "tummy time",
        //     "duration": 300,
        //     "dateTime": "2023-11-01T01:30:00.000Z",
        //     "babyName": "babyTest1",
        //     "activity": "Play"
        //   }
    
        if (fetchedActivityLog[0] === undefined) {
          console.log(
            "No activity records have been logged. Choose smth below to start!"
          );
          return;
        } else {
          const activityData = {
            actDateTime: fetchedActivityLog.records[0].fields.dateTime,
            actType: fetchedActivityLog.records[0].fields.activity,
            actDuration: fetchedActivityLog.records[0].fields.activity,
          };
    
          console.log(JSON.stringify(activityData));
        }
      };
    
      fetchActivityLog();

      return(
        JSON.stringify(activityData)
      )
}

export default Notification;