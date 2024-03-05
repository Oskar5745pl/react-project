

import './App.css'
import Home from './Home'
import Nav from './Nav'
import Contact from './components/Contact.tsx'
import SearchPage from './components/SearchPage.tsx'
// import PaymentForm from './components/PaymentForm.tsx'
import LoginForm from './components/LoginForm.tsx'
// import Dashboard from './components/Dashboard.tsx'
import {UserProvider} from './UserContext.tsx'
import {Route, Routes} from "react-router-dom"
import Dashboard from './components/Dashboard.tsx'

function App() {

  return (
    <>
      
      <div className='main'>

      <Nav/>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/SearchPage" element={<SearchPage/>}/>
            <Route path="/Contact" element={<Contact/>}/>
            {/* <Route path="/PaymentForm" element={<PaymentForm />}/> */}
            <Route path="/LoginForm" element={<LoginForm />}/>
            <Route path="/dashboard" element={<Dashboard />}/>
        </Routes>
      </div>
    </>
  )
}

export default App
