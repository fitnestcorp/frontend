import OrderItem from "@/components/profile/OrderItem";
import { Cart } from "@/interfaces";
import { useState } from "react";

const PurchaseConfirmation = (cart:Cart) => {

    const cartItems = cart.cartItems;
    
    return (
        <div>
        <h1>Confirmación de Compra</h1>
        <div>
            <h2>Items en el carrito</h2>
            {cartItems.map(item => (
            <OrderItem 
                    image={item.image_url} title={item.name} key={item.id}
                    {...item}            />
            ))}
        </div>
        </div>
    );

}

export default PurchaseConfirmation;