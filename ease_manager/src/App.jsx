import {BrowserRouter,Routes,Route} from "react-router-dom"
import './App.css'
import Dashboard from "./pages/Dashboard"
import LoginUser from "./pages/LoginUser"
import LoginAdmin from "./pages/LoginAdmin"
import Member_details from "./pages/Member_details"
import Member_details_3 from "./pages/Member_details_3"
import User from "./pages/User"
import WaitingList from "./pages/Waitinglist"
import BookingForm from "./pages/Booking"
import PrivateRoutes from "./Components/PrivateRoutes"
import AdminPage from "./pages/AdminPage"
import AllotedStudent from "./pages/AllotedStudent"
import ViewBlocks from "./pages/ViewBlocks"
import Complaints from "./pages/Complaints"
import Waitingadmin from "./pages/Waitingadmin"
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
function App() {
  return (
    <BrowserRouter>
    <Routes>
      {/* <Route path="/" element={<Home/>}/> */}
      <Route element={<PrivateRoutes/>}>
          <Route path="/dashboard" element ={<Dashboard/>}/> 
      </Route>
      
      <Route path="/" element={<User/>}/>
      <Route path="/studentlogin" element ={<LoginUser/>}/> 
      <Route path="/adminlogin" element ={<LoginAdmin/>}/> 
      <Route path='/adminpage' element={<AdminPage/>}/>
      <Route path='/allotedStudent/:blockName' element={<AllotedStudent/>}/>
      <Route path='/viewblock/:blockName' element={<ViewBlocks/>}/>
      <Route path="/Member_details" element ={<Member_details/>}/>
      <Route path="/Member_details_3" element ={<Member_details_3/>}/>  
      <Route path="/booking_form" element ={<BookingForm/>}/>  
      <Route path="/Waiting_list" element ={<WaitingList/>}/>  
      <Route path='/complaints' element={<Complaints/>}/>
      <Route path='/waitingstudent/:blockName' element={<Waitingadmin/>}/>
      {/* <Route path="/room_allocation" element ={<SignIn/>}/> */}
    </Routes>
    </BrowserRouter>
  )
}

export default App
