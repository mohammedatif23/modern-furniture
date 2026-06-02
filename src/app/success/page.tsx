import Link from "next/link";

export default function SuccessPage(){

return(

<main
className="
min-h-screen
bg-black
text-[#D4AF37]
flex
items-center
justify-center
px-6
"
>

<div
className="
max-w-2xl
text-center
"
>

<div
className="
text-8xl
mb-8
"
>

✓

</div>

<h1
className="
text-6xl
font-bold
mb-8
"
>

Order Placed

</h1>

<p
className="
text-xl
text-gray-400
mb-14
"
>

Thank you for shopping.

Your order has been received.

</p>

<div
className="
flex
gap-5
justify-center
flex-wrap
"
>

<Link

href="/shop"

className="
bg-gradient-to-r
from-[#7A5800]
via-[#D4AF37]
to-[#7A5800]
text-black
font-bold
px-10
py-5
rounded-2xl
"

>

Continue Shopping

</Link>

<Link

href="/"

className="
border
border-[#D4AF37]
px-10
py-5
rounded-2xl
"

>

Home

</Link>

</div>

</div>

</main>

);

}