import React, { useEffect } from 'react'
import LeftNavBar from './LeftNavBar'
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'
import { useAdminData } from '../../utils/Cookies';

const AdminLayout = () => {

    const { admin: adminData } = useAdminData();

    const navigate = useNavigate();
    const location = useLocation();
    const currentRoute = location.pathname;

    useEffect(() => {
        if (currentRoute.includes('admin')) {
            if (!adminData._id) {
                alert("You are logged out, Please login again!!!");
                navigate("/guestLayout/adminLogin")
            }
            Cookies.remove('organizationData');
            Cookies.remove('studentData')
        }
    }, [currentRoute]); // Dependency array ensures useEffect runs on route change

    return (
        <div>
            <div>
                <LeftNavBar />
            </div>
        </div>
    )
}

export default AdminLayout
