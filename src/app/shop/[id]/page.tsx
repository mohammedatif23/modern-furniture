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

const [reserveFee, setReserveFee] =
  useState<number>(20);

const [reserving, setReserving] =
  useState(false);

const [product,setProduct]=
useState<any>(null);

const [related,setRelated]=
useState<any[]>([]);  

const [currentUserId, setCurrentUserId] =
  useState<string | null>(null);

const [showReserve, setShowReserve] =
  useState(false);

useEffect(()=>{

  async function loadCurrentUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  setCurrentUserId(user?.id || null);
}

loadCurrentUser();

loadProduct();

},[]);

async function loadProduct(){



const { data, error } = await supabase
  .from("products")
  .select("*")
  .eq("id", Number(params.id))
  .single();

console.log("PRODUCT DATA:", data);
console.log("PRODUCT ERROR:", error);
  

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

.from("products")

.select("*")

.eq("category",category)

.neq("id",id)

.limit(4); 

if(data){

setRelated(
data
);

}

}

async function reserveItem(
  weeks: number,
  fee: number
) {
  console.log(
    "RESERVE CLICKED",
    weeks,
    fee
  );

  const {
  data: { user },
} = await supabase.auth.getUser();



  const reserveUntil = new Date();

  reserveUntil.setDate(
    reserveUntil.getDate() +
    weeks * 7
  );

  console.log("PRODUCT ID:", product.id);

    console.log("PRODUCT ID:", product.id);
    console.log("PRODUCT:", product);

    const result = await supabase
  .from("products")
  .update({
    is_reserved: true,
    reserved_until: reserveUntil.toISOString(),
    reservation_fee: fee,
    reserved_by: user?.id,
  })
  .eq("id", product.id)
  .select();

console.log(result);

  console.log(
    "UPDATE RESULT:",
    result
  );

  if (result.error) {
    alert(result.error.message);
    return;
  }

  alert(
    "Item reserved successfully"
  );

  await loadProduct();
}

if (!product) {
  return (
    <div
      className="
      min-h-screen
      flex
      items-center
      justify-center
      text-white
      text-3xl
      "
    >
      Loading Product...
    </div>
  );
}

const isReservedByAnotherUser =
  product?.is_reserved &&
  product?.reserved_by !== currentUserId;



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

{
product.is_reserved && (

<div
className="
mb-6
bg-yellow-500
text-black
font-bold
px-5
py-3
rounded-xl
inline-block
"
>

Reserved Until {" "}
{
new Date(
product.reserved_until
).toLocaleDateString()
}

</div>

)
}

<button
disabled={
  product.is_reserved &&
  product.reserved_by !== currentUserId
}
onClick={() =>
  addToCart({
    id: product.id,
    title: product.title,
    price: product.price,
    image: product.image,
  })
}
className={`
w-full
font-bold
py-5
rounded-2xl

${
isReservedByAnotherUser
? "bg-gray-700 text-gray-400 cursor-not-allowed"
: "bg-gradient-to-r from-[#7A5800] via-[#D4AF37] to-[#7A5800] text-black"
}
`} 
>
{
isReservedByAnotherUser
? "Reserved"
: "Add to Cart"
}
</button>

<button
  onClick={() =>
    setShowReserve(!showReserve)
  }
  className="
  w-full
  mt-5
  border
  border-white
  text-white
  py-5
  rounded-2xl
  "
>
  Reserve Item
</button>

{showReserve && (

<div
  className="
  mt-5
  border
  border-gray-600
  rounded-2xl
  p-6
  space-y-4
  "
>

  

  <button
  onClick={() =>
    reserveItem(1, 20)
  }
  className="
  w-full
  bg-neutral-900
  py-4
  rounded-xl
  "
>
  0–1 Week ($20)
</button>

<button
  onClick={() =>
    reserveItem(2, 50)
  }
  className="
  w-full
  bg-neutral-900
  py-4
  rounded-xl
  "
>
  1–2 Weeks ($50)
</button>

<button
  onClick={() =>
    reserveItem(4, 100)
  }
  className="
  w-full
  bg-neutral-900
  py-4
  rounded-xl
  "
>
  2–4 Weeks ($100)
</button>

</div>

)}

<button
disabled={isReservedByAnotherUser}
onClick={() => {
addToCart(product);
router.push("/checkout");
}}
className={`
w-full
mt-5
font-bold
py-5
rounded-2xl

${
isReservedByAnotherUser
? "bg-gray-700 text-gray-400 cursor-not-allowed"
: "border border-[#D4AF37] text-[#D4AF37]"
}
`}
>
{
isReservedByAnotherUser
? "Reserved"
: "Buy Now"
}
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