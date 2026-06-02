"use client";

import { useEffect, useState } from "react";

import {
useParams,
useRouter
}
from
"next/navigation";

import { supabase }
from
"../../../lib/supabase";

import { useCart }
from
"../../../context/CartContext";

export default function ProductPage(){

const params=
useParams();

const router=
useRouter();

const {
addToCart
}
=
useCart();

const [product,setProduct]=
useState<any>(null);

const [related,setRelated]=
useState<any[]>([]);

useEffect(()=>{

loadProduct();

},[]);

async function loadProduct(){

const { data }=

await supabase

.from(
"products"
)

.select("*")

.eq(
"id",
params.id
)

.single();

setProduct(
data
);

if(data){

loadRelated(
data.category,
data.id
);

}

}

async function loadRelated(

category:string,

id:number

){

const { data }=

await supabase

.from(
"products"
)

.select("*")

.eq(
"category",
category
)

.neq(
"id",
id
)

.limit(
4
);

if(data){

setRelated(
data
);

}

}

if(!product){

return(

<div
className="
min-h-screen
bg-black
text-[#D4AF37]
flex
items-center
justify-center
text-3xl
"
>

Loading...

</div>

);

}

return(

<main
className="
min-h-screen
bg-black
text-white
px-8
py-20
"
>

<div
className="
max-w-7xl
mx-auto
"
>

<div
className="
grid
md:grid-cols-2
gap-14
items-center
"
>

<img

src={
product.image
}

alt={
product.title
}

className="
w-full
h-[650px]
object-cover
rounded-3xl
"

/>

<div>

<p
className="
text-[#D4AF37]
text-xl
mb-3
"
>

{
product.category
}

</p>

<h1
className="
text-6xl
font-bold
mb-8
"
>

{
product.title
}

</h1>

<h2
className="
text-5xl
mb-10
"
>

$

{
product.price
}

</h2>

<button

onClick={()=>

addToCart(
product
)

}

className="
w-full

bg-gradient-to-r

from-[#7A5800]

via-[#D4AF37]

to-[#7A5800]

text-black

font-bold

py-5

rounded-2xl
"

>

Add To Cart

</button>

<button

onClick={()=>{

addToCart(
product
);

router.push(
"/checkout"
);

}}

className="
w-full

mt-5

border

border-[#D4AF37]

text-[#D4AF37]

font-bold

py-5

rounded-2xl
"

>

Buy Now

</button>

</div>

</div>

<div
className="
mt-24
"
>

<h2
className="
text-4xl
font-bold
mb-10
text-[#D4AF37]
"
>

Related Products

</h2>

<div
className="
grid
grid-cols-1
md:grid-cols-4
gap-6
"
>

{

related.map(
(item)=>(

<div

key={
item.id
}

className="
border
border-[#D4AF37]
rounded-2xl
overflow-hidden
"

>

<img

src={
item.image
}

className="
h-64
w-full
object-cover
"

/>

<div
className="
p-5
space-y-2
"
>

<h3
className="
text-xl
"
>

{
item.title
}

</h3>

<p>

$

{
item.price
}

</p>

<button

onClick={()=>

router.push(
`/shop/${item.id}`
)

}

className="
w-full
mt-3
bg-[#D4AF37]
text-black
py-3
rounded-xl
"

>

View

</button>

</div>

</div>

)

)

}

</div>

</div>

</div>

</main>

);

}