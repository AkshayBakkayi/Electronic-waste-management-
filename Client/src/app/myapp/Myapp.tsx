import React, { useEffect, useState } from 'react';
import { getERequestByUserId } from '../utils/api'; // Ensure this path is correct
import { getUserID } from '../sign-in/auth';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const Myapp = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error handling
  
  const id = getUserID();

  useEffect(() => {
    if (id) {
      fetchApplications(id);
    }
  }, [id]);

  const fetchApplications = async (userId) => {
    try {
      const response = await getERequestByUserId(userId);
      if (response.ok) {
        const data = await response.json();
        console.log('API Response:', data); // Log the entire API response

        // Check if data is an object and contains a data array
        if (data && Array.isArray(data.data)) {
          setApplications(data.data); // Use the array inside the data object
        } else {
          console.error('Expected data to be an object with an array under "data":', data);
          setApplications([]); // Set to empty array if format is not as expected
        }
      } else {
        console.error('Failed to fetch applications:', response.statusText);
        setApplications([]); // Handle fetch failure
        toast.error('Failed to fetch applications.'); // Notify user
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
      setError(error); // Set error state
      toast.error('An error occurred while fetching applications.'); // Notify user
    } finally {
      setLoading(false); // Stop loading indicator
    }
  };

  return (
    <div>
      <ToastContainer />
      <br /><br /><br /><br /><br /><br />

      <center>
        {loading ? (
          <p>Loading...</p> // Show loading message while data is being fetched
        ) : error ? (
          <p>Error: {error.message}</p> // Show error message if something goes wrong
        ) : (
          <table style={{ fontFamily: 'Arial, Helvetica, sans-serif', borderCollapse: 'collapse', width: '80%' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #ddd', padding: '8px', paddingTop: '12px', paddingBottom: '12px', textAlign: 'left', backgroundColor: '#04AA6D', color: 'white' }}>Sl.No</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', paddingTop: '12px', paddingBottom: '12px', textAlign: 'left', backgroundColor: '#04AA6D', color: 'white' }}>Item Name</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', paddingTop: '12px', paddingBottom: '12px', textAlign: 'left', backgroundColor: '#04AA6D', color: 'white' }}>Expected Price</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', paddingTop: '12px', paddingBottom: '12px', textAlign: 'left', backgroundColor: '#04AA6D', color: 'white' }}>Pickup Date</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', paddingTop: '12px', paddingBottom: '12px', textAlign: 'left', backgroundColor: '#04AA6D', color: 'white' }}>Pickup Time</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', paddingTop: '12px', paddingBottom: '12px', textAlign: 'left', backgroundColor: '#04AA6D', color: 'white' }}>Facility Name</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', paddingTop: '12px', paddingBottom: '12px', textAlign: 'left', backgroundColor: '#04AA6D', color: 'white' }}>Status/Remark</th>
              </tr>
            </thead>
            <tbody>
              {applications.length > 0 ? (
                applications.map((application, index) => (
                  <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f2f2f2' : 'white', cursor: 'pointer' }}>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{index + 1}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{application.recycleItem}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{application.recycleItemPrice}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{application.pickupDate}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{application.pickupTime}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{application.facility}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{application.remark}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>No applications found</td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        <br /><br /><br /><br /><br /><br />
      </center>
    </div>
  );
};

export default Myapp;
