import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface OrderEmailData {
    orderId: string;
    customerName: string;
    customerEmail: string;
    items: Array<{ name: string; quantity: number; price: number }>;
    total: number;
    deliveryFee: number;
    district: string;
    address: string;
    paymentMethod: string;
}

export async function sendOrderConfirmationEmail(data: OrderEmailData): Promise<boolean> {
    if (!process.env.RESEND_API_KEY) {
        console.warn('RESEND_API_KEY not configured. Skipping email.');
        return false;
    }

    if (!data.customerEmail) {
        console.log('No customer email provided. Skipping email.');
        return false;
    }

    try {
        const emailHtml = generateOrderEmailHTML(data);

        await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || 'orders@shopbd.com',
            to: data.customerEmail,
            subject: `Order Confirmation - ${data.orderId}`,
            html: emailHtml,
        });

        console.log(`Order confirmation email sent to ${data.customerEmail}`);
        return true;
    } catch (error) {
        console.error('Failed to send email:', error);
        return false;
    }
}

export async function sendAdminNotification(data: OrderEmailData): Promise<boolean> {
    if (!process.env.RESEND_API_KEY || !process.env.ADMIN_EMAIL) {
        return false;
    }

    try {
        const emailHtml = generateAdminEmailHTML(data);

        await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || 'orders@shopbd.com',
            to: process.env.ADMIN_EMAIL,
            subject: `New Order Received - ${data.orderId}`,
            html: emailHtml,
        });

        console.log(`Admin notification sent for order ${data.orderId}`);
        return true;
    } catch (error) {
        console.error('Failed to send admin notification:', error);
        return false;
    }
}

function generateOrderEmailHTML(data: OrderEmailData): string {
    const itemsHtml = data.items.map(item => `
        <tr>
            <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">${item.name}</td>
            <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: center;">${item.quantity}</td>
            <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right;">৳${item.price.toLocaleString()}</td>
        </tr>
    `).join('');

    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Order Confirmation</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 40px 0;">
            <tr>
                <td align="center">
                    <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                        <!-- Header -->
                        <tr>
                            <td style="background-color: #000000; padding: 30px; text-align: center;">
                                <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">ShopBD</h1>
                            </td>
                        </tr>
                        
                        <!-- Content -->
                        <tr>
                            <td style="padding: 40px 30px;">
                                <h2 style="margin: 0 0 20px 0; color: #111827; font-size: 24px;">Thank You for Your Order!</h2>
                                <p style="margin: 0 0 20px 0; color: #6b7280; font-size: 16px; line-height: 1.5;">
                                    Hi ${data.customerName},<br><br>
                                    We've received your order and it's being processed. Here are your order details:
                                </p>
                                
                                <!-- Order ID -->
                                <div style="background-color: #f9fafb; padding: 15px; border-radius: 6px; margin-bottom: 30px;">
                                    <p style="margin: 0; color: #6b7280; font-size: 14px;">Order ID</p>
                                    <p style="margin: 5px 0 0 0; color: #111827; font-size: 18px; font-weight: bold;">${data.orderId}</p>
                                </div>
                                
                                <!-- Order Items -->
                                <h3 style="margin: 0 0 15px 0; color: #111827; font-size: 18px;">Order Items</h3>
                                <table width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #e5e7eb; border-radius: 6px; overflow: hidden; margin-bottom: 20px;">
                                    <thead>
                                        <tr style="background-color: #f9fafb;">
                                            <th style="padding: 12px; text-align: left; color: #6b7280; font-size: 14px; font-weight: 600;">Item</th>
                                            <th style="padding: 12px; text-align: center; color: #6b7280; font-size: 14px; font-weight: 600;">Qty</th>
                                            <th style="padding: 12px; text-align: right; color: #6b7280; font-size: 14px; font-weight: 600;">Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${itemsHtml}
                                    </tbody>
                                </table>
                                
                                <!-- Pricing -->
                                <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
                                    <tr>
                                        <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Subtotal</td>
                                        <td style="padding: 8px 0; text-align: right; color: #111827; font-size: 14px;">৳${(data.total - data.deliveryFee).toLocaleString()}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Delivery (${data.district})</td>
                                        <td style="padding: 8px 0; text-align: right; color: #111827; font-size: 14px;">৳${data.deliveryFee.toLocaleString()}</td>
                                    </tr>
                                    <tr style="border-top: 2px solid #e5e7eb;">
                                        <td style="padding: 12px 0; color: #111827; font-size: 18px; font-weight: bold;">Total</td>
                                        <td style="padding: 12px 0; text-align: right; color: #111827; font-size: 18px; font-weight: bold;">৳${data.total.toLocaleString()}</td>
                                    </tr>
                                </table>
                                
                                <!-- Delivery Info -->
                                <h3 style="margin: 0 0 15px 0; color: #111827; font-size: 18px;">Delivery Information</h3>
                                <div style="background-color: #f9fafb; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
                                    <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 14px;">Address</p>
                                    <p style="margin: 0; color: #111827; font-size: 14px; line-height: 1.5;">${data.address}</p>
                                </div>
                                
                                <!-- Payment Method -->
                                <div style="background-color: #f9fafb; padding: 15px; border-radius: 6px;">
                                    <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 14px;">Payment Method</p>
                                    <p style="margin: 0; color: #111827; font-size: 14px;">${data.paymentMethod}</p>
                                </div>
                            </td>
                        </tr>
                        
                        <!-- Footer -->
                        <tr>
                            <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
                                <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 14px;">
                                    Questions? Contact us at support@shopbd.com
                                </p>
                                <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                                    © ${new Date().getFullYear()} ShopBD. All rights reserved.
                                </p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
    `;
}

function generateAdminEmailHTML(data: OrderEmailData): string {
    const itemsHtml = data.items.map(item => `
        <tr>
            <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${item.name}</td>
            <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; text-align: center;">${item.quantity}</td>
            <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; text-align: right;">৳${item.price.toLocaleString()}</td>
        </tr>
    `).join('');

    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>New Order Notification</title>
    </head>
    <body style="margin: 0; padding: 20px; font-family: Arial, sans-serif; background-color: #f3f4f6;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; padding: 30px;">
            <h1 style="margin: 0 0 20px 0; color: #dc2626; font-size: 24px;">🔔 New Order Received</h1>
            
            <div style="background-color: #fef2f2; border-left: 4px solid #dc2626; padding: 15px; margin-bottom: 20px;">
                <p style="margin: 0; color: #991b1b; font-weight: bold;">Order ID: ${data.orderId}</p>
            </div>
            
            <h3 style="margin: 20px 0 10px 0; color: #111827;">Customer Details</h3>
            <p style="margin: 5px 0; color: #6b7280;"><strong>Name:</strong> ${data.customerName}</p>
            <p style="margin: 5px 0; color: #6b7280;"><strong>Email:</strong> ${data.customerEmail}</p>
            <p style="margin: 5px 0; color: #6b7280;"><strong>District:</strong> ${data.district}</p>
            <p style="margin: 5px 0; color: #6b7280;"><strong>Address:</strong> ${data.address}</p>
            
            <h3 style="margin: 20px 0 10px 0; color: #111827;">Order Items</h3>
            <table width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #e5e7eb; border-radius: 6px;">
                <thead>
                    <tr style="background-color: #f9fafb;">
                        <th style="padding: 8px; text-align: left; font-size: 14px;">Item</th>
                        <th style="padding: 8px; text-align: center; font-size: 14px;">Qty</th>
                        <th style="padding: 8px; text-align: right; font-size: 14px;">Price</th>
                    </tr>
                </thead>
                <tbody>
                    ${itemsHtml}
                </tbody>
            </table>
            
            <div style="margin-top: 20px; padding: 15px; background-color: #f9fafb; border-radius: 6px;">
                <p style="margin: 5px 0; color: #6b7280;"><strong>Payment Method:</strong> ${data.paymentMethod}</p>
                <p style="margin: 5px 0; color: #6b7280;"><strong>Delivery Fee:</strong> ৳${data.deliveryFee.toLocaleString()}</p>
                <p style="margin: 5px 0; color: #111827; font-size: 18px;"><strong>Total:</strong> ৳${data.total.toLocaleString()}</p>
            </div>
        </div>
    </body>
    </html>
    `;
}
