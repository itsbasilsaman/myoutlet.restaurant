import React, { useState, useRef, useEffect } from 'react';

interface DropdownMenuProps extends Record<string, unknown> {
  children: React.ReactNode;
}

interface DropdownMenuTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
  onClick?: () => void;
}

interface DropdownMenuContentProps extends Record<string, unknown> {
  children: React.ReactNode;
  align?: 'start' | 'end';
  isOpen?: boolean;
  onClose?: () => void;
}

interface DropdownMenuItemProps {
  children: React.ReactNode;
  onClick?: () => void;
}

interface DropdownMenuLabelProps {
  children: React.ReactNode;
}

interface DropdownMenuSeparatorProps {}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  // Clone children and pass down the state and handlers
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      if (child.type === DropdownMenuTrigger) {
        return React.cloneElement(child as React.ReactElement<DropdownMenuTriggerProps>, { onClick: toggleDropdown });
      }
      if (child.type === DropdownMenuContent) {
        return React.cloneElement(child as React.ReactElement<DropdownMenuContentProps>, { isOpen, onClose: closeDropdown });
      }
    }
    return child;
  });

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {childrenWithProps}
    </div>
  );
};

export const DropdownMenuTrigger: React.FC<DropdownMenuTriggerProps> = ({ children, asChild, onClick }) => {
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<unknown>, { onClick });
  }
  
  return (
    <div className="cursor-pointer" onClick={onClick}>
      {children}
    </div>
  );
};

export const DropdownMenuContent: React.FC<DropdownMenuContentProps> = ({ children, align = 'start', isOpen = false, onClose }) => {
  if (!isOpen) return null;

  const handleItemClick = (onClick?: () => void) => {
    if (onClick) onClick();
    if (onClose) onClose();
  };

  // Clone children and pass down the close handler
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      if (child.type === DropdownMenuItem) {
        return React.cloneElement(child as React.ReactElement<DropdownMenuItemProps>, { 
          onClick: () => handleItemClick((child as React.ReactElement<DropdownMenuItemProps>).props.onClick) 
        });
      }
    }
    return child;
  });

  return (
    <div className={`absolute ${align === 'end' ? 'right-0' : 'left-0'} mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-50`}>
      {childrenWithProps}
    </div>
  );
};

export const DropdownMenuItem: React.FC<DropdownMenuItemProps> = ({ children, onClick }) => {
  return (
    <div 
      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors" 
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export const DropdownMenuLabel: React.FC<DropdownMenuLabelProps> = ({ children }) => {
  return <div className="block px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 font-serif">{children}</div>;
};

export const DropdownMenuSeparator: React.FC<DropdownMenuSeparatorProps> = () => {
  return <div className="border-t border-gray-100 dark:border-gray-700 my-1"></div>;
}; 