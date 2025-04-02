export const apiData = [
  {
    title: "1. Hong Kong Data",
    endpoint: "GET /hong-kong",
    description:
      "Retrieves a list of financial firms operating in Hong Kong, including details such as license name, address, and address type.",
    response: `{
  "hongKongData": [
    {
      "id": 1,
      "licenseName": "2XCHANGE FINTECH LIMITED TRADING AS DOR FORTUNE 多福",
      "address": "SHOP 3B, MTR/F, ISQUARE, 63 NATHAN ROAD, TSIM SHA TSUI, KOWLOON",
      "addressType": "Specified Premises",
      "lastUpdatedDate": "2025-03-04T16:03:18.484Z"
    }
  ]
}`,
  },
  {
    title: "2. Lithuania Data",
    endpoint: "GET /lithuania",
    description:
      "Retrieves information about licensed firms in Lithuania, including firm name, address, license type, and associated links.",
    response: `{
  "lithuania": [
    {
      "id": 1,
      "FirmName": "UAB NS Pay",
      "Address": "Vašingtono a. 1 -62, Vilnius",
      "Licence": "Electronic money institution licence",
      "Date": "2024-05-14",
      "LicenceLink": "https://www.lb.lt/en/licences-1/view_license?id=2217"
    }
  ]
}`,
  },
  {
    title: "3. UK E-Money Firms",
    endpoint: "GET /uk/e-money-firms",
    description:
      "Returns a list of electronic money firms in the UK, including their firm registration number (FRN) and authorization status.",
    response: `{
  "eMoneyFirms": [
    {
      "FRN": 795904,
      "FirmName": "Token.io Ltd",
      "EmoneyRegisterStatus": "Authorised Payment Institution",
      "EmoneyStatusEffectiveDate": "2018-04-25 00:00:00"
    }
  ]
}`,
  },
];

export const codeExamples = [
  {
    language: "Python",
    code: `import requests

url = "https://fintech-aggregator.com/api/hong-kong"
response = requests.get(url)
print(response.json())`
  },
  {
    language: "JavaScript (Node.js)",
    code: `const fetch = require('node-fetch');

const url = "https://fintech-aggregator.com/api/hong-kong";
fetch(url)
.then(response => response.json())
.then(data => console.log(data));`
  },
  {
    language: "cURL",
    code: `curl -X GET "https://fintech-aggregator.com/api/hong-kong"`
  }
];