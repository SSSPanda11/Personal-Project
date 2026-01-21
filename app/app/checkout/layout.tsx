import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Secure Checkout | ShopBD",
    description: "Safe and secure checkout process. Enter your delivery details and choose a payment method.",
};

export default function CheckoutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
