import React, { createContext, useContext } from 'react';

interface RadioGroupContextType {
  value: string;
  onValueChange: (value: string) => void;
}

const RadioGroupContext = createContext<RadioGroupContextType | undefined>(undefined);

interface RadioGroupProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

interface RadioGroupItemProps {
  value: string;
  id: string;
  children?: React.ReactNode;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({ value, onValueChange, children, className = '' }) => {
  return (
    <RadioGroupContext.Provider value={{ value, onValueChange }}>
      <div className={`flex flex-col space-y-2 ${className}`}>
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
};

export const RadioGroupItem: React.FC<RadioGroupItemProps> = ({ value, id, children }) => {
  const context = useContext(RadioGroupContext);
  
  if (!context) {
    throw new Error('RadioGroupItem must be used within a RadioGroup');
  }

  const { value: selectedValue, onValueChange } = context;
  const isChecked = selectedValue === value;

  return (
    <div className="flex items-center space-x-2">
      <input
        type="radio"
        id={id}
        value={value}
        checked={isChecked}
        onChange={() => onValueChange(value)}
        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
      />
      {children && <label htmlFor={id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{children}</label>}
    </div>
  );
}; 