import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Order Success | ShopBD",
    description: "Thank you for your purchase. Your order has been placed successfully.",
};

export default function SuccessLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
