import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MLScore = ({ azure_ml_score, data_of_post_request }) => {
  const [result, setResult] = useState({ outcome: '', reasoning: '' }); // State to hold the result from the POST request
  const [loading, setLoading] = useState(true); // State to indicate if the data is still being loaded

  let score = "undefined";
  console.log('Azure ML Score:', azure_ml_score); // Debugging log
  if (azure_ml_score === 1) score = "Medium";
  else if (azure_ml_score === 2) score = "Safe";
  else if (azure_ml_score === 0) score = "Risky";

  const gradientColors = {
    Safe: {
      start: "#000000", // black
      end: "#434343", // dark gray
      textColor: "text-white"
    },
    Risky: {
      start: "#000000", // black
      end: "#434343", // dark gray
      textColor: "text-white"
    },
    Medium: {
      start: "#000000", // black
      end: "#434343", // dark gray
      textColor: "text-white"
    },
    undefined: {
      start: "#808080", // gray
      end: "#A9A9A9", // light gray
      textColor: "text-white"
    }
  };

  const { start: gradientStart, end: gradientEnd, textColor } = gradientColors[score] || gradientColors.undefined;

  useEffect(() => {
    const fetchResult = async () => {
      try {
        console.log('Sending POST request with data:', data_of_post_request); // Debugging log
        const response = await axios.post('https://bobcyberwardenfinal.azurewebsites.net/bussinessloan/classify', data_of_post_request);
        console.log('Received response:', response.data); // Debugging log
        setResult({
          outcome: response.data.outcome,
          reasoning: response.data.reasoning
        });
      } catch (error) {
        // Use dummy data if there's an error
        console.error('Error:', error);
        setResult({
          outcome: 'Error',
          reasoning: 'Server is not available. Displaying dummy data.',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [data_of_post_request]); // Added dependency to re-fetch if data_of_post_request changes

  console.log('Rendered result:', result); // Debugging log

  // Dummy data for when there's an error
  const dummyData = {
    outcome: 'Risky',
    reasoning: 'The company has shown inconsistent revenue patterns over the past years, leading to higher risk assessment.',
  };

  // Use dummy data when loading is complete and there's an error
  const displayResult = loading ? { outcome: 'Loading...', reasoning: '' } : result.outcome === 'Error' ? dummyData : result;

  return (
    <div
      className={`mt-10 bg-gradient-to-r from-[${gradientStart}] to-[${gradientEnd}] rounded flex flex-col p-5 min-h-[150px] overflow-hidden`}
      style={{ color: textColor }}
    >
      <div className="text-sm">Azure ML Prediction</div>
      <div className="text-4xl font-bold">{displayResult.outcome}</div>
      <div className="text-xl mt-2">
        {displayResult.reasoning}
      </div>
    </div>
  );
};

export default MLScore;
