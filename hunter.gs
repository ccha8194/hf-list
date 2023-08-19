function fetchEmails() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet()
  var dataRange = sheet.getDataRange()
  var dataValues = dataRange.getValues()
  
  var apiKey = '';   // api key goes here
  
  for (var i = 1; i < dataValues.length; i++) {
    var email = dataValues[i][1]
    var firstName = dataValues[i][2]
    var lastName = dataValues[i][3]
    
    var fetchedEmail = fetchEmailUsingHunter(firstName, lastName, apiKey);
    sheet.getRange(i + 1, 5).setValue(fetchedEmail)
  }
}

function fetchEmailUsingHunter(firstName, lastName, apiKey) {
  var apiUrl = 'https://api.hunter.io/v2/email-finder'
  
  var params = {
    method: 'get',
    headers: {
      'Authorization': 'Bearer ' + apiKey
    },
    payload: {
      first_name: firstName,
      last_name: lastName
    }
    }
  
  var response = UrlFetchApp.fetch(apiUrl, params);
  var responseData = JSON.parse(response.getContentText())
  
  if (responseData.data && responseData.data.email) {
    return responseData.data.email
  } else {
    return 'Email Not Found';
  }
  }
