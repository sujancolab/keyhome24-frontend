import React from 'react';

interface FormSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const FormSection: React.FC<FormSectionProps> = ({ title, children, className }) => {
  return (
    <div className={`form-section ${className || ''}`}>
      <h2 className="text-xl font-semibold mb-6">{title}</h2>
      {children}
    </div>
  );
};

export default FormSection;