"use client";

import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
import { Product } from '../data/products';

export interface CartItem extends Product {
    quantity: number;
}

interface CartState {
    items: CartItem[];
}

type CartAction =
    | { type: 'ADD_ITEM'; payload: Product }
    | { type: 'REMOVE_ITEM'; payload: string }
    | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
    | { type: 'CLEAR_CART' }
    | { type: 'LOAD_CART'; payload: CartItem[] };

const initialState: CartState = {
    items: [],
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
    switch (action.type) {
        case 'ADD_ITEM': {
            const existingItemIndex = state.items.findIndex((item) => item.id === action.payload.id);
            if (existingItemIndex > -1) {
                // Item exists, increment quantity
                const newItems = [...state.items];
                newItems[existingItemIndex].quantity += 1;
                return { ...state, items: newItems };
            } else {
                // Item doesn't exist, add it
                return { ...state, items: [...state.items, { ...action.payload, quantity: 1 }] };
            }
        }
        case 'REMOVE_ITEM':
            return { ...state, items: state.items.filter((item) => item.id !== action.payload) };
        case 'UPDATE_QUANTITY':
            return {
                ...state,
                items: state.items.map((item) =>
                    item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
                ),
            };
        case 'CLEAR_CART':
            return initialState;
        case 'LOAD_CART':
            return { ...state, items: action.payload };
        default:
            return state;
    }
};

interface CartContextType {
    items: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(cartReducer, initialState);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('shopping-cart');
        if (savedCart) {
            try {
                const parsedCart = JSON.parse(savedCart);
                dispatch({ type: 'LOAD_CART', payload: parsedCart });
            } catch (error) {
                console.error('Failed to parse cart from local storage:', error);
            }
        }
        setIsLoaded(true);
    }, []);

    // Save to localStorage on change
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('shopping-cart', JSON.stringify(state.items));
        }
    }, [state.items, isLoaded]);

    const addToCart = (product: Product) => {
        dispatch({ type: 'ADD_ITEM', payload: product });
    };

    const removeFromCart = (id: string) => {
        dispatch({ type: 'REMOVE_ITEM', payload: id });
    };

    const updateQuantity = (id: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(id);
            return;
        }
        dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    };

    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
    };

    const cartCount = state.items.reduce((total, item) => total + item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                items: state.items,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                cartCount,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
