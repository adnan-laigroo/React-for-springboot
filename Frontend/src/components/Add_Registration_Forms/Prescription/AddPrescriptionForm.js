import React, { useState, useEffect } from 'react';
import { FaCheck, FaSpinner } from 'react-icons/fa';
import './AddPrescriptionForm.css';
import API_URL from '../../../config';

const AddPrescriptionForm = ({ encodedCredentials, handleBack }) => {
  const [prescription, setPrescription] = useState({
    apId: '',
    diagnosis: '',
    prescribedMedicines: [],
    prescribedTests: []
  });
  const [prescriptionAdded, setPrescriptionAdded] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [medicineOptions, setMedicineOptions] = useState([]);
  const [testOptions, setTestOptions] = useState([]);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await fetch(API_URL + '/hospital/medicine/list', {
          headers: {
            Authorization: 'Basic ' + encodedCredentials
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch medicines');
        }

        const data = await response.json();
        setMedicineOptions(data.map((medicine) => medicine.medicineName));
      } catch (error) {
        console.error('Error fetching medicines:', error);
      }
    };

    const fetchTests = async () => {
      try {
        const response = await fetch(API_URL + '/hospital/medicalTest/list', {
          headers: {
            Authorization: 'Basic ' + encodedCredentials
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch medical tests');
        }

        const data = await response.json();
        setTestOptions(data.map((test) => test.testName));
      } catch (error) {
        console.error('Error fetching medical tests:', error);
      }
    };

    fetchMedicines();
    fetchTests();
  }, [encodedCredentials]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPrescription((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleMedicineChange = (e, index) => {
    const { name, value } = e.target;
    setPrescription((prevState) => ({
      ...prevState,
      prescribedMedicines: prevState.prescribedMedicines.map((medicine, i) =>
        i === index ? { ...medicine, [name]: value } : medicine
      )
    }));
  };

  const handleTestChange = (e, index) => {
    const { name, value } = e.target;
    setPrescription((prevState) => ({
      ...prevState,
      prescribedTests: prevState.prescribedTests.map((test, i) =>
        i === index ? { ...test, [name]: value } : test
      )
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const headers = new Headers();
    headers.append('Authorization', 'Basic ' + encodedCredentials);
    headers.append('Content-Type', 'application/json');

    fetch(API_URL + '/hospital/prescription/add', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(prescription)
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 400 || response.status === 404) {
            return response.json().then((data) => {
              throw Object.assign(new Error('Validation Error'), {
                validationErrors: data.messages || []
              });
            });
          } else {
            throw new Error('Error adding prescription');
          }
        }
        return response.json();
      })
      .then((data) => {
        console.log('Prescription Added:', data);
        setPrescriptionAdded(true);
        setError('');
        setValidationErrors([]);
      })
      .catch((error) => {
        if (error.validationErrors) {
          setValidationErrors(error.validationErrors);
          setError('Failed to add prescription');
        } else {
          setError('Error adding prescription');
          console.error('Error adding prescription:', error);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleReset = () => {
    setPrescription({
      apId: '',
      diagnosis: '',
      prescribedMedicines: [],
      prescribedTests: []
    });
  };

  const addMedicine = () => {
    setPrescription((prevState) => ({
      ...prevState,
      prescribedMedicines: [
        ...prevState.prescribedMedicines,
        {
          medicineName: '',
          dosage: '',
          frequency: ''
        }
      ]
    }));
  };

  const removeMedicine = (index) => {
    setPrescription((prevState) => ({
      ...prevState,
      prescribedMedicines: prevState.prescribedMedicines.filter((_, i) => i !== index)
    }));
  };

  const addTest = () => {
    setPrescription((prevState) => ({
      ...prevState,
      prescribedTests: [
        ...prevState.prescribedTests,
        {
          testName: ''
        }
      ]
    }));
  };

  const removeTest = (index) => {
    setPrescription((prevState) => ({
      ...prevState,
      prescribedTests: prevState.prescribedTests.filter((_, i) => i !== index)
    }));
  };

  return (
    <div><br></br>
    <div className="prescription-add-prescription-form-container">
      <br></br>
      <button className="prescription-back-button" onClick={handleBack}>
        Back
      </button>
      {error && !prescriptionAdded && (
        <div className="prescription-error-message">
          {error}
          {validationErrors.length > 0 && (
            <ul className="validation-errors">
              {validationErrors.map((errorMsg, index) => (
                <li key={index}>{errorMsg}</li>
              ))}
            </ul>
          )}
        </div>
      )}
      {!prescriptionAdded ? (
        <div>
          <h3>Add Prescription</h3>
          <form className="prescription-add-prescription-form" onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label htmlFor="apId">Appointmennt No.:</label>
              <input
                type="text"
                id="apId"
                name="apId"
                value={prescription.apId}
                onChange={handleChange}
                className="input-field"
              />
            </div>
            <div className="form-group">
              <label htmlFor="diagnosis">Diagnosis:</label>
              <input
                type="text"
                id="diagnosis"
                name="diagnosis"
                value={prescription.diagnosis}
                onChange={handleChange}
                className="input-field"
              />
            </div>
            <div className="form-group">
              <label htmlFor="medicines">Medicines:</label>
              {prescription.prescribedMedicines.map((medicine, index) => (
                <div key={index} className="medicine-input-group">
                  <input
                    type="text"
                    name="medicineName"
                    placeholder="Medicine Name"
                    value={medicine.medicineName}
                    onChange={(e) => handleMedicineChange(e, index)}
                    className="input-field"
                    list="medicineOptions"
                  />
                  <datalist id="medicineOptions">
                    {medicineOptions.map((option) => (
                      <option key={option} value={option} />
                    ))}
                  </datalist>
                  <input
                    type="text"
                    name="dosage"
                    placeholder="Dosage"
                    value={medicine.dosage}
                    onChange={(e) => handleMedicineChange(e, index)}
                    className="input-field"
                  />
                  <input
                    type="text"
                    name="frequency"
                    placeholder="Frequency"
                    value={medicine.frequency}
                    onChange={(e) => handleMedicineChange(e, index)}
                    className="input-field"
                  />
                  <button type="button" className="prescription-remove-button"  onClick={() => removeMedicine(index)}>
                    Remove
                  </button>
                </div>
              ))}
              <button type="button" className="prescription-button" onClick={addMedicine}>
                Add Medicine
              </button>
            </div>
            <div className="form-group">
              <label htmlFor="tests">Medical Tests:</label>
              {prescription.prescribedTests.map((test, index) => (
                <div key={index} className="test-input-group">
                  <input
                    type="text"
                    name="testName"
                    placeholder="Test Name"
                    value={test.testName}
                    onChange={(e) => handleTestChange(e, index)}
                    className="input-field"
                    list="testOptions"
                  />
                  <datalist id="testOptions">
                    {testOptions.map((option) => (
                      <option key={option} value={option} />
                    ))}
                  </datalist>
                  <button type="button" className="prescription-remove-button" onClick={() => removeTest(index)}>
                    Remove
                  </button>
                </div>
              ))}
              <button type="button" className="prescription-button" onClick={addTest}>
                Add Test
              </button>
            </div>
            <div className="prescription-form-buttons">
              <button type="reset" className="prescription-reset-button" onClick={handleReset}>
                Reset
              </button>
              <button type="submit" className="prescription-submit-button" disabled={isLoading}>
                {isLoading ? (
                  <FaSpinner className="loading-icon" />
                ) : (
                  <>
                    Add <FaCheck className="submit-icon" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div>
          <h3>Prescription Added</h3>
          <FaCheck className="prescription-confirm-tick" />
          <button className="prescription-back-button" onClick={handleBack}>
            Back
          </button>
        </div>
      )}
    </div></div>
  );
};

export default AddPrescriptionForm;
