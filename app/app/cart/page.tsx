import CartContent from "@/components/CartContent";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Your Shopping Cart | ShopBD",
    description: "Review your items and prepare for checkout.",
};

export default function CartPage() {
    return <CartContent />
}
