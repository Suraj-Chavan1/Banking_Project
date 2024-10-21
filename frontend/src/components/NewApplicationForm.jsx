import React, { useState } from 'react';

const NewLoanApplicationForm = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [documentLink, setDocumentLink] = useState('');
  const [info, setInfo] = useState('');
  const [loanApplication, setLoanApplication] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLinkChange = (event) => {
    setDocumentLink(event.target.value);
  };

  const handleInfoChange = (event) => {
    setInfo(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(''); // Reset error state

    if (step === 1) {
      if (documentLink.trim() !== '') {
        setStep(2);
      } else {
        setError('Please provide a document link.');
      }
    } else if (step === 2) {
      if (info.trim() !== '') {
        // Construct the data to send
        const applicationData = {
          user_id: info,
          link: documentLink,
        };

        setLoading(true); // Show loading indicator

        try {
          const response = await fetch('https://bobcyberwardenfinal.azurewebsites.net/bussinessloan/calculate_and_send', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(applicationData),
          });

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const result = await response.json();

          // Log the JSON response to the console
          console.log('Response JSON:', result);

          // Update state with application details
          setLoanApplication({
            documentLink,
            info,
            status: 'Under Review', // Initial status
            id: result.application_id, // Extract the application ID from the response
          });
          setStep(3); // Move to next step after submission
        } catch (error) {
          setError(error.message || 'There was a problem submitting your application. Please try again.');
        } finally {
          setLoading(false); // Hide loading indicator
        }
      } else {
        setError('Please provide User Id.');
      }
    }
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-gray-600 bg-opacity-50'>
      <div className='bg-white p-6 rounded-md w-1/2'>
        <h2 className='text-2xl font-bold mb-4'>New Loan Application - Step {step}</h2>
        {error && <div className='text-red-500 mb-4'>{error}</div>}
        {loading && <div className='text-blue-500 mb-4'>Submitting...</div>}
        {step === 1 && (
          <form onSubmit={handleSubmit}>
            <div className='mb-4'>
              <label className='block mb-2 font-bold'>Enter Document Link</label>
              <input
                type='text'
                value={documentLink}
                onChange={handleLinkChange}
                className='w-full p-2 border rounded-md'
                placeholder='Enter document link'
              />
            </div>
            <div className='flex justify-end'>
              <button
                type='button'
                onClick={onClose}
                className='mr-4 bg-gray-400 text-white px-4 py-2 rounded-md'
              >
                Cancel
              </button>
              <button
                type='submit'
                className='bg-[#ff5b2e] text-white px-4 py-2 rounded-md'
              >
                Next
              </button>
            </div>
          </form>
        )}
        {step === 2 && (
          <form onSubmit={handleSubmit}>
            <div className='mb-4'>
              <label className='block mb-2 font-bold'>Additional Information</label>
              <textarea
                value={info}
                onChange={handleInfoChange}
                className='w-full p-2 border rounded-md'
                rows='4'
              />
            </div>
            <div className='flex justify-end'>
              <button
                type='button'
                onClick={() => setStep(1)}
                className='mr-4 bg-gray-400 text-white px-4 py-2 rounded-md'
              >
                Back
              </button>
              <button
                type='submit'
                className='bg-[#ff5b2e] text-white px-4 py-2 rounded-md'
              >
                Submit
              </button>
            </div>
          </form>
        )}
        {step === 3 && (
          <div>
            <h3 className='text-xl font-bold mb-2'>Application Submitted Successfully!</h3>
            <p className='mb-4'>Application ID: {loanApplication && loanApplication.id}</p>
            <p>Status: {loanApplication && loanApplication.status}</p>
            <div className='flex justify-end mt-4'>
              <button
                type='button'
                onClick={onClose}
                className='bg-[#ff5b2e] text-white px-4 py-2 rounded-md'
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewLoanApplicationForm;
