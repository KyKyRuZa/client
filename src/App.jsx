import React from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route,
  Navigate
} from 'react-router-dom';
import { AuthProvider } from './components/Auth/Auth';
import { useAuth } from './components/Auth/Auth';
import Dashboard from './pages/DashBoard';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Profile from './pages/Profile';
import AdminCatalog from './pages/Profile';
import Basket from './pages/Profile';
import Orders from './pages/Profile';
import Sells from './pages/Profile';
import Settings from './pages/Profile';
import Statistic from './pages/Profile';
import Logs from './pages/Profile'
import Users from './pages/Profile'
import Catalog from './pages/Catalog';
import Product from './pages/Product';
import ForgotPassword from './components/Auth/Forgot';
import ResetPassword from './components/Auth/Reset';
import Payment from './pages/Payment';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';


function App() {
  return (
      <Router>
        <AuthProvider>
          <Routes> 
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard /> } />
            <Route path="/register" element={<Register />} /> 
            <Route path="/login" element={<Login />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/profile/" element={ <Profile />} />
            <Route path="/profile/:role/:id" element={<Profile />} />
            <Route path="/profile/statistic" element={<Statistic/>} />
            <Route path="/profile/users" element={<Users/>}></Route>
            <Route path="/admin-catalog/products" element={<AdminCatalog />} />
            <Route path="/admin-catalog/categories" element={<AdminCatalog />} />
            <Route path="/products/orders" element={<Orders />} />
            <Route path="/products/basket" element={<Basket />} />
            <Route path="/sells" element={<Sells />} />
            <Route path="/logs" element={<Logs/>}></Route>
            <Route path="/profile/settings" element={<Settings />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/payment/:orderId" element={<Payment />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
          </Routes>
          </AuthProvider>
      </Router>
  );
}

export default App;
