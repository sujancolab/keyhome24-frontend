import React from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface FormFeedbackProps {
  type: 'success' | 'error';
  message: string;
}

const FormFeedback: React.FC<FormFeedbackProps> = ({ type, message }) => {
  return (
    <div className={`p-4 rounded-lg flex items-center ${
      type === 'success' 
        ? 'bg-green-50 text-green-800' 
        : 'bg-red-50 text-red-800'
    }`}>
      {type === 'success' ? (
        <CheckCircle className="h-5 w-5 mr-2" />
      ) : (
        <AlertCircle className="h-5 w-5 mr-2" />
      )}
      <p>{message}</p>
    </div>
  );
};

export default FormFeedback;