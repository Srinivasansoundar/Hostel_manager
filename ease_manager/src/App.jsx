import {BrowserRouter,Routes,Route} from "react-router-dom"
import './App.css'
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import Home from "./pages/Home"
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/Dashboard" element ={<Dashboard/>}/>  
      <Route path="/login" element ={<Login/>}/>  
      {/* <Route path="/room_allocation" element ={<SignIn/>}/> */}
    </Routes>
    </BrowserRouter>
  )
}

export default App
