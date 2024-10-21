import React, { useEffect, useState } from 'react';

const EmailsTable = ({ category }) => {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    if (category) {
      const fetchEmails = async () => {
        try {
          const response = await fetch(`https://bobcyberwardenfinal.azurewebsites.net/emailclassify/${encodeURIComponent(category)}`);
          
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setEmails(data);
        } catch (error) {
          console.error('There was a problem with the fetch operation:', error);
          // Set dummy data in case of an error
          setEmails(getDummyData(category));
        }
      };

      fetchEmails();
    }
  }, [category]);

  // Function to return dummy data based on category
  const getDummyData = (category) => {
    switch (category) {
      case 'get_loans_and_mortgages':
        return [
          { application_id: 1, email_id: 'neha.sharma@example.com', classification_date: '2023-10-01T10:00:00Z', email_content: 'Loan application for home purchase in Delhi.' },
          { application_id: 2, email_id: 'rahul.verma@example.com', classification_date: '2023-10-02T11:00:00Z', email_content: 'Inquiry about mortgage options available in Mumbai.' },
          { application_id: 3, email_id: 'aarti.kumar@example.com', classification_date: '2023-10-03T09:15:00Z', email_content: 'Follow-up on home loan approval status.' },
          { application_id: 4, email_id: 'sanjay.mishra@example.com', classification_date: '2023-10-04T14:30:00Z', email_content: 'Request for loan pre-approval letter.' },
        ];
      case 'get_deposits_and_withdrawals':
        return [
          { application_id: 1, email_id: 'priya.patel@example.com', classification_date: '2023-10-01T12:00:00Z', email_content: 'Deposit confirmation for account #54321.' },
          { application_id: 2, email_id: 'arvind.singh@example.com', classification_date: '2023-10-03T09:00:00Z', email_content: 'Withdrawal request processed for savings account.' },
          { application_id: 3, email_id: 'tanvi.joshi@example.com', classification_date: '2023-10-05T16:00:00Z', email_content: 'Monthly deposit summary for October.' },
          { application_id: 4, email_id: 'vikas.shukla@example.com', classification_date: '2023-10-06T13:15:00Z', email_content: 'Inquiry about fixed deposit interest rates.' },
        ];
      case 'get_fraud_and_security':
        return [
          { application_id: 1, email_id: 'rohit.yadav@example.com', classification_date: '2023-10-01T14:00:00Z', email_content: 'Suspicious activity alert on account #67890.' },
          { application_id: 2, email_id: 'neelam.gupta@example.com', classification_date: '2023-10-02T15:30:00Z', email_content: 'Fraud investigation update regarding unauthorized transactions.' },
          { application_id: 3, email_id: 'deepak.chopra@example.com', classification_date: '2023-10-03T18:45:00Z', email_content: 'Security measures to prevent identity theft.' },
          { application_id: 4, email_id: 'manisha.bansal@example.com', classification_date: '2023-10-04T10:10:00Z', email_content: 'Your account has been flagged for suspicious activity.' },
        ];
      case 'get_customer_service':
        return [
          { application_id: 1, email_id: 'ananya.sharma@example.com', classification_date: '2023-10-01T16:00:00Z', email_content: 'Customer service inquiry regarding account balance.' },
          { application_id: 2, email_id: 'nikhil.singh@example.com', classification_date: '2023-10-02T17:45:00Z', email_content: 'Feedback on recent service experience at the branch.' },
          { application_id: 3, email_id: 'pankaj.mishra@example.com', classification_date: '2023-10-03T14:00:00Z', email_content: 'Request for assistance with online banking issues.' },
          { application_id: 4, email_id: 'shruti.rana@example.com', classification_date: '2023-10-04T15:30:00Z', email_content: 'Inquiry about credit card billing statement.' },
        ];
      default:
        return [];
    }
  };
  
  return (
    <div>
      {emails.length > 0 ? (
        <table className='min-w-full bg-white border border-gray-200'>
          <thead>
            <tr className='bg-gray-100 border-b'>
              <th className='p-2 text-left'>Email ID</th>
              <th className='p-2 text-left'>Classification Date</th>
              <th className='p-2 text-left'>Email Content</th>
            </tr>
          </thead>
          <tbody>
            {emails.map((email) => (
              <tr key={email.application_id} className='border-b'>
                <td className='p-2'>{email.email_id}</td>
                <td className='p-2'>{new Date(email.classification_date).toLocaleString()}</td>
                <td className='p-2'>{email.email_content}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className='text-center'>No emails found for this category.</p>
      )}
    </div>
  );
};

export default EmailsTable;
