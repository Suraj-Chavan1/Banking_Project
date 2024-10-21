import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ApplicationDetailsTable from './ApplicationDetailsTable';
import DataChat from './DataChat';

const SingleApplicationGrid = () => {
  const { applicationId } = useParams();
  const navigate = useNavigate();
  
  const [applicationData, setApplicationData] = useState({
    Name: "Sunil Kumar",
    Type_of_Loan: "Eduction Loan",
    Application_id: applicationId,
    Status: "Rejected",
    Result: "Pending"
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://bobcyberwardenfinal.azurewebsites.net/personalloan/get_data_from_applicationid/${applicationId}`);
      setApplicationData(response.data);
      setError(null);  // Reset error on successful fetch
    } catch (err) {
      console.error("Network error:", err);
      // Set dummy data if fetching fails
      setApplicationData({
        Name: "Sunil Kumar",
        Type_of_Loan: "Eduction Loan",
        Application_id: applicationId,
        Status: "Under Review",
        Result: "Pending"
      });
      setError(err);  // Set the error state after setting dummy data
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // Optional: Retry logic after 5 seconds if there's an error
    const retryFetch = setInterval(() => {
      if (error) fetchData();
    }, 5000);

    return () => clearInterval(retryFetch);  // Cleanup interval on unmount
  }, [applicationId, error]);

  const handleNavigation = (path) => () => {
    navigate(path);
  };

  const handleReject = async () => {
    try {
      const response = await axios.post(`https://bobcyberwardenfinal.azurewebsites.net/personalloan/set_to_rejected/${applicationId}`);
      alert(response.data.message);
      setApplicationData(prevData => ({ ...prevData, Status: 'rejected' })); // Update status locally
    } catch (err) {
      alert(`Error: ${err.response?.data?.error || err.message}`);
    }
  };

  const handleAccept = async () => {
    try {
      const response = await axios.post(`https://bobcyberwardenfinal.azurewebsites.net/personalloan/set_to_accepted/${applicationId}`);
      alert(response.data.message);
      setApplicationData(prevData => ({ ...prevData, Status: 'accepted' })); // Update status locally
    } catch (err) {
      alert(`Error: ${err.response?.data?.error || err.message}`);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='grid grid-cols-8 gap-3 mx-10 mt-2 h-full'>
      <div className='col-span-2 bg-white flex flex-col p-5'>
        <div className='font-bold text-xl'>Quick Links</div>
        <div className='text-[#666666]'>Navigate between your actions</div>
        <button 
          onClick={handleNavigation('/bankmails')} 
          className='bg-gray-200 text-left px-4 font-bold text-black py-3 mt-3 hover:bg-black hover:text-white rounded-md'
        >
          AzureML Classified Emails 
        </button>
        <button 
          onClick={handleNavigation('/newbankdb')} 
          className='bg-gray-200 text-left px-4 font-bold text-black py-3 mt-3 hover:bg-black hover:text-white rounded-md'
        >
          Dashboard
        </button>
        <button className='bg-gray-200 text-left px-4 font-bold text-black py-3 mt-3 hover:bg-black hover:text-white rounded-md' onClick={() => navigate('/emailmarketing')}>AI Advertisement</button>

        <div className='mt-10'>
          <div className='font-bold text-xl'>Reputation Check</div>
          <div className='text-[#666666]'>See what others are saying about your applicant</div>
          <ApplicationDetailsTable details={[{ "Moj Masti": "Positive" }]} />
        </div>
      </div>

      <div className='col-span-3 flex flex-col'>
        <div className='bg-white mb-2 flex flex-col p-5'>
          <div className='font-bold text-xl'>Application Overview</div>
          <div className='text-3xl mt-2 mb-4'>Personal Loan Application</div>
          <div className='flex justify-between'>
            <div className='flex flex-col'>
              <div className='text-[#666666]'>Name: {applicationData.Name}</div>
              <div className='text-[#666666]'>Type of Loan: {applicationData.Type_of_Loan}</div>
              <div className='text-[#666666]'>Application Id: {applicationData.Application_id}</div>
            </div>
            <div className={`p-3 font-bold text-white rounded ${applicationData.Status === 'rejected' ? 'bg-[#FF0000]' : applicationData.Status === 'accepted' ? 'bg-[#008000]' : 'bg-[#E3DA00]'}`}>
              Status: {applicationData.Status}
            </div>
          </div>
        </div>

        <div className='bg-white mt-2 flex flex-col p-5'>
          <div className='font-bold text-xl'>Application</div>
          <div className='mt-10 bg-gradient-to-r from-[#008000] to-[#49A402] rounded flex flex-col p-5'>
            <div className='text-white text-sm'>Azure ML Prediction</div>
            <div className='text-white text-4xl font-bold'>{applicationData.Result}</div>
          </div>
          <div className='mt-5 flex flex-col'>
            <div>Attached Documents</div>
            <div className='flex justify-start'>
              <div className='border border-black px-4 py-1 mr-2'>balance_sheet.xlsx</div>
              <div className='border border-black px-4 py-1'>balance_sheet.xlsx</div>
            </div>
          </div>
        </div>

        <div className='bg-white mt-2 flex justify-between mb-3'>
          <button 
            className='border border-black w-full mr-2 text-center py-2 rounded hover:bg-[#FF0000] hover:text-white hover:font-bold hover:border-[#FF0000]' 
            onClick={handleReject}
          >
            Reject
          </button>
          <button 
            className='border border-black w-full ml-2 text-center py-2 rounded bg-black text-white hover:bg-[#008000] hover:font-bold' 
            onClick={handleAccept}
          >
            Approve
          </button>
        </div>
      </div>

      <DataChat />
    </div>
  );
};

export default SingleApplicationGrid;
