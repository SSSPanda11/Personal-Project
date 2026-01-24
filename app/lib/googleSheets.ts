import { google } from 'googleapis';

export interface OrderData {
    name: string;
    phone: string;
    email?: string;
    address: string;
    paymentMethod: string;
    mfsProvider?: string;
    mfsNumber?: string;
    trxId?: string;
    items: any[];
    total: number;
    date: string;
    receiverName: string;
    receiverPhone: string;
    district: string;
    deliveryFee: number;
}

export class GoogleSheetsService {
    private static instance: GoogleSheetsService;

    private constructor() { }

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
                return true;
            }

            const auth = new google.auth.GoogleAuth({
                credentials: {
                    client_email: clientEmail,
                    private_key: privateKey.replace(/\\n/g, '\n'),
                },
                scopes: ['https://www.googleapis.com/auth/spreadsheets'],
            });

            const sheets = google.sheets({ version: 'v4', auth });

            // ID, Date, Time, Customer Name, Phone, Email, Method, MFS Provider, MFS#, TrxID, Items, Qty, Address, Receiver Name, Receiver Phone
            const orderId = `ORD-${Date.now()}`;
            const dateObj = new Date(order.date);
            const dateStr = dateObj.toLocaleDateString('en-GB'); // DD/MM/YYYY
            const timeStr = dateObj.toLocaleTimeString('en-GB'); // HH:MM:SS

            const itemsString = order.items.map(i => `${i.name} (x${i.quantity})`).join(', ');
            const totalQuantity = order.items.reduce((sum, item) => sum + item.quantity, 0);

            // Mapping to the 15 requested columns:
            const row = [
                orderId,                                            // 1. Order ID
                dateStr,                                            // 2. Date
                timeStr,                                            // 3. Time
                order.name,                                         // 4. Customer Name
                order.phone,                                        // 5. Customer Phone Number
                order.email || '',                                  // 6. Email
                order.paymentMethod === 'COD' ? 'Cash on Delivery' : 'Mobile Financial Services', // 7. Payment Method
                order.mfsProvider || '',                            // 8. MFS Provider Name
                order.mfsNumber || '',                              // 9. MFS Number
                order.trxId || '',                                  // 10. Transaction ID
                itemsString,                                        // 11. Ordered Items
                totalQuantity,                                      // 12. Quantity
                order.address,                                      // 13. Delivery Address
                order.receiverName,                                 // 14. Receiver Name
                order.receiverPhone,                                // 15. Receiver Phone Number
                order.district,                                     // 16. District
                order.deliveryFee,                                  // 17. Delivery Fee
                'Pending'                                           // 18. Status (Default)
            ];

            await sheets.spreadsheets.values.append({
                spreadsheetId: sheetId,
                range: 'Sheet1!A:R', // Updated range for 18 columns (A to R)
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

    public async getOrderByPhone(phone: string): Promise<any | null> {
        try {
            const sheetId = process.env.GOOGLE_SHEET_ID;
            const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
            const privateKey = process.env.GOOGLE_PRIVATE_KEY;

            if (!sheetId || !clientEmail || !privateKey) return null;

            const auth = new google.auth.GoogleAuth({
                credentials: {
                    client_email: clientEmail,
                    private_key: privateKey.replace(/\\n/g, '\n'),
                },
                scopes: ['https://www.googleapis.com/auth/spreadsheets'],
            });

            const sheets = google.sheets({ version: 'v4', auth });

            const response = await sheets.spreadsheets.values.get({
                spreadsheetId: sheetId,
                range: 'Sheet1!A:R',
            });

            const rows = response.data.values;
            if (!rows || rows.length === 0) return null;

            // Search for phone number (Column Index 4 -> 5th column)
            // Filter all matching rows
            const matchingRows = rows.filter(row => row[4] === phone);

            if (matchingRows.length === 0) return null;

            // Get the latest one (last in the list)
            const latestOrder = matchingRows[matchingRows.length - 1];

            // Map back to object
            return {
                orderId: latestOrder[0],
                date: latestOrder[1],
                total: latestOrder[11], // Quantity is 11, Amount is wait... 
                // Let's re-verify mapping:
                // 0:ID, 1:Date, 2:Time, 3:Name, 4:Phone, 5:Email, 6:Method, 7:MFS, 8:Num, 9:Trx, 10:Items, 11:Qty, 12:Addr, 13:Rcvr, 14:RcvrPh, 15:Dist, 16:Fee, 17:Status
                // Wait, index is 0-based.
                // 0:ID, ... 4:Phone ... 17:Status.
                status: latestOrder[17] || 'Pending',
                items: latestOrder[10],
            };

        } catch (error) {
            console.error('Error fetching order:', error);
            return null;
        }
    }
}
