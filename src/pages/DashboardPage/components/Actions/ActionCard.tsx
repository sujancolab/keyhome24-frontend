import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ActionCardProps {
  title: string;
  description: string;
  buttonLabel: string;
  icon: LucideIcon;
  onClick: () => void;
  gradient: string;
  textColor: string;
  buttonColor: string;
}

const ActionCard: React.FC<ActionCardProps> = ({
  title,
  description,
  buttonLabel,
  icon: Icon,
  onClick,
  gradient,
  textColor,
  buttonColor
}) => {
  return (
    <div className={`${gradient} rounded-xl p-6 text-white shadow-lg`}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold mb-2">{title}</h2>
          <p className={`${textColor} mb-4`}>
            {description}
          </p>
          <button
            onClick={onClick}
            className={`bg-white ${buttonColor} px-6 py-3 rounded-lg hover:bg-opacity-90 transition-all transform hover:scale-105 flex items-center font-semibold shadow-md`}
          >
            <Icon className="h-5 w-5 mr-2" />
            {buttonLabel}
          </button>
        </div>
        <Icon className={`h-12 w-12 ${textColor}`} />
      </div>
    </div>
  );
};

export default ActionCard;