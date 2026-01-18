import { NextResponse } from 'next/server';
import { GoogleSheetsService, OrderData } from '@/lib/googleSheets';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const orderData: OrderData = body;

        // Basic Validation
        if (!orderData.name || !orderData.phone || !orderData.items || orderData.items.length === 0) {
            return NextResponse.json({ success: false, message: 'Invalid data' }, { status: 400 });
        }

        const service = GoogleSheetsService.getInstance();
        const success = await service.appendOrder(orderData);

        if (success) {
            return NextResponse.json({ success: true, message: 'Order placed successfully' });
        } else {
            return NextResponse.json({ success: false, message: 'Failed to record order' }, { status: 500 });
        }

    } catch (error) {
        console.error('Order API Error:', error);
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}
