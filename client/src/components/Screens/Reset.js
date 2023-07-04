import React, {useState,useContext,} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import M from 'materialize-css'
//import { reset } from 'nodemon'
console.log("hello")



const Reset=()=>{
   
    const Navigate=useNavigate()
const [email,setEmail]=useState("")

const PostData=()=>{
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
        M.toast({html:"invalid email",classes:"#c62828 red darken-3"})
        return
    }
    fetch("/reset-password",{
        method:"post",
        headers:{
            "Content-Type":"application/json"
          //  'Content-Type': 'application/json',
        //'Accept': 'application/json'
        },
        body:JSON.stringify({
            email
        })
    } ).then(res=>res.json())
    .then(data=>{
        //console.log(data)
        if(data.error){
            M.toast({html:data.error,classes:"#c62828 red darken-3"})
        }
        else{
           // dispatch({type:"USER",payload:data.user})
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
            type="text"
            placeholder="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            />
            <button className="btn waves-effect waves-light"
            onClick={()=>PostData()}>
                reset password
            </button>
        

        </div>
    </div>
 )
}
export default Reset