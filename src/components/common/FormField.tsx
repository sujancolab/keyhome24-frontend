import React from 'react';
import { LucideIcon, AlertCircle } from 'lucide-react';

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  placeholder?: string;
  icon?: LucideIcon;
  required?: boolean;
  error?: string;
  className?: string;
  options?: { value: string; label: string }[];
  as?: 'input' | 'select' | 'textarea';
  disabled?: boolean;
  validate?: (value: any) => true | string;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  icon: Icon,
  required,
  error,
  className = '',
  options,
  as = 'input',
  disabled = false,
  validate,
  min,
  max,
  minLength,
  maxLength
}) => {
  const inputClasses = `w-full pl-10 pr-4 py-3 rounded-lg border transition-colors ${
    error 
      ? 'border-red-300 focus:ring-2 focus:ring-red-500 focus:border-red-500' 
      : 'border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent'
  } ${className}`;

  return (
    <div className="form-field">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        {as === 'select' ? (
          <select
            name={name}
            value={value}
            onChange={onChange}
            className={inputClasses}
            required={required}
            disabled={disabled}
          >
            <option value="">{placeholder || 'Sélectionnez'}</option>
            {options?.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        ) : as === 'textarea' ? (
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={inputClasses}
            required={required}
            disabled={disabled}
            rows={4}
            minLength={minLength}
            maxLength={maxLength}
          />
        ) : (
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={inputClasses}
            required={required}
            disabled={disabled}
            min={min}
            max={max}
            minLength={minLength}
            maxLength={maxLength}
          />
        )}
        {Icon && (
          <Icon className={`absolute left-3 top-3.5 h-5 w-5 ${error ? 'text-red-400' : 'text-gray-400'}`} />
        )}
      </div>
      {error && (
        <div className="mt-1.5 flex items-center gap-1.5">
          <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}
    </div>
  );
};

export default FormField;