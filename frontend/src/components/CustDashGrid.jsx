import React, { useContext, useState, useEffect } from 'react';
import ClusteredBarChart from './ClusteredBarChart';
import NewApplicationMenu from './NewApplicationMenu';
import { UserCategoryContext } from '../contexts/UserCategoryContext';
import NewComplaintButton from './NewComplaintButton';
import NewComplaintDialog from './NewComplaintDialog';
import EmailTable from './EmailTable';
import axios from 'axios';
import ApplicationTableforcut from './ApplicationTableforcut';

const CustDashGrid = () => {
  const { userCategory, setUserCategory } = useContext(UserCategoryContext);
  const [complaints, setComplaints] = useState([]);
  const [applications, setApplications] = useState([]);
  const [personalLoans, setPersonalLoans] = useState([]);

  const activeStyle = 'text-left px-4 font-bold py-3 mt-3 bg-black text-white rounded-md';
  const inactiveStyle = 'bg-gray-200 text-left px-4 font-bold text-black py-3 mt-3 hover:bg-black hover:text-white rounded-md';

  const ah = ['Application ID', 'Company Name', 'Auditing Company', 'Status'];
  const ch = ['Application ID', 'Email Content', 'Reply Message', 'Date And Time'];
  const plh = ['Application ID', 'Name', 'Occupation', 'Status', 'Type of Loan'];

  // Dummy data in case API calls fail
  const dummyComplaints = [
    {
      application_id: 'CPLT101',
      email_content: 'My credit card statement shows a charge I did not make.',
      reply_message: 'We are reviewing your complaint and will revert within 48 hours.',
      user_id: '21-09-2024 14:32'
    },
    {
      application_id: 'CPLT102',
      email_content: 'Internet banking is not working after the recent update.',
      reply_message: 'Please try clearing your cache or using a different browser. If the issue persists, let us know.',
      user_id: '22-09-2024 09:50'
    },
    {
      application_id: 'CPLT103',
      email_content: 'I am unable to link my Aadhaar with my account.',
      reply_message: 'Please visit the nearest branch for Aadhaar linking.',
      user_id: '23-09-2024 11:15'
    },
  ];

  const dummyApplications = [
    {
      application_id: 'BLA101',
      company_name: 'Mahesh Enterprises',
      auditing_company_name: 'KPMG India',
      status: 'Approved'
    },
    {
      application_id: 'BLA102',
      company_name: 'Sharma Constructions',
      auditing_company_name: 'Deloitte India',
      status: 'Pending'
    },
    {
      application_id: 'BLA103',
      company_name: 'Desai Technologies Pvt Ltd',
      auditing_company_name: 'EY India',
      status: 'Rejected'
    },
    {
      application_id: 'BLA104',
      company_name: 'Singh & Sons',
      auditing_company_name: 'PwC India',
      status: 'In Review'
    },
  ];

  const dummyPersonalLoans = [
    {
      application_id: 'PLA101',
      name: 'Arjun Patil',
      occupation: 'Software Engineer',
      status: 'Approved',
      type_of_loan: 'Home Loan'
    },
    {
      application_id: 'PLA102',
      name: 'Sneha Kulkarni',
      occupation: 'Teacher',
      status: 'Pending',
      type_of_loan: 'Car Loan'
    },
    {
      application_id: 'PLA103',
      name: 'Ravi Mehta',
      occupation: 'Business Owner',
      status: 'In Review',
      type_of_loan: 'Personal Loan'
    },
    {
      application_id: 'PLA104',
      name: 'Aishwarya Joshi',
      occupation: 'Freelance Writer',
      status: 'Rejected',
      type_of_loan: 'Education Loan'
    },
  ];

  // Function to fetch complaints data
  const fetchComplaints = async () => {
    try {
      const response = await axios.get('https://bobcyberwardenfinal.azurewebsites.net/emailclassify/email_by_userid');
      // Extracting only the required fields
      const filteredComplaints = response.data.map(app => ({
        application_id: app.application_id,
        email_content: app.email_content,
        reply_message: app.reply_message,
        user_id: app.classification_date,
      }));
      setComplaints(filteredComplaints);
    } catch (error) {
      console.error('Error fetching complaints data', error);
      setComplaints(dummyComplaints); // Set dummy data on error
    }
  };

  // Function to fetch applications data
  const fetchApplications = async () => {
    try {
      const response = await axios.get('https://bobcyberwardenfinal.azurewebsites.net/bussinessloan/loanbyuserid/12735');
      const filteredApplications = response.data.applications.map(app => ({
        application_id: app.application_id,
        company_name: app.company_name,
        auditing_company_name: app.auditing_company_name,
        status: app.Status,
      }));
      setApplications(filteredApplications);
    } catch (error) {
      console.error('Error fetching applications data', error);
      setApplications(dummyApplications); // Set dummy data on error
    }
  };

  // Function to fetch personal loan data
  const fetchPersonalLoans = async () => {
    try {
      const response = await axios.get('https://bobcyberwardenfinal.azurewebsites.net/personalloan/get_customer_info?Customer_ID=3392');
      const filteredPersonalLoans = response.data.map(loan => ({
        application_id: loan.Application_id,
        name: loan.Name,
        occupation: loan.Occupation,
        status: loan.Status,
        type_of_loan: loan.Type_of_Loan,
      }));
      setPersonalLoans(filteredPersonalLoans);
    } catch (error) {
      console.error('Error fetching personal loan data', error);
      setPersonalLoans(dummyPersonalLoans); // Set dummy data on error
    }
  };

  useEffect(() => {
    fetchComplaints();
    fetchApplications();
    fetchPersonalLoans();
  }, []);

  return (
    <div className='grid grid-cols-12 gap-3 mx-10 mt-2'>
      <div className='bg-white col-span-4 rounded-md p-5 flex flex-col'>
        <div className='font-bold text-xl'>Savings A/C</div>
        <div className='text-[#666666]'>123456789</div>
        <div className='text-3xl mt-5'>₹ 1,00,000</div>
        <div className='text-[#666666]'>Available Balance</div>
      </div>

      <div className='bg-white col-span-8 rounded-md p-4 flex flex-col'>
        <div className='font-bold text-xl'>Spending Statistics</div>
        <div className='text-[#666666]'>Understand patterns in spending money</div>
        <div>
          <ClusteredBarChart />
        </div>
      </div>

      <div className='bg-white col-span-3 rounded-md flex flex-col p-4'>
        <div className='font-bold text-xl'>Quick Links</div>
        <div className='text-[#666666]'>Navigate between your actions</div>
        <button className={`${userCategory === 'Complaints' ? activeStyle : inactiveStyle}`} onClick={() => setUserCategory('Complaints')}>
          Complaints
        </button>
        <button className={`${userCategory === 'Applications' ? activeStyle : inactiveStyle}`} onClick={() => setUserCategory('Applications')}>
          Business Loans
        </button>
        <button className={`${userCategory === 'Personal_loans' ? activeStyle : inactiveStyle}`} onClick={() => setUserCategory('Personal_loans')}>
          Personal Loans
        </button>
      </div>

      <div className='bg-white col-span-9 rounded-md flex flex-col p-4'>
        <div className='flex justify-between'>
          <div className='font-bold text-xl'>Your {userCategory}</div>
          {userCategory === 'Applications' || userCategory === 'Personal_loans' ? <NewApplicationMenu /> : <NewComplaintButton />}
        </div>
        <div className='text-[#666666]'>Keep track of your bank {userCategory} here</div>
        {userCategory === 'Applications' && <ApplicationTableforcut header={ah} content={applications} />}
        {userCategory === 'Complaints' && <EmailTable header={ch} content={complaints} />}
        {userCategory === 'Personal_loans' && <ApplicationTableforcut header={plh} content={personalLoans} />}
      </div>
      <NewComplaintDialog />
    </div>
  );
};

export default CustDashGrid;
