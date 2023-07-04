import React, {useState,useEffect} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import M from 'materialize-css'

const SignUp=()=>{
    const Navigate=useNavigate()
    const [name,setName]=useState("")
const [email,setEmail]=useState("")
const [password,setPassword]=useState("")
const[image,setImage]=useState("")
const [url,setUrl]=useState(undefined)
useEffect(()=>{
    if(url)
    {
        uploadFields()
    }

},[url])
const uploadPic= ()=>{
    const data=new FormData()
    data.append("file",image)
    data.append("upload_preset","insta-clone")
    data.append("cloud_name","da2qyc62n")
    fetch("https://api.cloudinary.com/v1_1/da2qyc62n/image/upload",{
        method:"post",
        body:data
    })
    .then(res=>res.json())
    .then(data=>{
        setUrl(data.url)
    })
    .catch(err=>{
        console.log(err)
    })
}
const uploadFields=()=>{
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
        M.toast({html:"invalid email",classes:"#c62828 red darken-3"})
        return
    }
    fetch("/Signup",{
        method:"post",
        headers:{
            "Content-Type":"application/json",
            //'Content-Type': 'application/json',
        'Accept': 'application/json'
        },
        body:JSON.stringify({
            name,
            password,
            email,
            pic:url
        })
    } ).then(res=>res.json())
    .then(data=>{
        if(data.error){
            M.toast({html:data.error,classes:"#c62828 red darken-3"})
        }
        else{
            M.toast({html:data.message,classes:"#43a047 green darken-1"})
            Navigate('/Signin')
        }
       
        }) 
        .catch(err=>{
            console.log(err)
    })
}
const PostData=()=>{
    if(image){
        uploadPic()
    }else{
        uploadFields()
    }
    
}
 return(
    <div className="myCard">
        <div className="card auth-card">
            <h2>Instagram</h2>
            <input 
            type="text"
            placeholder="name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            />
            <input 
            type="text"
            placeholder="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            />
            <input 
            type="password"
            placeholder="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            />
            <div className="file-field input-field">
            <div className="btn">
                <span>Upload Pic</span>
                <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
            </div>
            <div className="file-path-wrapper">
                <input className="file-path validate" type="text"/>
            </div>
            </div>
            <button className="btn waves-effect waves-light"
            onClick={()=>PostData()}>
                SignUp
            </button>
            <h5>
                <Link to="/Signin">Already have an account ?</Link>
            </h5>


        </div>
    </div>
 )
}
export default SignUp