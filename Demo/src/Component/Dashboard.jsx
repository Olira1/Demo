import React, { useState } from 'react';
import Sidebar from './Sidebar';
import FoodItem from './FoodItem';
import NewMenu from './NewMenu';

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [foodItems, setFoodItems] = useState([
    {
      id: 1,
      name: "Doro Wat",
      description: "Spicy Ethiopian chicken stew",
      price: 250,
      image: "🍗",
      isActive: true,
      category: "Breakfast"
    },
    {
      id: 2,
      name: "Misir Wat",
      description: "Red lentil stew with spices",
      price: 150,
      image: "🫘",
      isActive: true,
      category: "Breakfast"
    },
    {
      id: 3,
      name: "Shiro",
      description: "Ground chickpea stew",
      price: 90,
      image: "🥘",
      isActive: true,
      category: "Launch"
    },
    {
      id: 4,
      name: "Kitfo",
      description: "Ethiopian beef tartare",
      price: 130,
      image: "🥩",
      isActive: true,
      category: "Launch"
    },
    {
      id: 5,
      name: "Tibs",
      description: "Sautéed meat and vegetables",
      price: 350,
      image: "🍖",
      isActive: true,
      category: "Launch"
    },
    {
      id: 6,
      name: "Gomen",
      description: "Collard greens with spices",
      price: 150,
      image: "🥬",
      isActive: true,
      category: "Fasting food"
    },
    {
      id: 7,
      name: "Firfir",
      description: "Shredded injera with sauce",
      price: 120,
      image: "🫓",
      isActive: true,
      category: "Fasting food"
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = ["All", "Breakfast", "Launch", "Fasting food"];

  const filteredItems = foodItems.filter(item => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleToggleActive = (id) => {
    setFoodItems(prev => prev.map(item => 
      item.id === id ? { ...item, isActive: !item.isActive } : item
    ));
  };

  const handleEdit = (id) => {
    // TODO: Implement edit functionality
    console.log("Edit item:", id);
  };

  const handleDelete = (id) => {
    setFoodItems(prev => prev.filter(item => item.id !== id));
  };

  const handleAddItem = (newItem) => {
    setFoodItems(prev => [...prev, newItem]);
    setCurrentPage('dashboard');
  };

  const handleSidebarNavigation = (page) => {
    if (page === 'New Menu') {
      setCurrentPage('newMenu');
    } else if (page === 'Dashboard') {
      setCurrentPage('dashboard');
    }
    // TODO: Implement other navigation items
  };

  if (currentPage === 'newMenu') {
    return (
      <div className="flex h-screen bg-gray-900">
        <Sidebar onNavigation={handleSidebarNavigation} currentPage={currentPage} />
        <NewMenu onBack={() => setCurrentPage('dashboard')} onAddItem={handleAddItem} />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-900">
      <Sidebar onNavigation={handleSidebarNavigation} currentPage={currentPage} />
      
      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-yellow-400 mb-2">Menu And this project is for Demo purpose only</h1>
          <div className="text-white text-lg">SVG</div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-md leading-5 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex space-x-6 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                selectedCategory === category
                  ? "bg-yellow-400 text-gray-900"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Food Items Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredItems.map((item) => (
            <FoodItem
              key={item.id}
              item={item}
              onToggleActive={handleToggleActive}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
          
          {/* Add New Item Card */}
          <div 
            onClick={() => setCurrentPage('newMenu')}
            className="bg-gray-800 rounded-lg shadow-lg cursor-pointer hover:bg-gray-700 transition-all duration-200 flex items-center justify-center border-2 border-dashed border-gray-600 hover:border-yellow-400 min-h-[200px]"
          >
            <div className="text-center">
              <div className="text-6xl text-yellow-400 mb-4">+</div>
              <p className="text-white text-lg font-medium">Add New Item</p>
              <p className="text-gray-400 text-sm mt-2">Click to create a new menu item</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
