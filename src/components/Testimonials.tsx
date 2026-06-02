export default function Testimonials() {

const reviews=[

{
name:"James",
text:"Excellent quality and delivery."
},

{
name:"Sarah",
text:"The furniture feels premium."
},

{
name:"Daniel",
text:"Very clean design and smooth ordering."
},

];

return(

<section
className="
py-28
bg-gray-50
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

What Customers Say

</h2>

<div
className="
grid
md:grid-cols-3
gap-8
"
>

{

reviews.map(
(
review,
index
)=>(

<div

key={
index
}

className="
bg-white
p-10
rounded-3xl
shadow-sm
"

>

<p
className="
text-gray-600
text-lg
"
>

"

{
review.text
}

"

</p>

<h3
className="
mt-8
font-bold
text-2xl
"
>

—

{
review.name
}

</h3>

</div>

)

)

}

</div>

</div>

</section>

);

}