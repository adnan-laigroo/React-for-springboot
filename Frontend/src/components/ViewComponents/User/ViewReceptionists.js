import React, { useEffect, useState } from 'react';
import './CSS/userTable.css'; // Import the CSS file
import API_URL from '../../../config';

const ViewReceptionists = () => {
  const [receptionists, setReceptionists] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    // Fetch receptionists from the API
    fetch(API_URL + '/hospital/receptionist/list')
      .then((response) => response.json())
      .then((data) => {
        // Update state with fetched receptionists
        setReceptionists(data);
        setLoading(false);
      })
      .catch((error) => {
        // Handle any errors
        console.error('Error fetching receptionists:', error);
        setLoading(false);
      });
  }, []);
  return (
    <div className="view-users-container">
      <h3 className="view-users-heading">View Receptionists</h3>
      {loading ? (
        <p>Loading receptionists...</p>
      ) : (
        <div className="user-table-container">
          {receptionists.length > 0 ? (
            <table className="user-table">
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                </tr>
              </thead>
              <tbody>
                {receptionists.map((receptionist) => (
                  <tr key={receptionist.email}>
                    <td>{receptionist.firstName}</td>
                    <td>{receptionist.lastName}</td>
                    <td>{receptionist.email}</td>
                    <td>{receptionist.phoneNo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No receptionists found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ViewReceptionists;
