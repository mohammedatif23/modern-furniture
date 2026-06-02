export default function Newsletter() {

return(

<section
className="
py-28
bg-black
text-white
"
>

<div
className="
max-w-5xl
mx-auto
px-8
text-center
"
>

<h2
className="
text-5xl
font-bold
"
>

Get Furniture Updates

</h2>

<p
className="
mt-6
text-gray-400
"
>

Receive offers and new arrivals.

</p>

<div
className="
mt-10
flex
flex-col
md:flex-row
gap-4
justify-center
"
>

<input

placeholder=
"Enter Email"

className="
bg-white
text-black
p-5
rounded-xl
w-full
md:w-[500px]
"

/>

<button
className="
bg-white
text-black
px-10
rounded-xl
"
>

Subscribe

</button>

</div>

</div>

</section>

);

}