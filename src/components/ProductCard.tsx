import Link from "next/link";

type ProductProps = {
id:number;
image:string;
title:string;
price:string;
};

export default function ProductCard({
id,
image,
title,
price,
}:ProductProps){

return(

<Link href={`/shop/${id}`}>

<div
className="
group
cursor-pointer
"
>

<div
className="
overflow-hidden
rounded-3xl
"
>

<img

src={image}

alt={title}

className="
h-[350px]
w-full
object-cover

transition

duration-700

group-hover:scale-110

group-hover:rotate-1

"

/>

</div>

<div
className="
mt-5
"
>

<h3
className="
text-2xl
font-semibold

group-hover:
underline

"
>

{title}

</h3>

<p
className="
mt-2
text-gray-500
"
>

${price}

</p>

</div>

</div>

</Link>

);

}