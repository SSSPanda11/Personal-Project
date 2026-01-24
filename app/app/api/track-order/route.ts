import { NextResponse } from 'next/server';
import { GoogleSheetsService } from '@/lib/googleSheets';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const phone = searchParams.get('phone');

    if (!phone) {
        return NextResponse.json({ success: false, message: 'Phone number required' }, { status: 400 });
    }

    try {
        const service = GoogleSheetsService.getInstance();
        const order = await service.getOrderByPhone(phone);

        if (order) {
            return NextResponse.json({ success: true, order });
        } else {
            return NextResponse.json({ success: false, message: 'No order found with this phone number.' }, { status: 404 });
        }
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}
