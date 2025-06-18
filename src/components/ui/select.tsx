import React, { useState, useRef, useEffect } from 'react';

interface SelectProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
  required?: boolean;
}

interface SelectTriggerProps {
  id?: string;
  children: React.ReactNode;
  onClick?: () => void;
  isOpen?: boolean;
}

interface SelectContentProps {
  children: React.ReactNode;
  isOpen?: boolean;
}

interface SelectItemProps {
  value: string;
  children: React.ReactNode;
  onSelect?: (value: string) => void;
}

interface SelectValueProps {
  placeholder?: string;
  value?: string;
}

type SelectComponent = React.FC<SelectProps> & {
  Trigger: React.FC<SelectTriggerProps>;
  Content: React.FC<SelectContentProps>;
  Item: React.FC<SelectItemProps>;
  Value: React.FC<SelectValueProps>;
};

const SelectTrigger: React.FC<SelectTriggerProps> = ({ id, children, onClick, isOpen }) => {
  return (
    <button
      id={id}
      type="button"
      onClick={onClick}
      className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {children}
    </button>
  );
};

const SelectContent: React.FC<SelectContentProps> = ({ children, isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2">
      {children}
    </div>
  );
};

const SelectItem: React.FC<SelectItemProps> = ({ value, children, onSelect }) => {
  return (
    <div
      className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-accent hover:text-accent-foreground"
      onClick={() => onSelect?.(value)}
    >
      {children}
    </div>
  );
};

const SelectValue: React.FC<SelectValueProps> = ({ placeholder, value }) => {
  return <span className="block truncate">{value || placeholder}</span>;
};

const Select: SelectComponent = ({ value, onValueChange, children, required }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleTriggerClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleItemSelect = (newValue: string) => {
    onValueChange(newValue);
    setIsOpen(false);
  };

  // Clone children and pass down the necessary props
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      if (child.type === SelectTrigger) {
        return React.cloneElement(child, { 
          onClick: handleTriggerClick,
          isOpen 
        } as SelectTriggerProps);
      }
      if (child.type === SelectContent) {
        return React.cloneElement(child, { isOpen } as SelectContentProps);
      }
      if (child.type === SelectItem) {
        return React.cloneElement(child, { onSelect: handleItemSelect } as SelectItemProps);
      }
    }
    return child;
  });

  return (
    <div className="relative" ref={selectRef}>
      {childrenWithProps}
    </div>
  );
};

Select.Trigger = SelectTrigger;
Select.Content = SelectContent;
Select.Item = SelectItem;
Select.Value = SelectValue;

export { Select, SelectTrigger, SelectContent, SelectItem, SelectValue }; 