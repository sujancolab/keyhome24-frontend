import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { LucideIcon } from 'lucide-react';

interface InputFieldProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  type?: string;
  placeholder?: string;
  icon?: LucideIcon;
  required?: boolean;
  error?: string;
  className?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  register,
  type = 'text',
  placeholder,
  icon: Icon,
  required,
  error,
  className
}) => {
  return (
    <div className="form-group">
      <label className="form-label">
        {label} {required && '*'}
      </label>
      <div className="input-group">
        <input
          type={type}
          {...register(name)}
          placeholder={placeholder}
          className={`form-input ${Icon ? 'input-with-icon' : ''} ${className || ''}`}
        />
        {Icon && <Icon className="input-icon" />}
      </div>
      {error && <p className="form-error">{error}</p>}
    </div>
  );
};

interface SelectFieldProps extends Omit<InputFieldProps, 'type'> {
  options: { value: string; label: string }[];
}

export const SelectField: React.FC<SelectFieldProps> = ({
  label,
  name,
  register,
  options,
  icon: Icon,
  required,
  error,
  className
}) => {
  return (
    <div className="form-group">
      <label className="form-label">
        {label} {required && '*'}
      </label>
      <div className="input-group">
        <select
          {...register(name)}
          className={`form-select ${Icon ? 'input-with-icon' : ''} ${className || ''}`}
        >
          <option value="">Sélectionnez</option>
          {options.map(({ value, label }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
        {Icon && <Icon className="input-icon" />}
      </div>
      {error && <p className="form-error">{error}</p>}
    </div>
  );
};

interface TextAreaFieldProps extends Omit<InputFieldProps, 'type'> {
  rows?: number;
}

export const TextAreaField: React.FC<TextAreaFieldProps> = ({
  label,
  name,
  register,
  placeholder,
  rows = 4,
  required,
  error,
  className
}) => {
  return (
    <div className="form-group">
      <label className="form-label">
        {label} {required && '*'}
      </label>
      <textarea
        {...register(name)}
        rows={rows}
        placeholder={placeholder}
        className={`form-input ${className || ''}`}
      />
      {error && <p className="form-error">{error}</p>}
    </div>
  );
};

interface CheckboxFieldProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  className?: string;
}

export const CheckboxField: React.FC<CheckboxFieldProps> = ({
  label,
  name,
  register,
  className
}) => {
  return (
    <label className="flex items-center space-x-3">
      <input
        type="checkbox"
        {...register(name)}
        className={`form-checkbox ${className || ''}`}
      />
      <span>{label}</span>
    </label>
  );
};