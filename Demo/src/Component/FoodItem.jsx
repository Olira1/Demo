import React, { useState, useRef, useEffect } from 'react';

const FoodItem = ({ item, onToggleActive, onEdit, onDelete }) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleToggleActive = () => {
    onToggleActive(item.id);
    setShowMenu(false);
  };

  const handleEdit = () => {
    onEdit(item.id);
    setShowMenu(false);
  };

  const handleDelete = () => {
    onDelete(item.id);
    setShowMenu(false);
  };

  return (
    <div className={`bg-gray-800 rounded-lg p-4 border-2 transition-all duration-200 ${
      showMenu ? 'border-yellow-400' : 'border-transparent'
    }`}>
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4 flex-1">
          <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center text-2xl">
            {item.image}
          </div>
          <div className="flex-1">
            <h3 className="text-white font-semibold text-lg mb-1">{item.name}</h3>
            <p className="text-gray-400 text-sm mb-2">{item.description}</p>
            <div className="text-yellow-400 font-semibold">{item.price} Birr</div>
          </div>
        </div>
        
        {/* Dots Menu */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={handleToggleMenu}
            className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>

          {/* Popup Menu */}
          {showMenu && (
            <div className="absolute right-0 top-8 w-48 bg-gray-700 rounded-lg shadow-lg border border-gray-600 z-10">
              <div className="p-2">
                {/* Close Button */}
                <button
                  onClick={handleToggleMenu}
                  className="absolute top-2 right-2 text-gray-400 hover:text-white"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Toggle Active/Inactive */}
                <div className="flex items-center justify-between p-3 hover:bg-gray-600 rounded cursor-pointer" onClick={handleToggleActive}>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-white text-sm">Toggle</span>
                  </div>
                  <div className={`w-10 h-6 rounded-full transition-colors ${
                    item.isActive ? 'bg-green-500' : 'bg-gray-500'
                  }`}>
                    <div className={`w-4 h-4 bg-white rounded-full transition-transform transform ${
                      item.isActive ? 'translate-x-5' : 'translate-x-1'
                    }`}></div>
                  </div>
                </div>

                {/* Edit Option */}
                <div className="flex items-center space-x-2 p-3 hover:bg-gray-600 rounded cursor-pointer" onClick={handleEdit}>
                  <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  <span className="text-white text-sm">Edit</span>
                </div>

                {/* Delete Option */}
                <div className="flex items-center space-x-2 p-3 hover:bg-gray-600 rounded cursor-pointer" onClick={handleDelete}>
                  <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span className="text-white text-sm">Delete</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Status Indicator */}
      <div className="mt-3 flex items-center justify-between">
        <div className={`text-xs px-2 py-1 rounded-full ${
          item.isActive 
            ? 'bg-green-900 text-green-300' 
            : 'bg-red-900 text-red-300'
        }`}>
          {item.isActive ? 'Active' : 'Inactive'}
        </div>
        <div className="text-xs text-gray-500">{item.category}</div>
      </div>
    </div>
  );
};

export default FoodItem;
