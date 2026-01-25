const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

function loadEnvFile() {
    const envPath = path.join(__dirname, '..', '.env.local');
    if (!fs.existsSync(envPath)) return;
    const envContent = fs.readFileSync(envPath, 'utf-8');
    envContent.split('\n').forEach(line => {
        line = line.trim();
        if (line && !line.startsWith('#')) {
            const [key, ...valueParts] = line.split('=');
            let value = valueParts.join('=').trim();
            if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
                value = value.slice(1, -1);
            }
            process.env[key.trim()] = value;
        }
    });
}

loadEnvFile();

async function testAppend() {
    try {
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
                private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            },
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });
        const sheets = google.sheets({ version: 'v4', auth });

        const testRow = ['TEST-ID', 'Date', 'Time', 'Test User', '01711111111', '', 'COD', '', '', '', 'Item (x1)', '1', 'Address', 'Receiver', '01711111112', 'Dhaka', '60', 'Pending'];

        console.log('Attempting to append test row...');
        const res = await sheets.spreadsheets.values.append({
            spreadsheetId: process.env.GOOGLE_SHEET_ID,
            range: 'Sheet1!A:R',
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: [testRow],
            },
        });
        console.log('Success! Append response:', res.statusText);
    } catch (e) {
        console.error('FAILED TO APPEND:', e.message);
        if (e.message.includes('403')) {
            console.error('ERROR 403: This usually means the service account does NOT have "Editor" permission on the sheet.');
        }
    }
}

testAppend();
