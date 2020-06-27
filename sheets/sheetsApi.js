const { auth } = require('google-auth-library');
const { google } = require('googleapis');
const sheets = google.sheets('v4');
require('custom-env').env()

let sheetID = ''

if (process.env.PROD_SHEET_ID) {
  console.log('connected to prod google sheet')
  sheetID = process.env.PROD_SHEET_ID
} else {
  console.log('connected to test google sheet')
  sheetID = process.env.TEST_SHEET_ID
}

async function appendValues(values) {
  const authClient = await authorize()
  const request = {
    auth: authClient,
    // The ID of the spreadsheet to update.
    spreadsheetId: sheetID,
    range: 'A5',
    valueInputOption: 'raw',
    resource: {
      values: [values],
      "majorDimension": "ROWS"
    },
  };

  try {
    const response = (await sheets.spreadsheets.values.append(request)).data;
    return response;
  } catch (err) {
    console.error(err);
  }
}

async function authorize() {
  const keysEnvVar = process.env['CREDS'];
  if (!keysEnvVar) {
    throw new Error('The $CREDS environment variable was not found!');
  }
  const keys = JSON.parse(keysEnvVar);

  const authClient = auth.fromJSON(keys);
  authClient.scopes = ['https://www.googleapis.com/auth/drive'];

  return authClient;
}

module.exports = { appendValues }