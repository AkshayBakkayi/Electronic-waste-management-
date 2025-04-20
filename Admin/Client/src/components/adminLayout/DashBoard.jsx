import React, { useState, useEffect, useRef } from 'react';
import { BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill } from 'react-icons/bs';
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { getAllScholorships, getUsercount } from '../../utils/api';
import { Link } from 'react-router-dom';

const data = [
    { name: 'JAN', uv: 12000, pv: 2400, amt: 6400 },
    { name: 'FEB', uv: 3000, pv: 19398, amt: 2210 },
    { name: 'MAR', uv: 12000, pv: 800, amt: 22290 },
];

const Dashboard = () => {

    const [userCount, setUserCount] = useState(null);
    const [reqCount, setReqCount] = useState(0)
    useEffect(() => {
        // Fetch user count from the API
        const fetchUserCount = async () => {
            try {
                const response = await getUsercount();
                const res2 = await getAllScholorships();
                if (response.ok) {
                    const data = await response.json();
                    console.log(data)
                    setUserCount(data);
                    // console.log(userCount);
                }

                if (res2.ok) {
                    const data = await res2.json();
                    console.log(data)
                    if (data) {
                        setReqCount(data.length)
                    }
                }

            } catch (error) {
                console.error('Error fetching user count', error);
            }
        };

        fetchUserCount();
    }, []);


    return (
        <main className='main-container'>
            <div style={{ color: 'blue' }} className='main-title'>
                <h3 style={{ color: 'blue' }}>DASHBOARD</h3>
            </div>
            <div className='main-cards'>
                <Link to="/admin/requests" style={{ textDecoration: 'none' }}>
                    <div className='card'>
                        <div className='card-inner'>
                            <h3>Request</h3>
                            <MdOutlineProductionQuantityLimits className='card_icon' />
                        </div>

                        <h1>{reqCount}</h1>
                    </div>
                </Link>

                <div className='card'>
                    <div className='card-inner'>
                        <h3>Users</h3>
                        <BsPeopleFill className='card_icon' />
                    </div>
                    <h1>{userCount}</h1>
                </div>
            </div>
        </main>
    );
}

export default Dashboard;
