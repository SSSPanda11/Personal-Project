#!/usr/bin/env node

/**
 * Test Script: Verify Google Sheets Products Integration
 * 
 * This script tests if your Google Sheets Products integration is working correctly.
 * Run this before starting the dev server to catch any configuration issues early.
 */

const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

// Load .env.local manually (no need for dotenv package)
function loadEnvFile() {
    const envPath = path.join(__dirname, '..', '.env.local');

    if (!fs.existsSync(envPath)) {
        console.error('❌ .env.local file not found!');
        console.log(`Expected location: ${envPath}`);
        process.exit(1);
    }

    const envContent = fs.readFileSync(envPath, 'utf-8');
    const lines = envContent.split('\n');

    lines.forEach(line => {
        line = line.trim();
        if (line && !line.startsWith('#')) {
            const [key, ...valueParts] = line.split('=');
            let value = valueParts.join('=').trim();

            // Remove quotes if present
            if ((value.startsWith('"') && value.endsWith('"')) ||
                (value.startsWith("'") && value.endsWith("'"))) {
                value = value.slice(1, -1);
            }

            process.env[key.trim()] = value;
        }
    });
}

// Load environment variables
loadEnvFile();

async function testGoogleSheetsConnection() {
    console.log('\n🔍 Testing Google Sheets Products Integration...\n');

    // Step 1: Check Environment Variables
    console.log('Step 1: Checking Environment Variables...');
    const sheetId = process.env.GOOGLE_SHEET_ID;
    const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY;

    if (!sheetId) {
        console.error('❌ GOOGLE_SHEET_ID is missing!');
        return false;
    } else {
        console.log(`✅ GOOGLE_SHEET_ID: ${sheetId}`);
    }

    if (!clientEmail) {
        console.error('❌ GOOGLE_SERVICE_ACCOUNT_EMAIL is missing!');
        return false;
    } else {
        console.log(`✅ GOOGLE_SERVICE_ACCOUNT_EMAIL: ${clientEmail}`);
    }

    if (!privateKey) {
        console.error('❌ GOOGLE_PRIVATE_KEY is missing!');
        return false;
    } else {
        console.log('✅ GOOGLE_PRIVATE_KEY is set');
    }

    // Step 2: Test Authentication
    console.log('\nStep 2: Testing Google Sheets Authentication...');
    try {
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: clientEmail,
                private_key: privateKey.replace(/\\n/g, '\n'),
            },
            scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
        });

        const sheets = google.sheets({ version: 'v4', auth });
        console.log('✅ Authentication successful!');

        // Step 3: Test Reading Products Sheet
        console.log('\nStep 3: Reading Products from Sheet...');
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: sheetId,
            range: 'Products!A1:H',
        });

        const rows = response.data.values;

        if (!rows || rows.length === 0) {
            console.error('❌ No data found in Products sheet!');
            console.log('\n💡 Make sure:');
            console.log('   1. You have a tab named "Products" (case-sensitive)');
            console.log('   2. The sheet has data starting from Row 1');
            return false;
        }

        console.log(`✅ Found ${rows.length} rows (including header)`);

        // Step 4: Validate Data Structure
        console.log('\nStep 4: Validating Data Structure...');
        const headers = rows[0];
        const expectedHeaders = ['ID', 'Name', 'Price', 'Description', 'Image', 'Category', 'Image2', 'Image3'];

        console.log('Expected headers:', expectedHeaders);
        console.log('Actual headers:  ', headers);

        const headersMatch = JSON.stringify(headers) === JSON.stringify(expectedHeaders);
        if (!headersMatch) {
            console.warn('⚠️  Headers do not match exactly (this may still work)');
        } else {
            console.log('✅ Headers match perfectly!');
        }

        // Step 5: Display Products
        console.log('\nStep 5: Products Found:');
        console.log('─'.repeat(80));

        const products = rows.slice(1); // Skip header row

        if (products.length === 0) {
            console.error('❌ No products found! Add products starting from Row 2.');
            return false;
        }

        products.forEach((row, index) => {
            const [id, name, price, description, image, category] = row;
            console.log(`\n${index + 1}. Product ID: ${id}`);
            console.log(`   Name: ${name}`);
            console.log(`   Price: ৳${price}`);
            console.log(`   Category: ${category}`);
            console.log(`   Description: ${description?.substring(0, 50)}...`);
        });

        console.log('\n' + '─'.repeat(80));
        console.log(`\n✅ Total Products: ${products.length}`);

        // Step 6: Test Service Account Access
        console.log('\nStep 6: Verifying Service Account Access...');
        try {
            const metadata = await sheets.spreadsheets.get({
                spreadsheetId: sheetId,
            });
            console.log(`✅ Service account has access to: "${metadata.data.properties?.title}"`);
        } catch (error) {
            console.error('❌ Service account access error:', error.message);
            console.log('\n💡 Make sure:');
            console.log(`   1. Go to your Google Sheet`);
            console.log(`   2. Click Share`);
            console.log(`   3. Add: ${clientEmail}`);
            console.log(`   4. Set permission to "Viewer"`);
            return false;
        }

        // Success!
        console.log('\n' + '='.repeat(80));
        console.log('🎉 SUCCESS! Your Google Sheets integration is working correctly!');
        console.log('='.repeat(80));
        console.log('\nNext steps:');
        console.log('1. Run: npm run dev');
        console.log('2. Visit: http://localhost:3000/api/products');
        console.log('3. Visit: http://localhost:3000');
        console.log('\n');
        return true;

    } catch (error) {
        console.error('\n❌ Error:', error.message);

        if (error.code === 403) {
            console.log('\n💡 Permission Error! Make sure:');
            console.log(`   1. Service account ${clientEmail} has access to the sheet`);
            console.log(`   2. The sheet is shared with "Viewer" permission`);
        } else if (error.code === 404) {
            console.log('\n💡 Sheet Not Found! Make sure:');
            console.log(`   1. GOOGLE_SHEET_ID is correct: ${sheetId}`);
            console.log(`   2. The sheet exists and is accessible`);
        }

        return false;
    }
}

// Run the test
testGoogleSheetsConnection()
    .then(success => {
        process.exit(success ? 0 : 1);
    })
    .catch(error => {
        console.error('Unexpected error:', error);
        process.exit(1);
    });
