"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function Navbar() {

const { cart } = useCart();

return (

<nav
className="
w-full
flex
justify-between
items-center
px-6
md:px-12
py-6
bg-black
"
>

<Link href="/">

<h1
className="
text-[#D4AF37]
text-2xl
md:text-5xl
font-bold
"
>

ModernFurniture

</h1>

</Link>

<div
className="
flex
items-center
gap-8
"
>

<Link
href="/shop"
className="
text-white
hidden
md:block
"
>

Shop

</Link>

<Link href="/cart">

<button
className="
bg-[#D4AF37]
text-black
px-6
py-4
rounded-2xl
font-semibold
"
>

Cart ({cart.length})

</button>

</Link>

</div>

</nav>

);

}