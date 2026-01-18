import { google } from 'googleapis';

export interface OrderData {
    name: string;
    phone: string;
    email?: string;
    address: string;
    paymentMethod: string;
    mfsNumber?: string;
    trxId?: string;
    items: any[];
    total: number;
    date: string;
}

export class GoogleSheetsService {
    private static instance: GoogleSheetsService;
    private auth: any;
    private sheets: any;

    private constructor() {
        // Initialize auth if credentials exist
        // For now we will rely on checking evn vars in the method
    }

    public static getInstance(): GoogleSheetsService {
        if (!GoogleSheetsService.instance) {
            GoogleSheetsService.instance = new GoogleSheetsService();
        }
        return GoogleSheetsService.instance;
    }

    public async appendOrder(order: OrderData): Promise<boolean> {
        try {
            console.log('Attempting to save order to Google Sheets:', order.phone);

            const sheetId = process.env.GOOGLE_SHEET_ID;
            const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
            const privateKey = process.env.GOOGLE_PRIVATE_KEY;

            if (!sheetId || !clientEmail || !privateKey) {
                console.warn('Google Sheets Credentials missing. specific environment variables are required.');
                console.log('--- ORDER MOCK SAVE ---');
                console.log(JSON.stringify(order, null, 2));
                console.log('-----------------------');
                return true; // Return true to simulate success in mock mode
            }

            // If credentials exist, try real auth
            const auth = new google.auth.GoogleAuth({
                credentials: {
                    client_email: clientEmail,
                    private_key: privateKey.replace(/\\n/g, '\n'), // Fix newlines in env var
                },
                scopes: ['https://www.googleapis.com/auth/spreadsheets'],
            });

            const sheets = google.sheets({ version: 'v4', auth });

            // Format Rows
            // Maps to: ID, Date, Name, Phone, Email, Method, MFS#, TrxID, Items, Total, Address
            // Generating a simple Order ID for now (Timestamp based)
            const orderId = `ORD-${Date.now()}`;
            const itemsString = order.items.map(i => `${i.name} (x${i.quantity})`).join(', ');

            const row = [
                orderId,
                order.date,
                order.name,
                order.phone,
                order.email || '',
                order.paymentMethod,
                order.mfsNumber || '',
                order.trxId || '',
                itemsString,
                order.total,
                order.address
            ];

            await sheets.spreadsheets.values.append({
                spreadsheetId: sheetId,
                range: 'Sheet1!A:K', // Assuming Sheet1 and Columns A to K
                valueInputOption: 'USER_ENTERED',
                requestBody: {
                    values: [row],
                },
            });

            console.log(`Order ${orderId} saved to Sheets.`);
            return true;

        } catch (error) {
            console.error('Failed to append to Google Sheets:', error);
            return false;
        }
    }
}
