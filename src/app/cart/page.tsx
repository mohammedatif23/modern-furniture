"use client";

import {
useCart
}
from
"../../context/CartContext";
import Link from "next/link";

export default function CartPage(){

const {
cart,
removeFromCart}=
useCart();

const total=
cart.reduce(
(
sum,
item
)=>

sum+
item.price,

0
);

return(

<main
className="
max-w-7xl
mx-auto
px-8
py-20
"
>

<h1
className="
text-6xl
font-bold
mb-16
"
>

Cart

</h1>

{

cart.length===0

?

<p>

Cart Empty

</p>

:

<>

{

cart.map(
(
item,
index
)=>(

<div
key={
`${item.id}-${index}`
}
className="
border
p-8
rounded-xl
mb-6
flex
justify-between
"
>

<div>

<h2
className="
text-2xl
"
>

{
item.title
}

</h2>

<p>

$
{
item.price
}

</p>

</div>

<button
onClick={() =>
  removeFromCart(index)
}
className="
bg-red-500
text-white
px-6
rounded-xl
"
>
Remove
</button>

</div>

)

)

}

<h2
className="
text-4xl
font-bold
mt-10
"
>

Total:

<Link href="/checkout">

<button
className="
mt-8
bg-black
text-white
px-8
py-4
rounded-xl
"
>

Proceed To Checkout

</button>

</Link>

</h2>

</>

}

</main>

);

}