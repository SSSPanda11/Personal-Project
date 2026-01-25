import { NextResponse } from 'next/server';
import { fetchProductsFromSheets } from '@/lib/inventory';
import { PRODUCTS } from '@/data/products';

export const revalidate = 60; // Revalidate every 60 seconds

export async function GET() {
    try {
        // Try to fetch from Google Sheets
        const productsFromSheets = await fetchProductsFromSheets();

        // If successful, return products from sheets
        if (productsFromSheets && productsFromSheets.length > 0) {
            return NextResponse.json({
                source: 'google-sheets',
                count: productsFromSheets.length,
                products: productsFromSheets,
            });
        }

        // Fallback to static data
        console.warn('Using static fallback data');
        return NextResponse.json({
            source: 'static-fallback',
            count: PRODUCTS.length,
            products: PRODUCTS,
        });

    } catch (error) {
        console.error('Error in products API:', error);

        // Return static data on error
        return NextResponse.json({
            source: 'static-fallback-error',
            count: PRODUCTS.length,
            products: PRODUCTS,
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
}
