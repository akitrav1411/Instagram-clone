import React, {useState,useContext,} from 'react'
import {Link,useNavigate,useParams} from 'react-router-dom'
import M from 'materialize-css'
//console.log("hello")



const Signin=()=>{
  //  const{state,dispatch}=useContext(UserContext)
    const Navigate=useNavigate()
//const [email,setEmail]=useState("")
const [password,setPassword]=useState("")
const {token}=useParams()
console.log(token)
const PostData=()=>{
   
    fetch("/new-password",{
        method:"post",
        headers:{
            "Content-Type":"application/json"
          //  'Content-Type': 'application/json',
        //'Accept': 'application/json'
        },
        body:JSON.stringify({
            password,
            token
        })
    } ).then(res=>res.json())
    .then(data=>{
        console.log(data)
        if(data.error){
            M.toast({html:data.error,classes:"#c62828 red darken-3"})
        }
        else{
            M.toast({html:data.message,classes:"#43a047 green darken-1"})
            Navigate('/Signin')
        }
       
        }) .catch(err=>{
            console.log(err)
    })
}
 return(
    <div className="myCard">
        <div className="card auth-card">
            <h2>Instagram</h2>
            <input 
            type="password"
            placeholder="enter new password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            />
            <button className="btn waves-effect waves-light"
            onClick={()=>PostData()}>
                Update Password
            </button>
            <h5>
                <Link to="/Signup">Don't have an account ?</Link>
            </h5>

        </div>
    </div>
 )
}
export default Signin