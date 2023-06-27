import React, { useEffect, useState } from 'react';
import { FaEye, FaEdit, FaFileInvoice } from 'react-icons/fa';
import API_URL from '../../../config';
import './tableStyle.css'; // Import the CSS file

const ViewPrescriptions = ({ encodedCredentials, appointmentId, handleBack }) => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch prescriptions from the API
    const headers = new Headers();
    headers.append('Authorization', 'Basic ' + encodedCredentials);
    fetch(API_URL + `/hospital/prescription/list?apId=${appointmentId}`, {
      method: 'GET',
      headers: headers,
    })
      .then((response) => response.json())
      .then((data) => {
        // Update state with fetched prescriptions
        setPrescriptions(data);
        setLoading(false);
      })
      .catch((error) => {
        // Handle any errors
        console.error('Error fetching prescriptions:', error);
        setLoading(false);
      });
  }, [appointmentId, encodedCredentials]);

  return (
    <div>
      <br></br>
      <button className="prescription-back-button" onClick={handleBack}>
        Back
      </button>
      <h3>Prescriptions</h3>
      {loading ? (
        <p>Loading prescriptions...</p>
      ) : (
        <div className="prescriptionList-table">
          {prescriptions.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Prescription ID</th>
                  <th>Patient Name</th>
                  <th>Doctor Name</th>
                  <th>Diagnosis</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {prescriptions.map((prescription, index) => (
                  <tr key={prescription.apId}>
                    <td>{index + 1}</td>
                    <td>{prescription.apId}</td>
                    <td>{prescription.patientName}</td>
                    <td>{prescription.doctorName}</td>
                    <td>{prescription.diagnosis}</td>
                    <td>
                      <button className="prescriptionAction-button prescriptionAction-view-button">
                        <FaEye className="prescriptionAction-button-icon" />
                        View
                      </button>
                      <button className="prescriptionAction-button prescriptionAction-edit-button">
                        <FaEdit className="prescriptionAction-button-icon" />
                        Edit
                      </button>
                      <button className="prescriptionAction-button prescriptionAction-generate-button">
                        <FaFileInvoice className="prescriptionAction-button-icon" />
                        Generate Bill
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No prescriptions found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ViewPrescriptions;
