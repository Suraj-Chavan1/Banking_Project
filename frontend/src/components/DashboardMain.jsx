import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ApplicationCard from './ApplicationCard';
import NewApplicationForm from './NewApplicationForm';
import { useNavigate } from 'react-router-dom';

const DashboardMain = () => {
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [showNewApplicationForm, setShowNewApplicationForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Dummy data for fallback when the backend server is not working
// Dummy data for fallback when the backend server is not working
const dummyApplications = [
  {
    application_id: 'BL001',
    Name: 'Rakesh Verma',
    Occupation: 'Small Business Owner',
    LoanAmount: '₹5,00,000',
    Status: 'Pending',
    Type_of_Loan: 'Business Expansion Loan',
    auditing_company_name: 'Deloitte India',
    company_name: 'Verma Handicrafts Pvt Ltd',
    DocumentsShared: 'Financial Statements, Tax Returns',
  },
  {
    application_id: 'BL002',
    Name: 'Meera Gupta',
    Occupation: 'Freelancer',
    LoanAmount: '₹3,00,000',
    Status: 'Approved',
    Type_of_Loan: 'Equipment Purchase Loan',
    auditing_company_name: 'KPMG India',
    company_name: 'Meera Gupta Consulting',
    DocumentsShared: 'Bank Statements, Proof of Income',
  },
  {
    application_id: 'BL003',
    Name: 'Rajesh Patil',
    Occupation: 'Trader',
    LoanAmount: '₹7,50,000',
    Status: 'In Review',
    Type_of_Loan: 'Working Capital Loan',
    auditing_company_name: 'PwC India',
    company_name: 'Patil Traders and Exports',
    DocumentsShared: 'No documents shared',
  },
  {
    application_id: 'BL004',
    Name: 'Sunita Deshmukh',
    Occupation: 'Boutique Owner',
    LoanAmount: '₹2,00,000',
    Status: 'Rejected',
    Type_of_Loan: 'Business Loan',
    auditing_company_name: 'EY India',
    company_name: 'Deshmukh Boutique Creations',
    DocumentsShared: 'Audited Balance Sheet',
  },
];

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        'https://bobcyberwardenfinal.azurewebsites.net/bussinessloan/user_to_data?user_id=12735'
      );
      setApplications(response.data);
      console.log('Fetched Applications:', response.data);
    } catch (error) {
      console.error('Error fetching applications data', error);
      setError(error.message || 'An error occurred');
      setApplications(dummyApplications); // Set dummy data if the API call fails
    } finally {
      setLoading(false);
    }
  };

  const handleNewApplicationClick = () => {
    setShowNewApplicationForm(true);
  };

  const handleCloseForm = () => {
    setShowNewApplicationForm(false);
  };

  const handleFormSuccess = () => {
    // Re-fetch the applications after successful form submission
    fetchApplications();
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className='w-full p-4'>
      <div className='flex justify-start mb-4'>
        <button
          className='bg-[#ff5b2e] text-white px-5 py-2 rounded-md font-bold'
          onClick={handleNewApplicationClick}
        >
          New Application
        </button>
        <button
          className='bg-[#ff5b2e] text-white px-5 py-2 mx-4 rounded-md font-bold'
          onClick={() => navigate('/dashboard')}
        >
          New Personal Loan Application
        </button>
        <button
          className='bg-[#ff5b2e] text-white px-5 py-2 mx-4 rounded-md font-bold'
          onClick={() => navigate('/dashboard')}
        >
          New Business Loan Application
        </button>
      </div>
      <h2 className='text-2xl font-bold mb-4'>Your Business Loan Applications</h2>
      {error && <div>Error: {error}. Displaying dummy data instead.</div>}
      <div>
        {applications.length > 0 ? (
          applications.map((application) => (
            <ApplicationCard key={application.application_id} application={application} />
          ))
        ) : (
          <div>No applications found</div>
        )}
      </div>
      {showNewApplicationForm && (
        <NewApplicationForm onClose={handleCloseForm} onSuccess={handleFormSuccess} />
      )}
    </div>
  );
};

export default DashboardMain;
