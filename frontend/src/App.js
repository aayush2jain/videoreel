import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home.js';
import './App.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
function App() {
  //62418731814-lbaeol5crkunor1led7lc0pc273ct3mc.apps.googleusercontent.com
  const clientId = '62418731814-lbaeol5crkunor1led7lc0pc273ct3mc.apps.googleusercontent.com'
  return (
    <GoogleOAuthProvider clientId={clientId}>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home></Home>}></Route>
      <Route path='/video/:id' element={<Home></Home>}></Route>
    </Routes>
    </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
