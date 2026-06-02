export default function ContactPage() {

return(

<main
className="
max-w-5xl
mx-auto
px-8
py-20
"
>

<h1
className="
text-6xl
font-bold
mb-14
"
>

Contact

</h1>

<div
className="
grid
md:grid-cols-2
gap-10
"
>

<div>

<input
placeholder="Name"
className="
w-full
border
p-5
rounded-xl
mb-5
"
/>

<input
placeholder="Email"
className="
w-full
border
p-5
rounded-xl
mb-5
"
/>

<textarea
placeholder="Message"

className="
w-full
border
p-5
rounded-xl
h-[220px]
"
/>

<button
className="
mt-8
bg-black
text-white
px-10
py-5
rounded-xl
"
>

Send

</button>

</div>

<div>

<h2
className="
text-4xl
font-bold
"
>

UrbanFurniture

</h2>

<p
className="
mt-6
text-gray-500
"
>

Premium furniture
for modern homes.

</p>

</div>

</div>

</main>

);

}