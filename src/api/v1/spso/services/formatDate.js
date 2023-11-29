function formatDate({startDate,endDate}) {
    // Define the regular expression for the "yyyy-mm-dd" format ,
    // Add time to date , T15:00:00 mean 23:59:59 in VietNam
    const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;
      if(dateFormatRegex.test(startDate)&&dateFormatRegex.test(endDate))
      {
          return {startDate: new Date(startDate+"T00:00:00Z"),endDate: new Date(endDate+"T17:00:00Z")}
      }else{
          return {
              startDate: new Date('1970-11-25'),
              endDate: new Date('2030-01-01')
            };
      }
  
  }
export default formatDate