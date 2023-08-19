function extractDomainsWithRateLimit() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet()
  var companyNames = sheet.getRange("A2:A" + sheet.getLastRow()).getValues()
  var apiKey = "sk_0a505e9c4b1e49d5b945c296cb403704"
  var requestsPerSecond = 10
  var millisecondsPerRequest = 1000 / requestsPerSecond
  
  for (var i = 0; i < companyNames.length; i++) {
    var companyName = companyNames[i][0];
    var response = UrlFetchApp.fetch("https://company.clearbit.com/v1/domains/find?name=" + encodeURIComponent(companyName), {
      "headers": {
        "Authorization": "Bearer " + apiKey
      },
      "muteHttpExceptions": true // prevents termination from errors
    });
    
    if (response.getResponseCode() === 200) {
      var json = response.getContentText()
      var data = JSON.parse(json)
      
      if (data.domain) {
        sheet.getRange(i + 2, 2).setValue(data.domain)
      }
    }
    
    if (i < companyNames.length - 1) {
      Utilities.sleep(millisecondsPerRequest)
    }
  }
}
