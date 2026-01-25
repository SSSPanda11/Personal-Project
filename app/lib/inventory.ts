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

        const transformGoogleDriveLink = (url: string) => {
            if (!url) return url;
            // Check if it's a Google Drive sharing link
            const match = url.match(/\/file\/d\/([^\/]+)/);
            if (match && match[1]) {
                return `https://drive.google.com/uc?export=view&id=${match[1]}`;
            }
            return url;
        };

        return rows.map((row) => {
            const mainImage = transformGoogleDriveLink(row[4]);
            return {
                id: row[0],
                name: row[1],
                price: Number(row[2]),
                description: row[3],
                image: mainImage,
                category: row[5],
                images: [
                    mainImage,
                    transformGoogleDriveLink(row[6]),
                    transformGoogleDriveLink(row[7])
                ].filter(Boolean),
            };
        });

    } catch (error) {
        console.error('Error fetching products from sheets:', error);
        return null;
    }
}
