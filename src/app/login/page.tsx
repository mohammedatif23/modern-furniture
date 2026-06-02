"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function LoginPage() {

const router =
useRouter();

const [email,setEmail] =
useState("");

const [password,setPassword] =
useState("");

const [loading,setLoading] =
useState(false);

async function login(){

setLoading(true);

const {

error

}

=

await supabase.auth.signInWithPassword({

email,

password,

});

setLoading(false);

if(error){

alert(
error.message
);

return;

}

router.push(
"/admin"
);

}

return(

<main
className="
min-h-screen
bg-black
flex
items-center
justify-center
px-6
"
>

<div
className="
w-full
max-w-md
"
>

<h1
className="
text-[#D4AF37]
text-6xl
font-bold
mb-10
text-center
"
>

Admin Login

</h1>

<div
className="
space-y-5
"
>

<input

placeholder="Email"

value={email}

onChange={(e)=>

setEmail(
e.target.value
)

}

className="
w-full
bg-white
text-black
rounded-2xl
p-5
outline-none
"

/>

<input

type="password"

placeholder="Password"

value={password}

onChange={(e)=>

setPassword(
e.target.value
)

}

className="
w-full
bg-white
text-black
rounded-2xl
p-5
outline-none
"

/>

<button

onClick={login}

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

{

loading

?

"Logging in..."

:

"Login"

}

</button>

</div>

</div>

</main>

);

}