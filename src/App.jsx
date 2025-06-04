import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/home'
import LoginPage from './pages/login'
import AdminPage from './pages/adminpage'
import TestPage from './pages/testPage'
import RegisterPage from './pages/register'
import { Toaster } from 'react-hot-toast'



function App() {


  return (
    
    <BrowserRouter>
    <div>

      <Toaster position = "top-right"/>
      
      <Routes path="/*">
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signup" element={<RegisterPage />}/>
        <Route path="/admin/*" element={<AdminPage/>}/>
        <Route path="/test" element={<TestPage/>}/>
        <Route path ="/*" element={<HomePage/>}/>
        
      </Routes>
      
</div> 
</BrowserRouter>    

    
     
    
  )
}

export default App


//https://vjvaprvmvskxfaemyboe.supabase.co

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqdmFwcnZtdnNreGZhZW15Ym9lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0MTkwMDcsImV4cCI6MjA2Mzk5NTAwN30.NNXt6qcwG0zpimwuAUAq5VcMA5GmydrsHCEhxOVAcO4
