import React from 'react';

const ActionLink = ({ icon, link, bgColor }) => {
  // Function to truncate long URLs
  const truncateUrl = (url, maxLength = 25) => {
    if (!url) return '';
    if (url.length <= maxLength) return url;
    
    // Remove protocol for display
    let displayUrl = url.replace(/^https?:\/\//, '');
    
    if (displayUrl.length <= maxLength) return displayUrl;
    
    // Truncate and add ellipsis
    return displayUrl.substring(0, maxLength - 3) + '...';
  };

  return (
    <div className="flex items-center gap-2 min-w-0 flex-1">
      <div
        className="w-[20px] h-[20px] flex items-center justify-center rounded-full flex-shrink-0"
        style={{ backgroundColor: bgColor }}
      >
        {icon}
      </div>

      <p className="text-[11px] font-medium underline truncate min-w-0">
        {truncateUrl(link)}
      </p>
    </div>
  );
};

export default ActionLink;
