"use client";

import { useEffect, useState } from "react";

import ProductCard from "./ProductCard";

import { supabase } from "../lib/supabase";

export default function FeaturedProducts(){

const [
products,
setProducts
]
=
useState<any[]>([]);

useEffect(()=>{

async function load(){

const {
data
}
=
await supabase

.from(
"products"
)

.select("*")

.limit(4);

if(data){

setProducts(
data
);

}

}

load();

},[]);

return(

<section
className="
py-24
"
>

<div
className="
max-w-7xl
mx-auto
px-8
"
>

<h2
className="
text-5xl
font-bold
mb-14
"
>

Featured Products

</h2>

<div
className="
grid
grid-cols-1
sm:grid-cols-2
lg:grid-cols-4
gap-8
"
>

{

products.map(
(
product
)=>

<ProductCard

key={
product.id
}

id={
product.id
}

title={
product.title
}

price={
product.price
.toString()
}

image={
product.image
}

/>

)

}

</div>

</div>

</section>

);

}