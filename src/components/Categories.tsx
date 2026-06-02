export default function Categories(){

const items=[
"Sofa",
"Bed",
"Table",
"Chair",
];

return(

<section
className="
px-5
md:px-12
py-20
bg-black
"
>

<h2
className="
text-5xl
md:text-8xl
font-bold
text-white
mb-10
"
>

Categories

</h2>

<div
className="
grid
grid-cols-2
md:grid-cols-4
gap-5
"
>

{

items.map(
(item)=>(

<div

key={item}

className="
h-[140px]
md:h-[250px]

border

border-white

rounded-3xl

flex

items-center

justify-center

text-white

text-2xl

md:text-5xl

font-bold
"

>

{item}

</div>

)

)

}

</div>

</section>

);

}