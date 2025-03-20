import React from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route,
  Navigate
} from 'react-router-dom';
import { AuthProvider } from './components/Auth/Auth';
import Dashboard from './pages/DashBoard';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Profile from './pages/Profile';
import Catalog from './pages/Catalog';
import Product from './pages/Product';
import ForgotPassword from './components/Auth/Forgot';
import ResetPassword from './components/Auth/Reset';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes> 
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard /> } />
          <Route path="/register" element={<Register />} /> 
          <Route path="/login" element={<Login />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/product/:id" element={<Product />} />
        </Routes>
      </Router>
   </AuthProvider>
    
  );
}

export default App;
