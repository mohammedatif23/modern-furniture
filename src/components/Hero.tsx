import Link from "next/link";

export default function Hero() {

return (

<section className="bg-black text-white">

<div
className="
max-w-7xl
mx-auto
px-6
md:px-12
py-16

grid
grid-cols-1
lg:grid-cols-2

gap-10
items-center
"
>

<div>

<h1
className="
text-[#D4AF37]
text-5xl
sm:text-6xl
md:text-7xl
lg:text-8xl
font-bold
leading-tight
"
>

Modern
<br />

Furniture

</h1>

<p
className="
mt-8
text-lg
md:text-2xl
text-gray-300
max-w-xl
leading-relaxed
"
>

Discover luxury sofas,
premium beds,
dining tables and elegant interiors
crafted for modern living.

</p>

<div
className="
mt-10
flex
flex-wrap
gap-4
"
>

<Link href="/shop">

<button
className="
bg-[#D4AF37]
text-black
px-8
py-4
rounded-2xl
font-bold
"
>

Shop Now

</button>

</Link>

<button
className="
border
border-[#D4AF37]
text-[#D4AF37]
px-8
py-4
rounded-2xl
"
>

Explore

</button>

</div>

</div>

<div>

<img
src="/hero.jpg"
alt="Furniture"
className="
w-full
h-[300px]
md:h-[550px]
object-cover
rounded-3xl
"
/>

</div>

</div>

</section>

);

}