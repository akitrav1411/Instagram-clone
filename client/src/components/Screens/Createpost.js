import React,{useState,useEffect} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import M from 'materialize-css'


const Createpost=()=>{
    const Navigate=useNavigate()
    const[title,setTitle]=useState("")
    const[body,setBody]=useState("")
    const[image,setImage]=useState("")
    const[url,setUrl]=useState("")
    useEffect(()=>{
        if(url){
        fetch("/Createpost",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
               title,
            body,
            pic:url
            })
        } ).then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(data.error){
                M.toast({html:data.error,classes:"#c62828 red darken-3"})
            }
            else{
               
                M.toast({html:"created post successfully",classes:"#43a047 green darken-1"})
                Navigate('/')
            }
           
            }) .catch(err=>{
                console.log(err)
        })
    }  
    },[url])

    const PostDetails=()=>{
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
    
    return(
        <div className="card input-card"
        style={{
            margin:"10px auto",
            maxWidth:"500px",
            textAlign:"centre",
            padding:"20px"
        }}>
            <input
            type="text" 
            placeholder="title"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            />
            <input type="text" placeholder="body"
            value={body}
            onChange={(e)=>setBody(e.target.value)}/>
            <div className="file-field input-field">
            <div className="btn">
                <span>Upload Image</span>
                <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
            </div>
            <div className="file-path-wrapper">
                <input className="file-path validate" type="text"/>
            </div>
            </div>
            <button className="btn waves-effect waves-light"
            onClick={()=>PostDetails()}>
                Submit Post
            </button>

        </div>

    );
}
export default Createpost