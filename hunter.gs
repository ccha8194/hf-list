const HUNTER_API_KEY = '71226f6e1083420423db004b5c0d8db341a2a563';

function generateDomainDetails() {
  const sheet = SpreadsheetApp.getActiveSheet()
  const data = sheet.getDataRange().getValues()
  
  for (let i = 1; i < data.length; i++) {
    const domainName = data[i][1]
    
    if (domainName) {
      const domainDetails = getDomainDetailsFromHunter(domainName);
      sheet.getRange(i + 1, 3, 1, domainDetails.length).setValues([domainDetails])
    }
  }
}

function getDomainDetailsFromHunter(domain) {
  const apiUrl = `https://api.hunter.io/v2/domain-search?domain=${domain}&api_key=${HUNTER_API_KEY}`;
  
  const options = {
    'method': 'get',
    'muteHttpExceptions': true
  };
  
  const response = UrlFetchApp.fetch(apiUrl, options)
  const data = JSON.parse(response.getContentText())
  
  if (data.data) {
    const domainDetails = [
      domain,
      data.data.organization,
      data.data.emails,
      data.data.country,
    ];
    
    return domainDetails;
  }
  
  return ['Email Not Found'];
}
