"use client";

import { useEffect,useState } from "react";

import { supabase }
from
"../../lib/supabase";

export default function OrdersPage(){

const [orders,setOrders]=
useState<any[]>([]);

const [email,setEmail]=
useState("");

async function searchOrders(){

if(!email){

return;

}

const { data }=

await supabase

.from("orders")

.select("*")

.eq(
"customer_email",
email
)

.order(
"id",
{
ascending:false
}
);

if(data){

setOrders(
data
);

}

}

return(

<main
className="
min-h-screen
bg-black
text-[#D4AF37]
px-8
py-20
"
>

<div
className="
max-w-5xl
mx-auto
"
>

<h1
className="
text-6xl
font-bold
mb-10
"
>

My Orders

</h1>

<div
className="
flex
gap-4
mb-10
"
>

<input

placeholder=
"Enter Email"

value=
{email}

onChange={
(e)=>

setEmail(
e.target.value
)

}

className="
flex-1
bg-black
border
border-[#D4AF37]
rounded-xl
p-5
"

/>

<button

onClick={
searchOrders
}

className="
bg-[#D4AF37]
text-black
px-8
rounded-xl
"

>

Search

</button>

</div>

<div
className="
space-y-5
"
>

{

orders.map(
(
order
)=>(

<div

key={
order.id
}

className="
border
border-[#D4AF37]
rounded-2xl
p-6
"

>

<h3>

Order #
{
order.id
}

</h3>

<p>

Total:
$

{
order.total
}

</p>

<p>

Date:
{
order.created_at
}

</p>

<div
className="
mt-3
"
>

{

order.items?.map(
(
item:any,
index:number
)=>

<p
key={index}
>

•

{
item.title
}

</p>

)

}

</div>

</div>

)

)

}

</div>

</div>

</main>

);

}