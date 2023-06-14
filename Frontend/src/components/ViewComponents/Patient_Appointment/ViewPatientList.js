import React, { useEffect, useState } from 'react';
import './tableStyle.css'; // Import the CSS file
import API_URL from '../../../config';

const ViewPatientList = ({ handleBack }) => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   // Fetch patients from the API
    
  //   fetch(API_URL + '/hospital/patient/list')
  //     .then((response) => response.json())
  //     .then((data) => {
  //       // Update state with fetched patients
  //       setPatients(data);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       // Handle any errors
  //       console.error('Error fetching patients:', error);
  //       setLoading(false);
  //     });
  // }, []);
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch(API_URL + '/hospital/patient/list', {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*', // Allow requests from any origin
            "Authorization" : "Basic" + btoa("admin:Admin@1234")
          },
          // mode:"no-cors"
        });
        console.log(await response);
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setPatients(data);
          setLoading(false);
        } else {
          console.log(response.statusText);
          console.error('Error fetching patients:', response.statusText);
          
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        console.error('Error fetching with error patients:', error);
        
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  return (
    <div>
       <div className="button-container"> {/* Add a container for the back button */}
            <button className="back-button" onClick={handleBack}>
              Back
            </button>
          </div>
      <h3>View Patients</h3>
      {loading ? (
        <p>Loading patients...</p>
      ) : (
        <div className="table-container">
          {patients.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Patient ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Address</th>
                  <th>Phone Number</th>
                  <th>Symptom</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient) => (
                  <tr key={patient.patId}>
                    <td>{patient.patId}</td>
                    <td>{patient.firstName}</td>
                    <td>{patient.lastName}</td>
                    <td>
                      {patient.address.firstLine}, {patient.address.secondLine},{' '}
                      {patient.address.pincode}
                    </td>
                    <td>{patient.phoneNo}</td>
                    <td>{patient.symptom}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No patients found.</p>
          )}
        
        </div>
      )}
    </div>
  );
};

export default ViewPatientList;
