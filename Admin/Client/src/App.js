import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import GuestLayout from './components/guestLayout/GuestLayout';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JS
import Home from './components/guestLayout/Home';

import AdminLayout from './components/adminLayout/AdminLayout';
import EditProfile from './components/guestLayout/EditProfile';
import ChangePassword from './components/guestLayout/ChangePassword';
import Dashboard from './components/adminLayout/DashBoard';


import AdminLogin from './components/guestLayout/AdminLogin';

import ScholorshipDetails from './components/adminLayout/ScholorshipDetails';





function App() {
  return (
    <div className="App">
      <Routes>

        <Route path='/' element={<GuestLayout />}>
          <Route index element={<Home />} />
          
          <Route path='/guestLayout/adminLogin' element={<AdminLogin />} />
          
        </Route>

        <Route path='/admin' element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" />} />
          <Route path='/admin/dashboard' element={<Dashboard />} />
          <Route path='/admin/edit-profile' element={<EditProfile />} />
          <Route path='/admin/change-password' element={<ChangePassword />} />
          
          <Route path='/admin/requests' element={<ScholorshipDetails />} />
         
         
         
        </Route>

        

      </Routes>
    </div>
  );
}

export default App;
