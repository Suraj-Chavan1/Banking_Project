import React, { useState, useEffect } from 'react';
import ApplicationCardPL from './ApplicationCardPL';
import NewApplicationFormPL from './NewApplicationFormPL';

const DashboardMainPL = () => {
  const [applications, setApplications] = useState([]);
  const [showNewApplicationForm, setShowNewApplicationForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Dummy data for fallback in case API fails
  const dummyApplications = [
    {
      Application_id: 'PLA101',
      Name: 'Arjun Patil',
      Occupation: 'Software Engineer',
      Status: 'Approved',
      Type_of_Loan: 'Home Loan',
    },
    {
      Application_id: 'PLA102',
      Name: 'Sneha Kulkarni',
      Occupation: 'Teacher',
      Status: 'Pending',
      Type_of_Loan: 'Car Loan',
    },
    {
      Application_id: 'PLA103',
      Name: 'Ravi Mehta',
      Occupation: 'Business Owner',
      Status: 'In Review',
      Type_of_Loan: 'Personal Loan',
    },
    {
      Application_id: 'PLA104',
      Name: 'Aishwarya Joshi',
      Occupation: 'Freelance Writer',
      Status: 'Rejected',
      Type_of_Loan: 'Education Loan',
    },
    {
      Application_id: 'PLA105',
      Name: 'Vikram Singh',
      Occupation: 'Marketing Executive',
      Status: 'Approved',
      Type_of_Loan: 'Travel Loan',
    },
    {
      Application_id: 'PLA106',
      Name: 'Priya Nair',
      Occupation: 'Graphic Designer',
      Status: 'In Review',
      Type_of_Loan: 'Home Renovation Loan',
    },
  ];

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch(
          'https://bobcyberwardenfinal.azurewebsites.net/personalloan/get_customer_info?Customer_ID=3392'
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setApplications(data); // Set the entire array of applications
        console.log('Fetched Applications:', data); // Log the fetched data
      } catch (error) {
        console.error('Error fetching applications data', error);
        setError(error.message);
        setApplications(dummyApplications); // Set dummy data if the API call fails
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const handleNewApplicationClick = () => {
    setShowNewApplicationForm(true);
  };

  const handleCloseForm = () => {
    setShowNewApplicationForm(false);
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
      </div>
      <h2 className='text-2xl font-bold mb-4'>Your Personal Loan Applications</h2>
      {error && <div>Error: {error}. Displaying dummy data instead.</div>}
      <div>
        {applications.length > 0 ? (
          applications.map((application) => (
            <ApplicationCardPL key={application.Application_id} application={application} />
          ))
        ) : (
          <div>No applications found</div>
        )}
      </div>
      {showNewApplicationForm && <NewApplicationFormPL onClose={handleCloseForm} />}
    </div>
  );
};

export default DashboardMainPL;
