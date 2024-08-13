import {BrowserRouter,Routes,Route} from "react-router-dom"
import './App.css'
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/Dashboard" element ={<Dashboard/>}/>  
      <Route path="/login" element ={<Login/>}/>  
      <Route path="/room_allocation" element ={<SignIn/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
