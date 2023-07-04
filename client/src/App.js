import React,{useEffect,createContext,useReducer,useContext} from 'react';
import NavBar from './components/NavBar'
import './App.css'
import { BrowserRouter,Routes,Route,useNavigate,useLocation} from 'react-router-dom';
import Home from './components/Screens/Home'
import Profile from './components/Screens/Profile'
import Signin from './components/Screens/Signin'
import Signup from './components/Screens/Signup'
import Createpost from './components/Screens/Createpost'
import UserProfile from './components/Screens/userProfile'
import {reducer,initialState} from './reducers/userReducer'
import Subposts from './components/Screens/subposts'
import Reset from './components/Screens/Reset'
import Newpassword from './components/Screens/newpassword'
//import useLocation from 'react-router-dom'
export const UserContext=createContext()

//import './App.css';
 const Routing=()=>{
  const Navigate = useNavigate()
  const{state,dispatch}=useContext(UserContext)
  const location=useLocation();
  useEffect(()=>{
    const user=JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
      //Navigate('/')
    }else{
      if(!location.pathname.startsWith('/reset'))
      Navigate('/Signin')
    }
  },[])
  return(

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Signin" element={<Signin />} />
        <Route exact path="/Profile" element={<Profile />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Createpost" element={<Createpost />} />
        <Route path="/Profile/:userid" element={<UserProfile />} />
        <Route path="/myfollowingposts" element={<Subposts />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/reset/:token" element={<Newpassword />} />
        </Routes>

  )
 }
function App() {
  const [state,dispatch]=useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
    <NavBar />
    <Routing />
      
    </BrowserRouter>
    </UserContext.Provider> 
  )
}

export default App;
