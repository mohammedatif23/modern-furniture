"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function AdminPage() {

const router =
useRouter();

const [menu,setMenu]=
useState(false);

const [section,setSection]=
useState("add");

const [products,setProducts]=
useState<any[]>([]);

const [orders,setOrders]=
useState<any[]>([]);

const [search,setSearch]=
useState("");

const [title,setTitle]=
useState("");

const [price,setPrice]=
useState("");

const [category,setCategory]=
useState("");

const [image,setImage]=
useState("");

useEffect(()=>{

checkUser();

loadProducts();

loadOrders();

},[]);

async function checkUser(){

const {

data

}

=

await supabase.auth.getUser();

if(!data.user){

router.push("/login");

}

}

async function loadProducts(){

const { data }=

await supabase

.from("products")

.select("*")

.order(
"id",
{
ascending:false
}
);

if(data){

setProducts(data);

}

}

async function loadOrders() {

  const response = await fetch("/api/orders");

  const data = await response.json();

  setOrders(data || []);

}

async function updateOrderStatus(
  id: number,
  status: string
) {
  const { error } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", id);

  if (error) {
    alert(error.message);
    return;
  }

  loadOrders();
}

async function uploadImage(
file:File
){

const fileName=

Date.now()

+

file.name;

const {

error

}

=

await supabase

.storage

.from(
"product-images"
)

.upload(
fileName,
file
);

if(error){

alert(
error.message
);

return;

}

const { data }=

supabase

.storage

.from(
"product-images"
)

.getPublicUrl(
fileName
);

setImage(
data.publicUrl
);

}

async function addProduct(){

const { error }=

await supabase

.from("products")

.insert([

{

title,

price:Number(price),

category,

image,

},

]);

if(error){

alert(
error.message
);

return;

}

alert(
"Product Added"
);

setTitle("");
setPrice("");
setCategory("");
setImage("");

loadProducts();

}

async function deleteProduct(
id:number
){

await supabase

.from("products")

.delete()

.eq(
"id",
id
);

loadProducts();

}

async function logout(){

await supabase.auth.signOut();

router.push(
"/login"
);

}

const filtered=

products.filter(
(item)=>

item.title

.toLowerCase()

.includes(
search
.toLowerCase()
)

||

String(
item.id
)

.includes(
search
)

);


return(

<main
className="
min-h-screen
bg-black
text-[#D4AF37]
"
>

<div
className="
max-w-5xl
mx-auto
px-6
py-10
"
>

<div
className="
flex
justify-between
items-center
mb-10
"
>

<h1
className="
text-6xl
font-bold
"
>

Admin

</h1>

<div
className="
flex
gap-4
items-center
"
>

<button

onClick={()=>

setMenu(
!menu
)

}

className="
text-5xl
"

>

☰

</button>

<button

onClick={
logout
}

className="
bg-red-600
text-white
px-6
py-3
rounded-xl
"

>

Logout

</button>

</div>

</div>

{

menu

&&

<div
className="
absolute
right-10
bg-black
border
border-[#D4AF37]
rounded-2xl
overflow-hidden
w-72
"
>

<button

onClick={()=>{

setSection(
"search"
);

setMenu(
false
);

}}

className="
block
w-full
text-left
p-5
hover:bg-[#D4AF37]
hover:text-black
"

>

Search Products

</button>

<button

onClick={()=>{

setSection(
"orders"
);

setMenu(
false
);

}}

className="
block
w-full
text-left
p-5
hover:bg-[#D4AF37]
hover:text-black
"

>

Orders

</button>

</div>

}

{

section==="add"

&&

<div
className="
space-y-5
"
>

<input
placeholder="Title"
value={title}
onChange={(e)=>setTitle(e.target.value)}
className="
w-full
p-5
rounded-xl
bg-black
border
border-[#D4AF37]
"
/>

<input
placeholder="Price"
value={price}
onChange={(e)=>setPrice(e.target.value)}
className="
w-full
p-5
rounded-xl
bg-black
border
border-[#D4AF37]
"
/>

<input
placeholder="Category"
value={category}
onChange={(e)=>setCategory(e.target.value)}
className="
w-full
p-5
rounded-xl
bg-black
border
border-[#D4AF37]
"
/>

<div>

<label
className="
block
mb-3
"
>

Upload Product Image

</label>

<input

type="file"

accept="image/*"

onChange={(e)=>{

const file=
e.target.files?.[0];

if(file){

uploadImage(
file
);

}

}}

className="
w-full
"

/>

</div>

{

image

&&

<img

src={image}

alt="preview"

className="
h-52
rounded-xl
"

/>

}

<button

onClick={
addProduct
}

className="
w-full
bg-[#D4AF37]
text-black
py-5
rounded-xl
font-bold
"

>

Add Product

</button>

</div>

}

{

section==="search"

&&

<div>

<input

placeholder="Search Product"

value={search}

onChange={(e)=>

setSearch(
e.target.value
)

}

className="
w-full
bg-black
border
border-[#D4AF37]
rounded-xl
p-5
mb-8
"

/>

<div
className="
space-y-4
"
>

{

filtered.map(
(item)=>(

<div

key={
item.id
}

className="
border
border-[#D4AF37]
rounded-xl
p-5
flex
justify-between
"

>

<div>

<h3>

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

</div>

<button

onClick={()=>

deleteProduct(
item.id
)

}

className="
bg-red-600
text-white
px-4
rounded
"

>

Delete

</button>

</div>

)

)

}

</div>

</div>

}

{
section==="orders" && (

<div className="space-y-5">

<h2
className="
text-4xl
font-bold
mb-6
"
>
Orders
</h2>

{orders.length === 0 ? (

<p>No orders found.</p>

) : (

orders.map((order)=>(

<div
key={order.id}
className="
border
border-[#D4AF37]
rounded-xl
p-5
"
>

<p>
<strong>Order #:</strong> {order.id}
</p>

<p>
<strong>Name:</strong> {order.customer_name || "Not Available"}
</p>

<p>
<strong>Email:</strong> {order.customer_email || "Not Available"}
</p>

<p>
<strong>Total:</strong> ${order.total || 0}
</p>

<div className="mt-3">

<select
defaultValue={order.status || "Pending"}
onChange={(e)=>
updateOrderStatus(
order.id,
e.target.value
)
}
className={`
p-2
rounded-lg
font-semibold

${
(order.status || "Pending") === "Pending"
? "bg-yellow-500 text-black"
: (order.status || "Pending") === "Processing"
? "bg-blue-500 text-white"
: (order.status || "Pending") === "Delivered"
? "bg-green-600 text-white"
: "bg-red-600 text-white"
}
`}
>

<option value="Pending">
Pending
</option>

<option value="Processing">
Processing
</option>

<option value="Delivered">
Delivered
</option>

<option value="Cancelled">
Cancelled
</option>

</select>

</div>

<p>
<strong>Date:</strong> {order.created_at || "Not Available"}
</p>

<div className="mt-4">

<strong>Items:</strong>

{order.items && Array.isArray(order.items) ? (

order.items.map((item:any,index:number)=>(
<p key={index}>
• {item.title}
</p>
))

) : (

<p>No items available</p>

)}

</div>

</div>

))

)}

</div>

)
}

</div>
</main>

);

}