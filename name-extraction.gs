function fetchReportingManager() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet()
  var companyNames = sheet.getRange("A:A").getValues()
  var output = [];

  for (var i = 1; i < companyNames.length; i++) {
    var companyName = companyNames[i][0]
    var cik = getCikForCompany(companyName)
    
    if (cik) {
      var xbrlUrl = getReportingManager(cik)
      output.push([companyName, xbrlUrl])
    } else {
      output.push([companyName, "CIK not found"])
    }
  }
  
  sheet.getRange(1, 3, output.length, 2).setValues(output)
}

function getCikForCompany(companyName) {
  var response = UrlFetchApp.fetch("https://example.com/getcik?company=" + companyName)
  var cik = response.getContentText()
  return cik
}

function getReportingManager(cik) {
  var response = UrlFetchApp.fetch("https://example.com/getmanager?cik=" + cik)
  var manager = response.getContentText()

  return manager
}
