import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ConstructionBannerProps {
  message?: string;
  className?: string;
}

const ConstructionBanner: React.FC<ConstructionBannerProps> = ({ 
  message = "This site is under construction. We are making constant updates to improve your experience.",
  className = ""
}) => {
  return (
    <div 
      className={`bg-yellow-100 border-l-4 border-yellow-500 p-4 w-full ${className}`}
    >
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <AlertTriangle className="h-5 w-5 text-yellow-500" />
        </div>
        <div className="ml-3">
          <p className="text-sm text-yellow-700 font-medium">
            <span className="font-bold">CAUTION:</span> {message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConstructionBanner;