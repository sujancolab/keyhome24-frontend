import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
  steps: {
    icon: LucideIcon;
    label: string;
  }[];
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, steps }) => {
  return (
    <div className="relative">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index + 1 === currentStep;
          const isCompleted = index + 1 < currentStep;

          return (
            <div key={index} className="flex-1">
              <div className="relative flex items-center justify-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  isActive
                    ? 'bg-red-600 text-white'
                    : isCompleted
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="absolute -bottom-8 w-32 text-center text-sm font-medium">
                  {step.label}
                </div>
                {index < steps.length - 1 && (
                  <div className={`absolute left-[50%] w-full h-0.5 ${
                    isCompleted ? 'bg-green-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;