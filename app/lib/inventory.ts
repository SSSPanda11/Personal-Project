import { google } from 'googleapis';
import { Product } from '@/data/products';

export async function fetchProductsFromSheets(): Promise<Product[] | null> {
    try {
        const sheetId = process.env.GOOGLE_SHEET_ID;
        const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
        const privateKey = process.env.GOOGLE_PRIVATE_KEY;

        if (!sheetId || !clientEmail || !privateKey) {
            console.warn('Missing Google Credentials. Returning null (fallback to static data).');
            return null;
        }

        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: clientEmail,
                private_key: privateKey.replace(/\\n/g, '\n'),
            },
            scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
        });

        const sheets = google.sheets({ version: 'v4', auth });

        // Assuming products are in 'Products' sheet or 'Sheet2'
        // Format: ID, Name, Price, Description, Image, Category, Image2, Image3...
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: sheetId,
            range: 'Products!A2:H', // Skipping header row
        });

        const rows = response.data.values;
        if (!rows) return [];

        return rows.map((row) => ({
            id: row[0],
            name: row[1],
            price: Number(row[2]),
            description: row[3],
            image: row[4],
            category: row[5],
            images: [row[4], row[6], row[7]].filter(Boolean), // Create array from multiple columns
        }));

    } catch (error) {
        console.error('Error fetching products from sheets:', error);
        return null;
    }
}
