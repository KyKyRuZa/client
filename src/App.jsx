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
import AdminCatalog from './pages/Profile';
import Basket from './pages/Profile';
import Orders from './pages/Profile';
import Sells from './pages/Profile';
import Settings from './pages/Profile';
import Catalog from './pages/Catalog';
import Product from './pages/Product';
import ForgotPassword from './components/Auth/Forgot';
import ResetPassword from './components/Auth/Reset';
import Payment from './pages/Payment';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
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
          <Route path="/profile" element={<Profile />}>
            <Route index element={<Navigate to="user" />} />
            <Route path=":role" element={<Profile />} />
            <Route path="admin-catalog" element={<AdminCatalog />} />
            <Route path="basket" element={<Basket />} />
            <Route path="orders" element={<Orders />} />
            <Route path="sells" element={<Sells />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/payment/:orderId" element={<Payment />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          
        </Routes>
      </Router>
   </AuthProvider>
    
  );
}

export default App;
