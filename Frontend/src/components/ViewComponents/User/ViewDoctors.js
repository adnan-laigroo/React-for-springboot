import React, { useEffect, useState } from 'react';
import './CSS/userTable.css'; // Import the CSS file
import API_URL from '../../../config';

const ViewDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
 

  useEffect(() => {
    // Fetch doctors from the API
    fetch(API_URL + '/hospital/doctor/list')
      .then((response) => response.json())
      .then((data) => {
        // Update state with fetched doctors
        setDoctors(data);
        setLoading(false);
      })
      .catch((error) => {
        // Handle any errors
        console.error('Error fetching doctors:', error);
        setLoading(false);
      });
  }, []);





  

  return (
    <div className="view-users-container">
      <h3 className="view-users-heading">View Doctors</h3>
      {loading ? (
        <p>Loading doctors...</p>
      ) : (
        <div className="user-table-container">
          {doctors.length > 0 ? (
            <table className="user-table">
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Speciality</th>
                </tr>
              </thead>
              <tbody>
                {doctors.map((doctor) => (
                  <tr key={doctor.email}>
                    <td>{doctor.firstName}</td>
                    <td>{doctor.lastName}</td>
                    <td>{doctor.email}</td>
                    <td>{doctor.phoneNo}</td>
                    <td>{doctor.speciality}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No doctors found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ViewDoctors;
