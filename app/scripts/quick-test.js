#!/usr/bin/env node

const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

// Load .env.local manually
function loadEnvFile() {
    const envPath = path.join(__dirname, '..', '.env.local');

    if (!fs.existsSync(envPath)) {
        console.error('.env.local file not found!');
        process.exit(1);
    }

    const envContent = fs.readFileSync(envPath, 'utf-8');
    const lines = envContent.split('\n');

    lines.forEach(line => {
        line = line.trim();
        if (line && !line.startsWith('#')) {
            const [key, ...valueParts] = line.split('=');
            let value = valueParts.join('=').trim();

            if ((value.startsWith('"') && value.endsWith('"')) ||
                (value.startsWith("'") && value.endsWith("'"))) {
                value = value.slice(1, -1);
            }

            process.env[key.trim()] = value;
        }
    });
}

loadEnvFile();

async function quickTest() {
    console.log('\nQuick Google Sheets Test\n');
    console.log('='.repeat(50));

    const sheetId = process.env.GOOGLE_SHEET_ID;
    const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY;

    console.log('\n1. Environment Variables:');
    console.log('   Sheet ID:', sheetId ? 'OK' : 'MISSING');
    console.log('   Email:', clientEmail ? 'OK' : 'MISSING');
    console.log('   Private Key:', privateKey ? 'OK' : 'MISSING');

    if (!sheetId || !clientEmail || !privateKey) {
        console.log('\nERROR: Missing environment variables!');
        process.exit(1);
    }

    try {
        console.log('\n2. Authenticating...');
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: clientEmail,
                private_key: privateKey.replace(/\\n/g, '\n'),
            },
            scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
        });

        const sheets = google.sheets({ version: 'v4', auth });
        console.log('   Authentication: OK');

        console.log('\n3. Reading Products sheet...');
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: sheetId,
            range: 'Products!A1:H',
        });

        const rows = response.data.values;

        if (!rows || rows.length === 0) {
            console.log('   ERROR: No data found in Products sheet!');
            console.log('\n   Make sure:');
            console.log('   - You have a tab named "Products"');
            console.log('   - The sheet has data');
            process.exit(1);
        }

        console.log(`   Found ${rows.length} rows`);
        console.log(`   Headers: ${rows[0].join(', ')}`);
        console.log(`   Products: ${rows.length - 1}`);

        console.log('\n4. Sample Products:');
        rows.slice(1, 4).forEach((row, i) => {
            console.log(`   ${i + 1}. ${row[1]} - ৳${row[2]}`);
        });

        console.log('\n' + '='.repeat(50));
        console.log('SUCCESS! Everything is working!');
        console.log('='.repeat(50));
        console.log('\nNext: Run "npm run dev" and visit:');
        console.log('- http://localhost:3000/api/products');
        console.log('- http://localhost:3000\n');

    } catch (error) {
        console.log('\nERROR:', error.message);

        if (error.code === 403) {
            console.log('\nPermission Error!');
            console.log('Make sure the service account has access:');
            console.log(`- Email: ${clientEmail}`);
            console.log('- Permission: Viewer');
        } else if (error.code === 404) {
            console.log('\nSheet Not Found!');
            console.log('Make sure:');
            console.log('- Sheet ID is correct');
            console.log('- Tab is named "Products"');
        }

        process.exit(1);
    }
}

quickTest();
