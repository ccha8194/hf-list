// Used on inputs which emails not found by the hunter api
const CLEARBIT_API_KEY = 'sk_0a505e9c4b1e49d5b945c296cb403704';

function generateLeadEmails() {
  const sheet = SpreadsheetApp.getActiveSheet()
  const data = sheet.getDataRange().getValues()
  
  for (let i = 1; i < data.length; i++) {
    const companyName = data[i][0]
    const domainName = data[i][1]
    
    if (companyName && domainName) {
      const email = getEmailFromClearbit(domainName)
      sheet.getRange(i + 1, 3).setValue(email)
  }
  }
}

function getEmailFromClearbit(domain) {
  const apiUrl = `https://person.clearbit.com/v2/combined/find?domain=${domain}`
  const headers = {
    'Authorization': `Bearer ${CLEARBIT_API_KEY}`
  }
  const options = {
    'method': 'get',
    'headers': headers,
    'muteHttpExceptions': true
  }
  
  const response = UrlFetchApp.fetch(apiUrl, options)
  const data = JSON.parse(response.getContentText())
  
  if (data.person && data.person.email) {
    return data.person.email;
  }
  return 'Email Not Found';
}
