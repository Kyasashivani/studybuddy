import { useState } from "react";

export default function Register(){

const [name,setName]=useState("");
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");

const registerUser=()=>{
if(!name || !email || !password){
alert("Fill all fields");
return;
}

alert("Registration Successful (Demo Page)");
};

return(
<div className="main-area">

<div className="card" style={{maxWidth:"500px", margin:"auto"}}>

<h1>👤 Registration</h1>

<input
placeholder="Full Name"
value={name}
onChange={e=>setName(e.target.value)}
/>

<input
placeholder="Email"
value={email}
onChange={e=>setEmail(e.target.value)}
/>

<input
type="password"
placeholder="Password"
value={password}
onChange={e=>setPassword(e.target.value)}
/>

<button style={{marginTop:"15px", width:"100%"}} onClick={registerUser}>
Register
</button>

</div>

</div>
);
}