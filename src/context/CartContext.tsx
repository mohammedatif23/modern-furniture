"use client";

import {
createContext,
useContext,
useState,
ReactNode,
} from "react";

type Item = {
id:number;
title:string;
price:number;
};

type CartType = {
cart: Item[];

addToCart:(item:Item)=>void;

removeFromCart:
(id:number)=>void;
};

const CartContext =
createContext<CartType | null>(null);

export function CartProvider({
children,
}:{
children:ReactNode;
}) {

const [cart,setCart] =
useState<Item[]>([]);

function addToCart(item:Item){

setCart((prev)=>[
...prev,
item,
]);

}
function removeFromCart(
index:number
){

setCart(
(prev)=>{

const copy=
[...prev];

copy.splice(
index,
1
);

return copy;

}

);

}

return (

<CartContext.Provider
value={{
cart,
addToCart,
removeFromCart,
}}
>

{children}

</CartContext.Provider>

);

}

export function useCart(){

const ctx=
useContext(CartContext);

if(!ctx){

throw new Error(
"useCart error"
);

}

return ctx;

}