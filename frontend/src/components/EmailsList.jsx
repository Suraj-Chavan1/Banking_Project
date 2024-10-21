import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import EmailCard from './EmailCard';
import { MailContext } from '../contexts/MailContext';

const EmailsList = () => {
    const { setEmail } = useContext(MailContext); 
    const [emails, setEmails] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        // Fetch emails from backend when the component mounts
        const fetchEmails = async () => {
            try {
                const response = await axios.get('https://bobcyberwardenfinal.azurewebsites.net/emailclassify/get_all_emails');
                setEmails(response.data);
            } catch (error) {
                console.error('Error fetching emails:', error);
                // Load dummy data if the server is not available
                const dummyData = getDummyData();
                setEmails(dummyData);
            }
        };

        fetchEmails();
    }, []);

    // Dummy data function
    const getDummyData = () => {
        return [
            {
                application_id: 1,
                email_id: 'isha.agarwal@example.com',
                classification_date: '2023-10-01T10:00:00Z',
                summary: 'Loan Application',
                email_content: 'Dear Isha,\n\nThank you for your recent loan application with us. We have successfully received your request for a home loan. Our team is currently reviewing your application details. Please ensure that all required documents are submitted. If you have any further questions, feel free to contact us at your convenience.\n\nBest regards,\nHome Loan Department',
                urgency: 1,
                sentiment: 'Positive',
                ai_generated_response: 'Your application is approved.',
                reply_message: 'Thank you for your assistance!',
                category: 'Loans',
                priority: 2
            },
            {
                application_id: 2,
                email_id: 'rahul.sharma@example.com',
                classification_date: '2023-10-02T11:00:00Z',
                summary: 'Account Statement',
                email_content: 'Dear Rahul,\n\nAttached is your account statement for the month of September 2023. We encourage you to review your transactions carefully. If you notice any discrepancies, please do not hesitate to reach out to our support team for assistance. Thank you for being a valued customer.\n\nWarm regards,\nCustomer Support Team',
                urgency: 2,
                sentiment: 'Neutral',
                ai_generated_response: 'Please review your statement.',
                reply_message: 'Looking forward to your feedback.',
                category: 'Statements',
                priority: 3
            },
            {
                application_id: 3,
                email_id: 'ananya.singh@example.com',
                classification_date: '2023-10-03T09:15:00Z',
                summary: 'Service Feedback',
                email_content: 'Dear Ananya,\n\nWe appreciate your feedback regarding our services. We strive to provide the best experience for our customers, and your input is invaluable to us. Please let us know how we can improve further. We look forward to your continued patronage.\n\nSincerely,\nCustomer Experience Team',
                urgency: 1,
                sentiment: 'Positive',
                ai_generated_response: 'Thank you for your feedback!',
                reply_message: 'I had a great experience.',
                category: 'Customer Service',
                priority: 1
            },
            {
                application_id: 4,
                email_id: 'karthik.verma@example.com',
                classification_date: '2023-10-04T14:30:00Z',
                summary: 'Fraud Alert',
                email_content: 'Dear Karthik,\n\nThis is an important notice regarding your account. We have detected unusual activity that requires your immediate attention. Please log in to your account to review recent transactions. If you did not authorize these actions, please contact our fraud department immediately to protect your account.\n\nBest,\nSecurity Team',
                urgency: 3,
                sentiment: 'Negative',
                ai_generated_response: 'Immediate action is required.',
                reply_message: 'I will check my account immediately.',
                category: 'Security',
                priority: 4
            },
            {
                application_id: 5,
                email_id: 'priya.joshi@example.com',
                classification_date: '2023-10-05T16:00:00Z',
                summary: 'Deposit Confirmation',
                email_content: 'Dear Priya,\n\nWe are pleased to inform you that your recent deposit of ₹50,000 has been successfully credited to your savings account. Thank you for your trust in us. Should you have any inquiries regarding your account, please reach out to our customer service team at any time.\n\nBest wishes,\nBanking Services Team',
                urgency: 2,
                sentiment: 'Positive',
                ai_generated_response: 'Thank you for your deposit.',
                reply_message: 'Happy to contribute!',
                category: 'Deposits',
                priority: 2
            },
            // Add more high-quality dummy data as needed
        ];
    };
    

    // Filter emails based on search term
    const filteredEmails = emails.filter(email =>
        email.email_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        email.summary.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort emails by priority (ascending)
    const sortedEmails = [...filteredEmails].sort((a, b) => a.priority - b.priority);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className='flex flex-col py-4'>
            <div className='flex justify-between w-full px-4'>
                <input
                    className='p-2 w-full'
                    placeholder='Search Mail'
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <button
                    className='p-2 bg-black text-white'
                    onClick={() => {}}
                >
                    Search
                </button>
            </div>
            <hr className='border-black mt-4' />

            {sortedEmails.map((email) => (
                <EmailCard
                    key={email.application_id}
                    senderName={email.email_id}
                    urgency={email.urgency}
                    time={new Date(email.classification_date).toLocaleString()}
                    title={email.summary}
                    preview={email.email_content}
                    sentiment={email.sentiment}
                    email={email.email_id}
                    application_id={email.application_id}
                    ai_generated_response={email.ai_generated_response}
                    reply_message={email.reply_message}
                    email_content={email.email_content}
                    category={email.category}
                    priority={email.priority}
                />
            ))}
        </div>
    );
};

export default EmailsList;
