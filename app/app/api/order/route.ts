import { NextResponse } from 'next/server';
import { GoogleSheetsService, OrderData } from '@/lib/googleSheets';
import { sendOrderConfirmationEmail, sendAdminNotification } from '@/lib/email';

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
            // Generate Order ID for email
            const orderId = `ORD-${Date.now()}`;

            // Send emails asynchronously (don't wait for completion)
            const emailData = {
                orderId,
                customerName: orderData.name,
                customerEmail: orderData.email || '',
                items: orderData.items,
                total: orderData.total,
                deliveryFee: orderData.deliveryFee,
                district: orderData.district,
                address: orderData.address,
                paymentMethod: orderData.paymentMethod === 'COD' ? 'Cash on Delivery' : `${orderData.mfsProvider} (MFS)`,
            };

            // Send emails without blocking the response
            Promise.all([
                sendOrderConfirmationEmail(emailData),
                sendAdminNotification(emailData)
            ]).catch(err => console.error('Email sending error:', err));

            return NextResponse.json({ success: true, message: 'Order placed successfully' });
        } else {
            return NextResponse.json({ success: false, message: 'Failed to record order' }, { status: 500 });
        }

    } catch (error) {
        console.error('Order API Error:', error);
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}
