import {BrowserRouter,Routes,Route} from "react-router-dom"
import './App.css'
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import Member_details from "./pages/Member_details"
import Member_details_3 from "./pages/Member_details_3"
import Home from "./pages/Home"

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/Dashboard" element ={<Dashboard/>}/>  
      <Route path="/login" element ={<Login/>}/> 
      <Route path="/Member_details" element ={<Member_details/>}/>
      <Route path="/Member_details_3" element ={<Member_details_3/>}/>  

      {/* <Route path="/room_allocation" element ={<SignIn/>}/> */}
    </Routes>
    </BrowserRouter>
  )
}

export default App
