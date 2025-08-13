import React, { useState } from 'react';

const Sidebar = ({ onNavigation, currentPage = 'dashboard' }) => {
  const [isHovered, setIsHovered] = useState(false);

  const navigationItems = [
    { name: 'Dashboard', icon: '📊', color: 'text-yellow-400' },
    { name: 'New Menu', icon: '➕', color: 'text-white' },
    { name: 'Notifications', icon: '🔔', color: 'text-white' },
    { name: 'Settings', icon: '⚙️', color: 'text-white' },
    { name: 'Help', icon: '❓', color: 'text-white' },
    { name: 'Logout', icon: '🚪', color: 'text-red-400' }
  ];

  const handleNavigationClick = (itemName) => {
    if (onNavigation) {
      onNavigation(itemName);
    }
  };

  const getActiveState = (itemName) => {
    if (itemName === 'Dashboard' && currentPage === 'dashboard') return true;
    if (itemName === 'New Menu' && currentPage === 'newMenu') return true;
    return false;
  };

  return (
    <div
      className={`relative bg-gray-800 transition-all duration-300 ease-in-out ${
        isHovered ? 'w-64' : 'w-16'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Profile Section */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center text-white font-semibold">
            JD
          </div>
          {isHovered && (
            <div className="flex-1">
              <div className="text-white font-medium">Jhon Doe</div>
              <div className="text-gray-400 text-sm">Hotel Manager</div>
            </div>
          )}
          {isHovered && (
            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          )}
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="mt-6">
        {navigationItems.map((item, index) => {
          const isActive = getActiveState(item.name);
          return (
            <div
              key={item.name}
              onClick={() => handleNavigationClick(item.name)}
              className={`px-4 py-3 cursor-pointer transition-colors duration-200 ${
                isActive ? 'bg-gray-700 border-r-2 border-yellow-400' : 'hover:bg-gray-700'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`text-xl ${isActive ? 'text-yellow-400' : item.color}`}>
                  {item.icon}
                </div>
                {isHovered && (
                  <span className={`${isActive ? 'text-yellow-400' : item.color} font-medium`}>
                    {item.name}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </nav>

      {/* Hover Indicator */}
      {!isHovered && (
        <div className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-yellow-400 text-gray-900 px-2 py-1 rounded-l-md text-xs font-medium">
          Hover
        </div>
      )}
    </div>
  );
};

export default Sidebar;
